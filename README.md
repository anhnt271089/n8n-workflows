# N8N Workflows Collection

A curated collection of N8N automation workflows for various use cases.

## 📁 Project Structure

```
n8n-workflows/
├── workflows/
│   ├── basic/           # Simple, beginner-friendly workflows
│   ├── advanced/        # Complex workflows with multiple integrations
│   └── templates/       # Reusable workflow templates
├── docs/               # Documentation and guides
└── README.md          # This file
```

## 🚀 Getting Started

### Prerequisites
- N8N installed and running (version 1.0+)
- Basic understanding of N8N concepts

### Installation
1. Clone this repository
2. Import the workflow JSON files into your N8N instance
3. Configure any required credentials and settings

## 📋 Available Workflows

### Basic Workflows

#### 1. Sample HTTP Workflow (`sample-http-workflow.json`)
**Purpose**: Demonstrates basic HTTP request handling and data processing

**Features**:
- Makes HTTP GET request to JSONPlaceholder API
- Processes response data with JavaScript code
- Implements conditional logic based on word count
- Logs results based on conditions

**Nodes Used**:
- HTTP Request
- Code (JavaScript)
- IF (Conditional logic)
- No Operation (Logging)

#### 2. Email Notification Workflow (`email-notification-workflow.json`)
**Purpose**: Automated daily email reports for GitHub issues

**Features**:
- Scheduled execution (weekdays at 9 AM)
- Fetches open GitHub issues from Microsoft/VSCode repository
- Processes and formats issue data
- Sends email report only when issues are found
- Handles empty results gracefully

**Nodes Used**:
- Schedule Trigger
- HTTP Request
- Code (JavaScript)
- IF (Conditional logic)
- Email Send
- No Operation (Logging)

## 🔧 Configuration

### Email Setup
For the email notification workflow, you'll need to configure:
1. SMTP credentials in N8N settings
2. Update email addresses in the workflow
3. Modify the GitHub repository URL if needed

### GitHub API
- No authentication required for public repositories
- For private repos, add GitHub credentials in N8N

## 📖 Usage Instructions

1. **Import Workflow**:
   - Open N8N interface
   - Click "Import from File"
   - Select the desired JSON workflow file

2. **Configure Credentials**:
   - Set up any required API keys or credentials
   - Test connections before activating

3. **Activate Workflow**:
   - Review and test the workflow
   - Click "Active" to enable automatic execution

## 🛠️ Customization

### Modifying Schedules
To change the email notification schedule:
1. Edit the Schedule Trigger node
2. Modify the cron expression (currently set to weekdays at 9 AM)

### Adding New Data Sources
To fetch data from different APIs:
1. Update the HTTP Request node URL
2. Modify the data processing code accordingly
3. Adjust conditional logic as needed

## 📚 Learning Resources

- [N8N Documentation](https://docs.n8n.io/)
- [N8N Community](https://community.n8n.io/)
- [N8N YouTube Channel](https://www.youtube.com/c/n8nio)

## 🤝 Contributing

1. Fork this repository
2. Create your workflow
3. Test thoroughly
4. Submit a pull request with:
   - Clear workflow description
   - Usage instructions
   - Example screenshots

## 📝 Workflow Template

When creating new workflows, include:
- Clear naming convention
- Proper error handling
- Documentation comments
- Test data examples

## 🏷️ Tags and Organization

Workflows are tagged for easy categorization:
- `basic`: Simple workflows for beginners
- `automation`: General automation tasks
- `email`: Email-related workflows
- `api`: API integration workflows
- `scheduled`: Time-based triggers

## ⚠️ Important Notes

- Always test workflows in a safe environment first
- Be mindful of API rate limits
- Secure sensitive credentials properly
- Monitor workflow execution logs
- Keep workflows updated with latest N8N versions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions or issues:
- Check N8N documentation
- Visit N8N community forums
- Open an issue in this repository

---

**Happy Automating! 🎉**