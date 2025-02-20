#!/bin/bash
cd ..
bun run build

cd v2
bun run "../dist/index.js" update