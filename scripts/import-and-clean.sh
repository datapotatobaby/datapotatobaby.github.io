# ~/Code/datapotatobaby.github.io/scripts/import-and-clean.sh

#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# Configuration
LOVABLE_PROJECT_DIR="$HOME/Code/portfolio-lovable" 
CURRENT_SITE_DIR="$(git rev-parse --show-toplevel)" # Should be ~/Code/datapotatobaby.github.io
CLEANUP_SCRIPT_PATH="$CURRENT_SITE_DIR/scripts/cleanup-external-deps.sh"
PULL_LOVABLE=true # Set to false if you want to skip pulling from Lovable's repo

echo ">>> Starting import and cleanup process..."
echo ">>> Lovable project source: $LOVABLE_PROJECT_DIR"
echo ">>> Current site destination: $CURRENT_SITE_DIR"

# Safety check: Ensure we are in the datapotatobaby.github.io repo
if [[ ! "$CURRENT_SITE_DIR" == *"/datapotatobaby.github.io"* ]]; then
  echo "ERROR: This script must be run from within the datapotatobaby.github.io repository."
  exit 1
fi

# Safety check: Ensure the Lovable project directory exists
if [ ! -d "$LOVABLE_PROJECT_DIR" ]; then
    echo "ERROR: Lovable project directory not found at $LOVABLE_PROJECT_DIR"
    exit 1
fi

# Safety check: Ensure cleanup script exists
if [ ! -f "$CLEANUP_SCRIPT_PATH" ]; then
    echo "ERROR: Cleanup script not found at $CLEANUP_SCRIPT_PATH"
    exit 1
fi

# Parse command line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --no-pull) PULL_LOVABLE=false ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

# Pull latest changes from Lovable's repository
if [ "$PULL_LOVABLE" = true ]; then
    echo ">>> Pulling latest changes from Lovable's GitHub repository..."
    (
        cd "$LOVABLE_PROJECT_DIR" || exit 1
        # Save current branch name
        CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "detached")
        echo ">>> Currently on branch: $CURRENT_BRANCH"
        
        # Check for uncommitted changes
        if ! git diff-index --quiet HEAD --; then
            echo "WARNING: You have uncommitted changes in portfolio-lovable repository."
            echo "These local changes might be overwritten by the pull."
            read -p "Continue anyway? (y/n) " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                echo ">>> Aborting pull. Please commit or stash your changes first."
                exit 1
            fi
        fi
        
        echo ">>> Pulling from origin $CURRENT_BRANCH..."
        git pull origin "$CURRENT_BRANCH"
        
        # Check pull success
        if [ $? -ne 0 ]; then
            echo "ERROR: Failed to pull from Lovable's repository."
            echo "Please resolve any conflicts manually and try again."
            exit 1
        fi
        
        echo ">>> Successfully pulled latest changes from Lovable's repository."
    )
else
    echo ">>> Skipping pull from Lovable's repository (--no-pull flag detected)."
fi

echo ">>> Copying files from Lovable project (excluding content you manage here)..."

# This rsync copies EVERYTHING from the root of the Lovable project
# to the root of your GitHub Pages repository, with specific exclusions.
# If this list grows at all, this script could benefit from a configuration
# file to handle the list of exclusions.
rsync -av --delete \\
  --exclude '.git/' \\
  --exclude '.github/' \\
  --exclude 'content/' \\
  --exclude 'public/site-config.json' \\
  --exclude 'scripts/' \\
  --exclude 'CNAME' \\
  --exclude 'README.md' \\
  "$LOVABLE_PROJECT_DIR/" "$CURRENT_SITE_DIR/"

echo ">>> Running cleanup script..."
bash "$CLEANUP_SCRIPT_PATH"

echo ">>> Import and cleanup complete."
echo ">>> Please review changes with 'git status' and 'git diff'."
echo ">>> If satisfied, commit and push the changes."