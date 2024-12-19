#!/bin/bash

# This script compares the contents of a specified directory with the original src build.
# Usage: ./compare.sh <directory_name>
# - Ensure 'jq' and 'bun' are installed.
# - The script will create a temporary './compare-test' directory and run 'bun dev' command.
# - It will then compare the contents of the specified directory with './compare-test/<directory_name>'.
# - Differences will be logged in './compare-output/<timestamp>--<version>.diff'.
# - The './compare-test' directory will be removed after the comparison.

name=$1

if [ -z "$name" ]; then
    echo "Please provide the name of the directory."
    exit 1
fi

if [ -d "./compare-test" ] && [ "$(ls -A ./compare-test)" ]; then
    echo "Directory './compare-test' is not empty. Aborting the process."
    exit 1
fi

if ! command -v jq &> /dev/null; then
    echo "jq command not found. Please install jq to proceed."
    exit 1
fi

version=$(jq -r '.version' package.json)
datetime=$(date +"$name-%d-%m-%H:%M-")

if ! command -v bun &> /dev/null; then
    echo "bun command not found. Please install bun to proceed."
    exit 1
fi

bun dev "$name" --directory ./compare-test -y -s
log_file="./compare-output/$datetime-$version.diff"
exclude_dirs="node_modules|.next|dist|bun.lockb|package-lock.json|.git|.prettierignore|tsconfig.json|eslint.config.mjs|.prettierrc.json"
mkdir -p ./compare-output

dir1="./$name"
dir2="./compare-test/$name"

if [ ! -d "$dir1" ]; then
    echo "Directory '$dir1' does not exist. Aborting the process."
    exit 1
fi

if [ ! -d "$dir2" ]; then
    echo "Directory '$dir2' does not exist. Aborting the process."
    exit 1
fi

find "$dir1" -type f | grep -Ev "($exclude_dirs)" | while read file; do
    relative_file="${file#$dir1/}"
    corresponding_file="$dir2/$relative_file"

    if [ -f "$corresponding_file" ]; then
        diff_output=$(diff -u "$file" "$corresponding_file")
        if [ -n "$diff_output" ]; then
            echo -e "\nDifferences found in:\n$file vs $corresponding_file \n\n" >> "$log_file"
            echo "$diff_output" >> "$log_file"
            echo -e "\n-----------------------------------------------\n" >> "$log_file"
        fi
    else
        echo -e "\nNo corresponding file in '$dir2' for $relative_file \n" >> "$log_file"
        echo -e "-----------------------------------------------\n" >> "$log_file"
    fi
done

find "$dir2" -type f | grep -Ev "($exclude_dirs)" | while read file; do
    relative_file="${file#$dir2/}"
    corresponding_file="$dir1/$relative_file"
    if [ ! -f "$corresponding_file" ]; then
        echo -e "\nFile exists in '$dir2' but not in '$dir1': $relative_file \n" >> "$log_file"
        echo -e "-----------------------------------------------\n" >> "$log_file"
    fi
done

rm -rf ./compare-test
echo -e "\nDone. Differences saved in $log_file"
