# YouTube Production Workbook Template

## Template Spreadsheet Setup Instructions

### **Step 1: Create Template Spreadsheet**

1. **Go to Google Sheets**: https://sheets.google.com
2. **Create new spreadsheet**: Name it "YouTube_Production_Workbook_TEMPLATE"
3. **Create 5 tabs** with the following names and headers:

---

## **Tab 1: Script_Content**

**Purpose**: Store the enhanced AI-generated script and metadata

| Column | Header | Description |
|--------|--------|-------------|
| A | Video_ID | Unique identifier for the video |
| B | Video_Title | Original video title from YouTube |
| C | Selected_Concept | The AI concept selected for enhancement |
| D | Script_Section | Section name (e.g., "Enhanced Script") |
| E | Content | Full script content |
| F | Timestamp | When script was generated |
| G | Notes | Additional notes about the script |
| H | Status | Review status (Draft/Approved/Needs Changes) |

**Sample Data Row**:
```
V001 | How to Learn Programming | Interactive approach | Enhanced Script | [Full Script Content] | 2024-01-01T10:00:00Z | AI-enhanced for engagement | 📝 Draft Ready
```

---

## **Tab 2: Image_Prompts**

**Purpose**: Sentence-by-sentence breakdown with image prompts for video creation

| Column | Header | Description |
|--------|--------|-------------|
| A | Sentence_Number | Sequential number (001, 002, etc.) |
| B | Script_Text | The actual sentence from script |
| C | Keywords | 2-4 key words to emphasize |
| D | Visual_Cues | Emoji + description for emphasis |
| E | Image_Prompt | Detailed AI image generation prompt |
| F | Scene_Type | Hook/Introduction/Main Content/CTA |
| G | Edit_Notes | Specific editing instructions |

**Sample Data Row**:
```
001 | Welcome to today's programming tutorial | programming, tutorial, welcome | 🎯 Opening energy | Create an energetic coding workspace with multiple monitors showing code | Hook | Add dynamic zoom effect
```

---

## **Tab 3: SEO_Content**

**Purpose**: Title variations, descriptions, and thumbnail concepts

| Column | Header | Description |
|--------|--------|-------------|
| A | Type | Content type (Title 1-5, Description, Thumbnail 1-3) |
| B | Content | The actual content/text |
| C | Length | Character count |
| D | CTR_Focus | Click-through rate focus area |
| E | Notes | Usage notes and recommendations |

**Sample Data Rows**:
```
Title 1 | How to Code Like a Pro in 30 Days 🚀 | 35 | SEO Optimized | Main title for upload
Title 2 | This Coding Method Will Blow Your Mind | 38 | High CTR | Alternative high-engagement title
Description | Learn programming with this step-by-step guide... | 150 | SEO + Value | Include timestamps and resources
Thumbnail 1 | Split screen: confused person vs confident coder | 45 | Visual Appeal | Before/after concept
```

---

## **Tab 4: Production_Timeline**

**Purpose**: Project management and task tracking

| Column | Header | Description |
|--------|--------|-------------|
| A | Task | Specific task name |
| B | Assigned_To | Team member responsible |
| C | Due_Date | Target completion date |
| D | Status | Current status with emoji |
| E | Priority | High/Medium/Low with emoji |
| F | Notes | Additional task details |

**Sample Data Rows**:
```
Script Review & Approval | Content Manager | 2024-01-02 | ⏳ Pending Review | 🔴 High | Review AI script and approve
Asset Creation | Designer | 2024-01-03 | ⏳ Pending | 🟡 Medium | Create images from prompts
Video Recording | Video Creator | 2024-01-04 | ⏳ Pending | 🔴 High | Record following approved script
Video Editing | Video Editor | 2024-01-06 | ⏳ Pending | 🔴 High | Edit with assets and transitions
YouTube Upload | Content Manager | 2024-01-08 | ⏳ Pending | 🔴 High | Final upload and scheduling
```

---

## **Tab 5: Review_Feedback**

**Purpose**: Track feedback and revisions throughout production

| Column | Header | Description |
|--------|--------|-------------|
| A | Reviewer | Person providing feedback |
| B | Section | Which part of production |
| C | Feedback | Specific feedback/comments |
| D | Action_Required | What needs to be done |
| E | Resolved | Yes/No/In Progress |
| F | Date | When feedback was given |

**Sample Data Row**:
```
Content Manager | Script | Opening hook needs more energy | Add excitement to first 10 seconds | No | 2024-01-02
```

---

### **Step 2: Format Template**

1. **Add Data Validation**:
   - Status columns: Dropdown with predefined values
   - Priority: 🔴 High, 🟡 Medium, 🟢 Low
   - Resolved: Yes, No, In Progress

2. **Apply Conditional Formatting**:
   - Status columns: Color code by status
   - Priority: Red/Yellow/Green backgrounds
   - Due dates: Highlight overdue items

3. **Protect Headers**: Lock first row to prevent accidental edits

4. **Set Permissions**: Share with your N8N service account email

---

### **Step 3: Get Template ID**

1. **Copy the spreadsheet URL**: `https://docs.google.com/spreadsheets/d/TEMPLATE_ID_HERE/edit`
2. **Extract the ID**: The long string between `/d/` and `/edit`
3. **Update workflow**: Replace `1TEMPLATE_WORKBOOK_ID_REPLACE_THIS` with your actual template ID

---

### **Step 4: Test Template**

1. **Manual Test**: Copy template manually and verify structure
2. **N8N Test**: Run workflow and check if tabs populate correctly
3. **Permission Test**: Ensure you can access copied workbooks

---

## **Template Benefits**

✅ **Consistent Structure**: Every video project has same layout  
✅ **Pre-formatted**: Headers, validations, formatting ready  
✅ **Team Collaboration**: Multiple people can work on different tabs  
✅ **Progress Tracking**: Clear status and timeline visibility  
✅ **Quality Control**: Structured feedback and approval process  

---

## **Usage Notes**

- **One workbook per video**: Each video gets its own copy
- **Real-time collaboration**: Multiple team members can edit simultaneously
- **Version control**: Google Sheets automatically saves all changes
- **Mobile access**: Team can update status from mobile devices
- **Integration ready**: Works seamlessly with N8N automation

---

## **Troubleshooting**

**Problem**: Template not copying
- **Solution**: Check service account has access to template

**Problem**: Tabs not populating
- **Solution**: Verify tab names match exactly (case-sensitive)

**Problem**: Permission denied
- **Solution**: Ensure template is shared with workflow email

**Problem**: Data not formatting
- **Solution**: Check data types and validation rules