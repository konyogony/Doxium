#!/bin/bash
cd ..
bun run build

cd new
bun run "../dist/index.js" update