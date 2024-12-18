#!/bin/bash

# Get the name input argument
name=$1

# Check if the name argument is provided
if [ -z "$name" ]; then
    echo "Please provide the name of the directory."
    exit 1
fi

# Check if the ./test directory exists and is empty
if [ -d "./test" ] && [ "$(ls -A ./test)" ]; then
    echo "Directory './test' is not empty. Aborting the process."
    exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "jq command not found. Please install jq to proceed."
    exit 1
fi

# Get the version from package.json using jq
version=$(jq -r '.version' package.json)

# Get the current date and time for the log filename
datetime=$(date +"%Y-%m-%d--%H:%M:%S-")

# Check if bun is installed
if ! command -v bun &> /dev/null; then
    echo "bun command not found. Please install bun to proceed."
    exit 1
fi

# Run the bun dev command
bun dev "$name" --directory ./test -y -s

# Define the log file path with .diff extension
log_file="./compare-output/$datetime-$version.diff"

# Run the bun dev command
bun dev "$name" --directory ./test -y -s

# Directories and files to exclude from the comparison
exclude_dirs="node_modules|.next|dist|bun.lockb|package-lock.json|.git|.prettierignore|tsconfig.json|eslint.config.mjs|.prettierrc.json"

# Start writing the diff header in the log file
echo "Comparing ./test/$name with ./$name (excluding: $exclude_dirs)" > "$log_file"
echo "" >> "$log_file"

# Loop over all files in ./test/$name, excluding certain directories
find ./test/$name -type f | grep -Ev "$exclude_dirs" | while read file; do
    # Remove the './test/' prefix to get the relative path
    relative_file="${file#./test/}"

    # Check if the corresponding file exists in ./$name
    if [ -f "./$name/$relative_file" ]; then
        echo "Comparing $file with ./$name/$relative_file" >> "$log_file"
        # Generate the diff and append to the log file in .diff format
        diff -u "$file" ./$name/$relative_file >> "$log_file"
        echo "" >> "$log_file" # New line between file diffs
    else
        echo "No corresponding file in ./$name for $relative_file" >> "$log_file"
    fi
done

# Clean up by removing the ./test directory
rm -rf ./test

echo "Done. Differences saved in $log_file"
