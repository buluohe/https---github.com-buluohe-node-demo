#!/bin/sh
cd /Users/zhangboyu/CODE-DEMO/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log