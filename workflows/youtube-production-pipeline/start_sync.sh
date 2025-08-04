#!/bin/bash

# YouTube Production Pipeline - N8N Sync Monitor
# Monitors localhost N8N and syncs workflow changes to JSON files

echo "🎬 YouTube Production Pipeline - N8N Sync Monitor"
echo "=================================================="
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
else
    echo "❌ N8N instance not accessible on localhost:5678"
    echo "   Please make sure N8N is running locally"
    echo "   Start N8N with: npx n8n start"
    exit 1
fi

echo ""
echo "🚀 Starting workflow sync monitor..."
echo "   - Monitors every 30 seconds"
echo "   - Syncs changes to N8N_Workflows/ folder"
echo "   - Press Ctrl+C to stop"
echo ""

# Start the monitor
node sync_monitor.js