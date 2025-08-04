# YouTube Production Pipeline - Setup Checklist

## ✅ Pre-Setup Requirements

### Accounts & Services
- ✅ Google Workspace account with admin access
- ✅ OpenAI account with API access and credits ($10+ balance)
- ✅ N8N instance (cloud or self-hosted)
- ✅ Telegram account for notifications
- [ ] Team member Google accounts

### Permissions & Access
- ✅ Google Drive API enabled
- ✅ Google Sheets API enabled  
- [ ] Service account created with appropriate permissions
- [ ] Team members added to Google Drive folder
- ✅ N8N has internet access for API calls

## 🗂 Google Drive Setup

### Folder Structure Creation
- ✅ Create root folder: `YouTube_Production_System/`
- ✅ Create subfolder: `Master_Sheets/`
- ✅ Create subfolder: `Videos_In_Production/`
- ✅ Create subfolder: `Completed_Videos/`
- ✅ Create subfolder: `Templates/`

### Folder Configuration
- [ ] Note down each folder ID from URLs
- [ ] Set sharing permissions for team members
- [ ] Test folder creation permissions with service account
- [ ] Verify folder access from N8N

**Folder IDs to Record:**
```
YouTube_Production_System: _____________________
Master_Sheets: _____________________
Videos_In_Production: _____________________
Completed_Videos: _____________________
Templates: _____________________
```

## 📊 Google Sheets Setup

### Master Sheet Creation
- ✅ Import `Master_YouTube_Queue_Template.csv` to Google Sheets
- ✅ Rename to `Master_YouTube_Queue`
- ✅ Move to `Master_Sheets/` folder
- ✅ Record Sheet ID: `xnO7vhj4iZhO7baekkClq6Ca6YYbD3qjOdI53Qg`

### Data Validation Setup
- ✅ Column H (Selected_Idea): Dropdown → "Option 1, Option 2, Option 3"
- ✅ Column J (Video_Editing_Status): Dropdown → "⏳ Not Started, 🟡 In Progress, 🔄 Review, ✅ Complete"
- ✅ Column K (Audio_Status): Dropdown → "⏳ Not Started, 🟡 Recording, 🔄 Editing, ✅ Complete"  
- ✅ Column N (Priority): Dropdown → "🔴 High, 🟡 Medium, 🟢 Low"
- ✅ Column P (Thumbnail_Status): Dropdown → "⏳ Not Started, 🎨 Design In Progress, 🔄 Review & Feedback, ✅ Approved"

### Conditional Formatting
- ✅ Status column (D): Color-code by status values
- ✅ Priority column (N): Red/Yellow/Green for High/Medium/Low
- ✅ Progress columns: Green for Complete, Yellow for In Progress
- ✅ Test all formatting with sample data

### Template Sheets
- [ ] Create YouTube Production Workbook Template with 5 tabs:
  - [ ] Script_Content (8 columns)
  - [ ] Image_Prompts (7 columns) 
  - [ ] SEO_Content (5 columns)
  - [ ] Production_Timeline (6 columns)
  - [ ] Review_Feedback (6 columns)
- [ ] Add data validation and conditional formatting
- [ ] Share template with service account
- [ ] Record template spreadsheet ID: `_____________________`
- [ ] Test template copying functionality
- [ ] Verify N8N can populate all tabs

## 🤖 Telegram Bot Setup

### Bot Creation
- ✅ Message @BotFather on Telegram
- ✅ Run command: `/newbot`
- ✅ Choose bot name: `ryanJarvis_bot`
- ✅ Choose username: `ryanJarvis_bot`
- ✅ Record bot token: `8421802050:AAEL3A2Ou3Cccm17-6Zkb1pQaIcVoNRxieE`

### Chat Setup
- ✅ Start conversation with your bot
- ✅ Send test message to bot
- ✅ Get chat ID from: `https://api.telegram.org/bot<TOKEN>/getUpdates`
- ✅ Record your chat ID: `789387521`
- [ ] Test message sending with bot token

## 🔧 N8N Configuration

### Credential Setup
- [ ] **Google Sheets**: OAuth2 authentication configured
- [ ] **Google Drive**: Service account JSON key uploaded
- [ ] **OpenAI**: API key added (starts with sk-...)
- [ ] **Telegram**: Bot token configured
- [ ] Test all credential connections

### Workflow Import
- ✅ Import `YouTube_Production_Main_Workflow.json`
- ✅ Import `Daily_Status_Report_Workflow.json`
- [ ] Import `Script_Processing_Workflow.json`
- [ ] Update template spreadsheet ID in Create Production Workbook node
- [ ] Import `Completion_Monitoring_Workflow.json`
- [ ] Verify all nodes loaded correctly

### Configuration Updates
Replace these values in ALL workflows:

- [ ] `YOUR_MASTER_SHEET_ID` → `_____________________`
- [ ] `YOUR_TELEGRAM_CHAT_ID` → `_____________________`
- [ ] `YOUR_VIDEOS_IN_PRODUCTION_FOLDER_ID` → `_____________________`
- [ ] `1TEMPLATE_WORKBOOK_ID_REPLACE_THIS` → `_____________________`

### Workflow Activation
- [ ] Activate `YouTube_Production_Main_Workflow`
- [ ] Activate `Daily_Status_Report_Workflow`
- [ ] Activate `Script_Processing_Workflow`
- [ ] Activate `Completion_Monitoring_Workflow`
- [ ] Verify all schedules are running

## 🧪 Testing Phase

### Basic Functionality Test
- [ ] Add test YouTube URL to master sheet
- [ ] Verify workflow triggers automatically
- [ ] Check Telegram notification received
- [ ] Confirm AI ideas generated in sheet
- [ ] Test idea selection process

### Script Generation Test  
- [ ] Select idea option in master sheet
- [ ] Wait for script processing notification
- [ ] Verify enhanced script created
- [ ] Check sentence breakdown generated
- [ ] Test script approval process

### File Organization Test
- [ ] Verify video folder created automatically
- [ ] Check production workbook created with 5 tabs
- [ ] Confirm all file permissions correct
- [ ] Test folder structure organization

### Notification Test
- [ ] Test daily status report (or trigger manually)
- [ ] Verify overdue alert system
- [ ] Check queue empty notification
- [ ] Confirm all message formatting correct

## 👥 Team Training

### Documentation Distribution
- [ ] Share README.md with all team members
- [ ] Provide Google Sheet access to relevant staff
- [ ] Share Telegram group/chat for notifications
- [ ] Distribute role-specific instructions

### Process Training
- [ ] Train content reviewers on idea selection
- [ ] Show editors how to use sentence breakdown sheets
- [ ] Demonstrate manual status update process
- [ ] Practice approval workflows

### Troubleshooting Preparation
- [ ] Document common issues and solutions
- [ ] Set up support channel/contact
- [ ] Create escalation process for urgent issues
- [ ] Test error recovery procedures

## 🚀 Go-Live Checklist

### Pre-Launch Verification
- [ ] All credentials active and tested
- [ ] All workflows running without errors
- [ ] Team trained and ready
- [ ] Documentation accessible
- [ ] Support process established

### Launch Process
- [ ] Start with 2-3 test videos
- [ ] Monitor first complete cycle end-to-end
- [ ] Verify all notifications working
- [ ] Check file organization
- [ ] Confirm manual processes working

### Post-Launch Monitoring
- [ ] Monitor for 48 hours continuously
- [ ] Check daily reports accuracy
- [ ] Verify team can operate independently
- [ ] Collect feedback for improvements
- [ ] Document any issues encountered

## ⚡ Success Criteria

Your setup is complete and successful when:

- ✅ **Automation**: URLs process to breakdown without manual intervention
- ✅ **Notifications**: All Telegram alerts arrive promptly and accurately
- ✅ **Organization**: Files create and organize automatically in Drive
- ✅ **Manual Controls**: Team can approve/reject at decision points
- ✅ **Monitoring**: Daily reports provide accurate pipeline status
- ✅ **Independence**: Team operates system without technical support

## 📞 Support Information

### Technical Issues
- **N8N Problems**: Check execution logs and workflow status
- **API Issues**: Verify credentials and quotas
- **Google Services**: Check API console for errors

### Process Issues  
- **Workflow Questions**: Refer to README.md user guide
- **Content Quality**: Adjust OpenAI prompts as needed
- **Team Training**: Schedule additional training sessions

### Emergency Contacts
- System Administrator: `_____________________`
- N8N Support: `_____________________`
- OpenAI Support: https://help.openai.com

---

**Setup Time Estimate**: 45-60 minutes for technical setup + 30 minutes team training

**Next Steps After Completion**: Begin with 5-10 sample videos to validate end-to-end process before scaling to full production volume.