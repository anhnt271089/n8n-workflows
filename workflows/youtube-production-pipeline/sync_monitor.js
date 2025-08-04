#!/usr/bin/env node

/**
 * N8N Workflow Sync Monitor
 * Monitors localhost N8N instance and syncs changes back to JSON files
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
  // email: 'your-email@example.com',
  // password: 'your-password',
  workflowsDir: path.join(__dirname, 'N8N_Workflows'),
  pollInterval: 30000, // 30 seconds
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

// Workflow cache to detect changes
let workflowCache = new Map();

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
          reject(err);
        }
      });
    });
    
    req.on('error', (err) => {
      console.error('Request error:', err.message);
      reject(err);
    });
    
    req.end();
  });
}

/**
 * Get all workflows from N8N instance
 */
async function getWorkflows() {
  try {
    // Try authenticated API first
    let workflows = await makeRequest('/rest/workflows');
    
    // If unauthorized, try alternative endpoints
    if (workflows && workflows.status === 'error' && workflows.message === 'Unauthorized') {
      console.log('⚠️  API requires authentication. Trying alternative method...');
      
      // Try webhook endpoint or direct file access
      // Note: This is a fallback - recommend setting up API authentication
      throw new Error('Authentication required. Please configure authToken in CONFIG.');
    }
    
    return workflows.data || workflows;
  } catch (error) {
    console.error('Failed to fetch workflows:', error.message);
    if (error.message.includes('Authentication required')) {
      console.log('');
      console.log('🔐 To fix this:');
      console.log('   1. Open N8N web interface (http://localhost:5678)');
      console.log('   2. Go to Settings > API');
      console.log('   3. Generate an API token');
      console.log('   4. Add it to CONFIG.authToken in sync_monitor.js');
      console.log('');
    }
    return [];
  }
}

/**
 * Get detailed workflow by ID
 */
async function getWorkflowById(id) {
  try {
    const workflow = await makeRequest(`/rest/workflows/${id}`);
    return workflow;
  } catch (error) {
    console.error(`Failed to fetch workflow ${id}:`, error.message);
    return null;
  }
}

/**
 * Save workflow to JSON file
 */
function saveWorkflowToFile(workflow, filename) {
  try {
    const filePath = path.join(CONFIG.workflowsDir, filename);
    
    // Clean up workflow object for export
    const cleanWorkflow = {
      name: workflow.name,
      nodes: workflow.nodes,
      connections: workflow.connections,
      pinData: workflow.pinData || {},
      settings: workflow.settings || { executionOrder: "v1" },
      staticData: workflow.staticData || null,
      tags: workflow.tags || [],
      meta: workflow.meta || { templateCredsSetupCompleted: false },
      versionId: workflow.versionId || "1"
    };
    
    // Write to file with proper formatting
    fs.writeFileSync(filePath, JSON.stringify(cleanWorkflow, null, 2));
    
    console.log(`✅ Synced: ${filename}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to save ${filename}:`, error.message);
    return false;
  }
}

/**
 * Generate hash for workflow comparison
 */
function generateWorkflowHash(workflow) {
  const content = JSON.stringify({
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: workflow.settings
  });
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

/**
 * Check for workflow changes and sync
 */
async function syncWorkflows() {
  console.log(`🔍 Checking for workflow changes... (${new Date().toLocaleTimeString()})`);
  
  try {
    const workflows = await getWorkflows();
    
    if (!workflows || workflows.length === 0) {
      console.log('⚠️  No workflows found in N8N instance');
      return;
    }
    
    let changesDetected = 0;
    
    for (const configWorkflow of CONFIG.workflows) {
      // Find matching workflow by name
      const n8nWorkflow = workflows.find(w => w.name === configWorkflow.name);
      
      if (!n8nWorkflow) {
        console.log(`⚠️  Workflow not found: ${configWorkflow.name}`);
        continue;
      }
      
      // Get detailed workflow
      const detailedWorkflow = await getWorkflowById(n8nWorkflow.id);
      
      if (!detailedWorkflow) {
        console.log(`❌ Failed to fetch details for: ${configWorkflow.name}`);
        continue;
      }
      
      // Generate hash to detect changes
      const currentHash = generateWorkflowHash(detailedWorkflow);
      const cachedHash = workflowCache.get(n8nWorkflow.id);
      
      if (cachedHash !== currentHash) {
        console.log(`🔄 Changes detected in: ${configWorkflow.name}`);
        
        // Save to file
        const saved = saveWorkflowToFile(detailedWorkflow, configWorkflow.filename);
        
        if (saved) {
          workflowCache.set(n8nWorkflow.id, currentHash);
          changesDetected++;
        }
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    if (changesDetected === 0) {
      console.log('✅ No changes detected');
    } else {
      console.log(`🎉 Synced ${changesDetected} workflow(s)`);
    }
    
  } catch (error) {
    console.error('❌ Sync error:', error.message);
  }
}

/**
 * Initialize cache with current workflows
 */
async function initializeCache() {
  console.log('🚀 Initializing workflow sync monitor...');
  console.log(`📡 N8N Instance: ${CONFIG.n8nBaseUrl}`);
  console.log(`📁 Output Directory: ${CONFIG.workflowsDir}`);
  console.log(`⏰ Poll Interval: ${CONFIG.pollInterval / 1000}s`);
  console.log('');
  
  // Verify N8N connection
  try {
    const workflows = await getWorkflows();
    console.log(`✅ Connected to N8N - Found ${workflows.length} workflows`);
  } catch (error) {
    console.error('❌ Failed to connect to N8N instance');
    console.error('   Make sure N8N is running on http://localhost:5678');
    process.exit(1);
  }
  
  // Initial sync to populate cache
  await syncWorkflows();
  
  console.log('');
  console.log('🎯 Monitor started - watching for changes...');
  console.log('   Press Ctrl+C to stop');
  console.log('');
}

/**
 * Start monitoring
 */
async function startMonitoring() {
  await initializeCache();
  
  // Set up periodic sync
  setInterval(syncWorkflows, CONFIG.pollInterval);
}

/**
 * Graceful shutdown
 */
process.on('SIGINT', () => {
  console.log('\\n🛑 Stopping workflow monitor...');
  console.log('✅ Monitor stopped');
  process.exit(0);
});

// Start the monitor
if (require.main === module) {
  startMonitoring().catch(console.error);
}

module.exports = { syncWorkflows, startMonitoring };