# N8N Workflow Sync Monitor

## 🎯 Purpose

This sync monitor automatically detects changes to your N8N workflows running on localhost and updates the corresponding JSON files in the `N8N_Workflows/` folder. This ensures your workflow files stay in sync with any modifications you make in the N8N web interface.

## 🚀 Quick Start

### Prerequisites
- Node.js installed (version 14+)
- N8N running on localhost:5678
- Your YouTube Production Pipeline workflows imported into N8N

### Start Monitoring
```bash
# Option 1: Use the startup script
./start_sync.sh

# Option 2: Use npm/node directly
node sync_monitor.js

# Option 3: Use npm script
npm start
```

## 📊 What Gets Monitored

The monitor watches these 4 workflows:

1. **YouTube Production Pipeline - Main Workflow**
   - File: `YouTube_Production_Main_Workflow.json`
   - Handles: URL processing, AI ideas, basic notifications

2. **YouTube Production - Daily Status Report**
   - File: `Daily_Status_Report_Workflow.json`  
   - Handles: Daily 9 AM status reports via Telegram

3. **YouTube Production - Script Processing & Content Generation**
   - File: `Script_Processing_Workflow.json`
   - Handles: Script enhancement, sentence breakdown, SEO content

4. **YouTube Production - Completion & Monitoring**
   - File: `Completion_Monitoring_Workflow.json`
   - Handles: Approval detection, overdue alerts, completion tracking

## 🔄 How It Works

### Detection System
- **Polls every 30 seconds** for workflow changes
- **Generates content hash** of nodes, connections, and settings
- **Compares hashes** to detect modifications
- **Only syncs when changes detected** to avoid unnecessary file writes

### Sync Process
1. Fetches all workflows from N8N API (`/rest/workflows`)
2. Matches workflows by name with configured files
3. Detects changes using content hashing
4. Downloads full workflow details (`/rest/workflows/{id}`)
5. Cleans and formats JSON for file export
6. Saves to appropriate JSON file in `N8N_Workflows/` folder

### Output Format
The monitor saves clean, formatted JSON files with:
- Workflow name and structure
- All nodes and connections
- Settings and metadata
- Proper indentation for readability
- Removed sensitive/instance-specific data

## 📝 Console Output

### Normal Operation
```
🔍 Checking for workflow changes... (2:30:45 PM)
✅ No changes detected

🔍 Checking for workflow changes... (2:31:15 PM)  
🔄 Changes detected in: YouTube Production Pipeline - Main Workflow
✅ Synced: YouTube_Production_Main_Workflow.json
🎉 Synced 1 workflow(s)
```

### Connection Issues
```
❌ Failed to connect to N8N instance
   Make sure N8N is running on http://localhost:5678
```

### Missing Workflows
```
⚠️  Workflow not found: YouTube Production Pipeline - Main Workflow
```

## ⚙️ Configuration

### Change N8N URL
Edit `sync_monitor.js` line 13:
```javascript
n8nBaseUrl: 'http://localhost:5678',  // Change if N8N runs on different port
```

### Change Poll Interval
Edit `sync_monitor.js` line 15:
```javascript
pollInterval: 30000,  // 30 seconds (change to desired milliseconds)
```

### Add/Remove Workflows
Edit the `workflows` array in `sync_monitor.js`:
```javascript
workflows: [
  {
    name: 'Exact workflow name as shown in N8N',
    filename: 'Output_Filename.json'
  }
]
```

## 🛠 Troubleshooting

### Monitor Won't Start
- **Check Node.js**: `node --version` (should be 14+)
- **Check N8N**: Visit `http://localhost:5678` in browser
- **Check Permissions**: Make sure files are readable/writable

### Workflows Not Syncing
- **Verify Names**: Workflow names in N8N must match exactly
- **Check Console**: Look for error messages in monitor output
- **Test API**: Visit `http://localhost:5678/rest/workflows` manually

### File Not Updating
- **Check File Permissions**: Ensure `N8N_Workflows/` folder is writable
- **Verify Changes**: Make sure you actually modified something significant
- **Check Hash**: Monitor uses content hashing - cosmetic changes might not trigger sync

## 📊 Benefits

### Development Workflow
1. **Edit workflows** in N8N web interface
2. **Changes automatically sync** to version control
3. **No manual export** needed
4. **Team collaboration** through shared JSON files

### Version Control
- Clean, formatted JSON files perfect for git
- Easy to track changes in pull requests
- Backup of all workflow configurations
- Rollback capability through git history

### Team Coordination
- Everyone works with same workflow versions
- No more "which version are you using?"
- Automated documentation of workflow changes
- Easy deployment across environments

## 🔧 Advanced Usage

### One-Time Sync
```bash
# Just sync once without monitoring
node -e "require('./sync_monitor.js').syncWorkflows()"
```

### Custom Script Integration
```javascript
const { syncWorkflows } = require('./sync_monitor.js');

// Sync before git commits
await syncWorkflows();
```

### Scheduled Sync (cron)
```bash
# Add to crontab for periodic sync
*/5 * * * * cd /path/to/project && node sync_monitor.js --once
```

## 🛑 Stopping the Monitor

Press `Ctrl+C` in the terminal running the monitor:
```
🛑 Stopping workflow monitor...
✅ Monitor stopped
```

The monitor gracefully shuts down and saves any pending changes.

---

**Note**: This monitor only syncs FROM N8N TO files. It doesn't push file changes back to N8N. To update N8N with file changes, re-import the JSON files through the N8N web interface.