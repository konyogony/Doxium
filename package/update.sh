#!/bin/bash
cd ..
bun run build

cd test
bun run "../dist/index.js" update