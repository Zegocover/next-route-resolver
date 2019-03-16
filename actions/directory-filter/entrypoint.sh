#!/bin/sh -l

if git diff --name-only origin/master...$GITHUB_SHA | grep -F $*; then
    exit 0
else
    echo "Subtree doesn\'t match"
    exit 78
fi
