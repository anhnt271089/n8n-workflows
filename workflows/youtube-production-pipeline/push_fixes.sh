#!/bin/bash

# Push Fixed Workflows to N8N - Quick Sync Tool

echo "🔧 YouTube Production Pipeline - Push Fixed Workflows"
echo "====================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed or not in PATH"
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if N8N is running on localhost:5678
echo "🔍 Checking N8N connection..."
if curl -s http://localhost:5678/rest/workflows > /dev/null 2>&1; then
    echo "✅ N8N instance detected on localhost:5678"
elif curl -s http://localhost:5678 > /dev/null 2>&1; then
    echo "⚠️  N8N detected but API may require authentication"
    echo "   The script will attempt to push workflows..."
else
    echo "❌ N8N instance not accessible on localhost:5678"
    echo "   Please make sure N8N is running locally"
    echo "   Start N8N with: npx n8n start"
    exit 1
fi

echo ""
echo "🚀 Pushing fixed workflows to N8N..."
echo "   This will update your existing workflows with OpenAI fixes"
echo ""

# Push the main workflow with OpenAI fixes
echo "📤 Pushing YouTube Production Main Workflow (with OpenAI fixes)..."
node sync_to_n8n.js "YouTube Production Pipeline - Main Workflow"

echo ""
echo "📤 Pushing Script Processing Workflow (with OpenAI fixes)..."
node sync_to_n8n.js "YouTube Production - Script Processing & Content Generation"

echo ""
echo "🎉 Fixed workflows have been pushed to N8N!"
echo ""
echo "🔄 Next steps:"
echo "   1. Open N8N web interface (http://localhost:5678)"
echo "   2. Check that workflows imported successfully"
echo "   3. Verify OpenAI nodes no longer show 'message' error"
echo "   4. Test with a sample YouTube URL"
echo ""
echo "⚠️  Note: You may need to reconfigure credentials after import"