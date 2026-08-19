#!/bin/bash

# 进入项目目录
cd /c/Users/Administrator/Desktop/xiangpuchakan/xiangpuchakan

echo "=== 步骤1: 添加所有文件 ==="
git add .

echo ""
echo "=== 步骤2: 查看状态 ==="
git status

echo ""
echo "=== 步骤3: 提交 ==="
git commit -m "添加图片资源images目录"

echo ""
echo "=== 步骤4: 推送到GitHub ==="
git push origin main

echo ""
echo "=== 完成! ==="
read -p "按Enter键退出..."
