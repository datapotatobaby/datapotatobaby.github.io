#!/bin/bash

# Script name: cleanup-external-deps.sh

# Set the project root directory (assuming script is run from project root)
PROJECT_ROOT=$(pwd)

echo "Starting cleanup of external dependencies..."

# 1. Remove GPT Engineer script from index.html
echo "Removing GPT Engineer script from index.html..."
sed -i '/<!-- IMPORTANT: DO NOT REMOVE THIS SCRIPT TAG OR THIS VERY COMMENT! -->/d' "$PROJECT_ROOT/index.html"
sed -i '/https:\/\/cdn\.gpteng\.co\/gptengineer\.js/d' "$PROJECT_ROOT/index.html"

# 2. Remove lovable-tagger from package.json and reinstall dependencies
echo "Removing lovable-tagger from package.json..."
if jq 'del(.devDependencies["lovable-tagger"])' "$PROJECT_ROOT/package.json" > temp.json && mv temp.json "$PROJECT_ROOT/package.json"; then
    echo "lovable-tagger removed from package.json"
    # Reinstall dependencies
    echo "Reinstalling dependencies..."
    npm install
else
    echo "Error: Failed to modify package.json"
    exit 1
fi

# 3. Handle OpenGraph image
echo "Setting up OpenGraph image..."
# Create meta images directory if it doesn't exist
mkdir -p "$PROJECT_ROOT/public/images/meta"

# Download OpenGraph image if it doesn't exist locally
if [ ! -f "$PROJECT_ROOT/public/images/meta/opengraph.png" ]; then
    echo "Downloading OpenGraph image..."
    curl -o "$PROJECT_ROOT/public/images/meta/opengraph.png" "https://lovable.dev/opengraph-image-p98pqg.png"
fi

# Update OpenGraph image references in index.html
echo "Updating OpenGraph image references..."
sed -i 's|https://lovable.dev/opengraph-image-p98pqg.png|/images/meta/opengraph.png|g' "$PROJECT_ROOT/index.html"

echo "Cleanup complete!"