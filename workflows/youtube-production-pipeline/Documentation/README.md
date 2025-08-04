# YouTube Production Pipeline - Complete Setup Guide

## 🎬 System Overview

This automated YouTube production pipeline transforms YouTube URLs into complete production-ready content with:
- AI-powered content enhancement and script generation
- Sentence-level image prompt creation
- SEO-optimized titles and descriptions
- Telegram notifications for key events
- Manual approval gates for quality control
- Organized Google Drive file management

## 📋 Prerequisites

### Required Services
- **Google Workspace Account** with Drive and Sheets API access
- **N8N Instance** (cloud or self-hosted) version 1.0+
- **OpenAI API Account** with GPT-4 access
- **Telegram Bot** for notifications
- **Team Google Accounts** with appropriate permissions

### API Credits Needed
- **OpenAI**: ~$10-20/month for 50 videos (estimate)
- **Google APIs**: Free tier sufficient for most usage
- **Telegram**: Free

## 🚀 Quick Setup (30 Minutes)

### Step 1: Google Drive Setup (5 minutes)

1. Create main folder: `YouTube_Production_System/`
2. Create subfolders:
   ```
   YouTube_Production_System/
   ├── Master_Sheets/
   ├── Videos_In_Production/
   ├── Completed_Videos/
   └── Templates/
   ```
3. Note folder IDs from URLs for N8N configuration

### Step 2: Google Sheets Setup (10 minutes)

1. **Create Master Sheet:**
   - Import `Master_YouTube_Queue_Template.csv` into Google Sheets
   - Rename to `Master_YouTube_Queue`
   - Move to `Master_Sheets/` folder
   - Note the Sheet ID from URL

2. **Set up Data Validation:**
   - Column H (Selected_Idea): Dropdown with "Option 1, Option 2, Option 3"
   - Column J (Video_Editing_Status): "⏳ Not Started, 🟡 In Progress, 🔄 Review, ✅ Complete"
   - Column K (Audio_Status): "⏳ Not Started, 🟡 Recording, 🔄 Editing, ✅ Complete"
   - Column N (Priority): "🔴 High, 🟡 Medium, 🟢 Low"
   - Column P (Thumbnail_Status): "⏳ Not Started, 🎨 Design In Progress, 🔄 Review & Feedback, ✅ Approved"

3. **Set up Conditional Formatting:**
   - Status column: Color-code by status
   - Priority column: Red for High, Yellow for Medium, Green for Low
   - Progress columns: Green for Complete, Yellow for In Progress

### Step 3: Telegram Bot Setup (5 minutes)

1. Message @BotFather on Telegram
2. Create new bot: `/newbot`
3. Choose name and username
4. Copy bot token (format: `123456789:ABCdef...`)
5. Get your Chat ID:
   - Message your bot
   - Visit: `https://api.telegram.org/bot<TOKEN>/getUpdates`
   - Find your chat ID in the response

### Step 4: N8N Configuration (10 minutes)

1. **Import Workflows:**
   - Import all 4 JSON workflow files into N8N
   - `YouTube_Production_Main_Workflow.json`
   - `Daily_Status_Report_Workflow.json`
   - `Script_Processing_Workflow.json`
   - `Completion_Monitoring_Workflow.json`

2. **Configure Credentials:**
   - **Google Sheets**: OAuth2 authentication
   - **Google Drive**: Service account recommended
   - **OpenAI**: API key from OpenAI dashboard
   - **Telegram**: Bot token from BotFather

3. **Update Configuration:**
   Replace these placeholders in all workflows:
   - `YOUR_MASTER_SHEET_ID`: Your Google Sheet ID
   - `YOUR_TELEGRAM_CHAT_ID`: Your Telegram chat ID
   - `YOUR_VIDEOS_IN_PRODUCTION_FOLDER_ID`: Google Drive folder ID

4. **Activate Workflows:**
   - Enable all 4 workflows
   - Test with a sample YouTube URL

## 🔄 User Workflow Process

### Phase 1: URL Input & Processing
1. **Add YouTube URLs** to Master Sheet (Column B)
2. **Wait for Processing** (30 minutes max)
3. **Receive Telegram notification** when AI ideas are ready

### Phase 2: Idea Selection & Script Generation
1. **Review 3 AI ideas** in Master Sheet (Columns E, F, G)
2. **Select preferred option** in Column H dropdown
3. **Wait for script generation** (15 minutes)
4. **Receive notification** when enhanced script is ready

### Phase 3: Script Approval
1. **Review enhanced script** in individual production workbook
2. **Update Script_Status** column to ✅ Approved or ❌ Needs Revision
3. **Automatic processing** creates sentence breakdown and image prompts

### Phase 4: Production Tracking
1. **Update manual status columns** as work progresses:
   - Video_Editing_Status (Column J)
   - Audio_Status (Column K)
   - Thumbnail_Status (Column P)
2. **Set due dates** and assign editors
3. **Receive daily status reports** at 9 AM

## 📊 File Structure Generated

For each video, the system creates:

```
Videos_In_Production/
└── YT001_Video_Title/
    ├── YT001_Production_Workbook.xlsx (5 tabs)
    ├── Audio/
    ├── Images/
    ├── Video_Assets/
    └── Reference/
```

### Production Workbook Tabs:
1. **Video_Info**: Basic video details and metadata
2. **Full_Script**: Complete enhanced script by sections
3. **Sentence_Breakdown**: Individual sentences with image prompts and editing notes
4. **Production_Tracking**: Asset status and team assignments
5. **SEO_Marketing**: Optimized titles, descriptions, and thumbnail concepts

## 🔔 Notification System

### Telegram Alerts You'll Receive:
- **Ideas Ready**: When 3 AI content ideas are generated
- **Script Ready**: When enhanced script needs approval
- **Production Started**: When script is approved and breakdown created
- **Daily Status**: 9 AM summary of all video progress
- **Overdue Alerts**: When videos pass due dates
- **Queue Empty**: When no pending videos remain

## 🛠 Troubleshooting

### Common Issues:

**"No videos processing"**
- Check YouTube URLs are valid
- Verify Google Sheets permissions
- Check N8N workflow is active

**"AI ideas not generating"**
- Verify OpenAI API key and credits
- Check internet connectivity for N8N
- Review workflow execution logs

**"Telegram notifications not working"**
- Verify bot token is correct
- Check chat ID matches your account
- Ensure bot is not blocked

**"Google Drive folders not creating"**
- Check Google Drive API permissions
- Verify service account has write access
- Check folder ID configuration

### Getting Help:
1. Check N8N execution logs for errors
2. Verify all credentials are active
3. Test individual workflow components
4. Review Google API quotas and limits

## 📈 Performance & Scaling

### Expected Processing Times:
- **URL to Ideas**: 3-5 minutes per video
- **Idea to Script**: 5-10 minutes after selection
- **Script to Breakdown**: 10-15 minutes after approval
- **Total Automation Time**: 20-30 minutes per video

### Scaling Recommendations:
- **Small Team (1-10 videos/week)**: Current setup handles easily
- **Medium Team (10-50 videos/week)**: Consider dedicated N8N instance
- **Large Team (50+ videos/week)**: May need OpenAI rate limit increases

### Cost Estimates:
- **OpenAI**: ~$0.20-0.50 per video processed
- **Google APIs**: Free for typical usage
- **N8N**: $20-50/month for cloud hosting
- **Total**: ~$25-75/month for 50 videos

## 🎯 Success Metrics

Your system is working correctly when:
- ✅ URLs process to ideas within 30 minutes
- ✅ All Telegram notifications arrive promptly
- ✅ Files organize automatically in Drive
- ✅ Manual approvals update workflow correctly
- ✅ Daily reports provide accurate status
- ✅ Team can operate independently

## 🔧 Customization Options

### Modify AI Prompts:
- Edit OpenAI node prompts for different content styles
- Adjust temperature settings for more/less creative output
- Customize SEO optimization for your niche

### Change Notification Frequency:
- Adjust schedule triggers for different monitoring intervals
- Modify Telegram message templates
- Add/remove notification types

### Extend Workflow:
- Add more approval gates
- Include additional file types
- Integrate with other tools (Slack, email, etc.)

This system provides a professional, scalable solution for YouTube content production with the perfect balance of automation and human control.