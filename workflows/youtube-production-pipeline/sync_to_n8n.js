#!/usr/bin/env node

/**
 * N8N Workflow Push Tool
 * Pushes updated JSON files TO N8N instance
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const CONFIG = {
  n8nBaseUrl: 'http://localhost:5678',
  // Add authentication if needed (uncomment and configure)
  // authToken: 'your-n8n-api-token', // Get from N8N Settings > API
  workflowsDir: path.join(__dirname, 'N8N_Workflows'),
  workflows: [
    {
      name: 'YouTube Production Pipeline - Main Workflow',
      filename: 'YouTube_Production_Main_Workflow.json'
    },
    {
      name: 'YouTube Production - Daily Status Report', 
      filename: 'Daily_Status_Report_Workflow.json'
    },
    {
      name: 'YouTube Production - Script Processing & Content Generation',
      filename: 'Script_Processing_Workflow.json'
    },
    {
      name: 'YouTube Production - Completion & Monitoring',
      filename: 'Completion_Monitoring_Workflow.json'
    }
  ]
};

/**
 * Make HTTP request to N8N API
 */
function makeRequest(endpoint, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const url = `${CONFIG.n8nBaseUrl}${endpoint}`;
    const client = url.startsWith('https') ? https : http;
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    // Add authentication if configured
    if (CONFIG.authToken) {
      options.headers['Authorization'] = `Bearer ${CONFIG.authToken}`;
    }
    
    const req = client.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (err) {
          console.error('Failed to parse JSON response:', err.message);
          resolve({ error: true, message: data });
        }
      });
    });
    
    req.on('error', (err) => {
      console.error('Request error:', err.message);
      reject(err);
    });
    
    if (body) {
      req.write(JSON.stringify(body));
    }
    
    req.end();
  });
}

/**
 * Get all workflows from N8N instance
 */
async function getWorkflows() {
  try {
    let workflows = await makeRequest('/rest/workflows');
    
    if (workflows && workflows.status === 'error' && workflows.message === 'Unauthorized') {
      throw new Error('Authentication required. Please configure authToken in CONFIG.');
    }
    
    return workflows.data || workflows;
  } catch (error) {
    console.error('Failed to fetch workflows:', error.message);
    return [];
  }
}

/**
 * Load workflow from JSON file
 */
function loadWorkflowFromFile(filename) {
  try {
    const filePath = path.join(CONFIG.workflowsDir, filename);
    
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filename}`);
      return null;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const workflow = JSON.parse(content);
    
    console.log(`📖 Loaded: ${filename}`);
    return workflow;
  } catch (error) {
    console.error(`❌ Failed to load ${filename}:`, error.message);
    return null;
  }
}

/**
 * Update existing workflow in N8N
 */
async function updateWorkflow(workflowId, workflowData) {
  try {
    const result = await makeRequest(`/rest/workflows/${workflowId}`, 'PUT', workflowData);
    
    if (result.error || result.status === 'error') {
      console.error(`❌ Failed to update workflow: ${result.message || 'Unknown error'}`);
      return false;
    }
    
    console.log(`✅ Updated workflow: ${workflowData.name}`);
    return true;
  } catch (error) {
    console.error(`❌ Update error: ${error.message}`);
    return false;
  }
}

/**
 * Create new workflow in N8N
 */
async function createWorkflow(workflowData) {
  try {
    const result = await makeRequest('/rest/workflows', 'POST', workflowData);
    
    if (result.error || result.status === 'error') {
      console.error(`❌ Failed to create workflow: ${result.message || 'Unknown error'}`);
      return false;
    }
    
    console.log(`✅ Created workflow: ${workflowData.name}`);
    return true;
  } catch (error) {
    console.error(`❌ Create error: ${error.message}`);
    return false;
  }
}

/**
 * Push specific workflow to N8N
 */
async function pushWorkflow(configWorkflow) {
  console.log(`🔄 Processing: ${configWorkflow.name}`);
  
  // Load workflow from file
  const fileWorkflow = loadWorkflowFromFile(configWorkflow.filename);
  if (!fileWorkflow) {
    return false;
  }
  
  // Get existing workflows
  const existingWorkflows = await getWorkflows();
  if (!existingWorkflows) {
    console.error('❌ Could not fetch existing workflows');
    return false;
  }
  
  // Find existing workflow by name
  const existingWorkflow = existingWorkflows.find(w => w.name === configWorkflow.name);
  
  if (existingWorkflow) {
    // Update existing workflow
    console.log(`📝 Updating existing workflow: ${configWorkflow.name}`);
    
    // Prepare update data (preserve ID and other N8N-specific fields)
    const updateData = {
      ...fileWorkflow,
      id: existingWorkflow.id
    };
    
    return await updateWorkflow(existingWorkflow.id, updateData);
  } else {
    // Create new workflow
    console.log(`➕ Creating new workflow: ${configWorkflow.name}`);
    return await createWorkflow(fileWorkflow);
  }
}

/**
 * Push all workflows to N8N
 */
async function pushAllWorkflows() {
  console.log('🚀 Pushing workflows to N8N...');
  console.log(`📡 N8N Instance: ${CONFIG.n8nBaseUrl}`);
  console.log(`📁 Source Directory: ${CONFIG.workflowsDir}`);
  console.log('');
  
  // Verify N8N connection
  try {
    const workflows = await getWorkflows();
    console.log(`✅ Connected to N8N - Found ${workflows.length} existing workflows`);
  } catch (error) {
    console.error('❌ Failed to connect to N8N instance');
    console.error('   Make sure N8N is running on http://localhost:5678');
    if (error.message.includes('Authentication required')) {
      console.log('');
      console.log('🔐 Authentication required:');
      console.log('   1. Open N8N web interface (http://localhost:5678)');
      console.log('   2. Go to Settings > API');
      console.log('   3. Generate an API token');
      console.log('   4. Add it to CONFIG.authToken in this script');
    }
    process.exit(1);
  }
  
  console.log('');
  
  let successCount = 0;
  let totalCount = CONFIG.workflows.length;
  
  for (const workflow of CONFIG.workflows) {
    const success = await pushWorkflow(workflow);
    if (success) {
      successCount++;
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('');
  console.log(`🎉 Push complete: ${successCount}/${totalCount} workflows updated`);
  
  if (successCount === totalCount) {
    console.log('✅ All workflows successfully pushed to N8N!');
    console.log('');
    console.log('🔄 Next steps:');
    console.log('   1. Open N8N web interface to verify workflows');
    console.log('   2. Configure credentials (Google Sheets, OpenAI, Telegram)');
    console.log('   3. Test workflows with sample data');
  } else {
    console.log('⚠️  Some workflows failed to push. Check errors above.');
  }
}

/**
 * Push single workflow by name
 */
async function pushSingleWorkflow(workflowName) {
  const workflow = CONFIG.workflows.find(w => w.name === workflowName || w.filename === workflowName);
  
  if (!workflow) {
    console.error(`❌ Workflow not found: ${workflowName}`);
    console.log('');
    console.log('Available workflows:');
    CONFIG.workflows.forEach(w => {
      console.log(`   • ${w.name} (${w.filename})`);
    });
    return;
  }
  
  console.log('🚀 Pushing single workflow to N8N...');
  console.log(`📡 N8N Instance: ${CONFIG.n8nBaseUrl}`);
  console.log('');
  
  const success = await pushWorkflow(workflow);
  
  if (success) {
    console.log('');
    console.log('✅ Workflow successfully pushed to N8N!');
  } else {
    console.log('');
    console.log('❌ Failed to push workflow. Check errors above.');
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // Push all workflows
    await pushAllWorkflows();
  } else if (args[0] === '--help' || args[0] === '-h') {
    console.log('N8N Workflow Push Tool');
    console.log('');
    console.log('Usage:');
    console.log('  node sync_to_n8n.js                    # Push all workflows');
    console.log('  node sync_to_n8n.js "workflow name"    # Push specific workflow');
    console.log('  node sync_to_n8n.js --help             # Show this help');
    console.log('');
    console.log('Available workflows:');
    CONFIG.workflows.forEach(w => {
      console.log(`  • ${w.name}`);
      console.log(`    File: ${w.filename}`);
    });
  } else {
    // Push specific workflow
    await pushSingleWorkflow(args[0]);
  }
}

/**
 * Graceful shutdown
 */
process.on('SIGINT', () => {
  console.log('\\n🛑 Push cancelled');
  process.exit(0);
});

// Run the tool
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { pushAllWorkflows, pushSingleWorkflow };