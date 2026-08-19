# 进入项目目录
cd /c/Users/Administrator/Desktop/xiangpuchakan/xiangpuchakan

echo "=== 检查 images 目录是否被 git 追踪 ==="
git ls-files images/ | head -5

echo ""
echo "=== 检查是否有 gitignore 规则排除 images ==="
git check-ignore -v images/平齐式/1.png

echo ""
echo "=== 检查当前分支 ==="
git branch -a

echo ""
echo "=== 重新添加 images 目录 ==="
git add -f images/

echo ""
echo "=== 提交并强制推送 ==="
git commit -m "重新添加图片资源"
git push origin master --force

echo ""
echo "=== 验证远程 ==="
git fetch origin
git ls-tree -r origin/master --name-only | grep "^images/" | head -10
