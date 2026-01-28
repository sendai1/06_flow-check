# GitHubアップロード用スクリプト
# .gitフォルダを削除した後に実行してください

cd "c:\AIプロジェクト\06_flow-check"

# Gitリポジトリを初期化
Write-Host "Gitリポジトリを初期化しています..." -ForegroundColor Green
git init

# すべてのファイルをステージング
Write-Host "ファイルをステージングしています..." -ForegroundColor Green
git add .

# 初回コミット
Write-Host "初回コミットを作成しています..." -ForegroundColor Green
git commit -m "Initial commit: 仙台第一事務所 業務フロー整理 Googleフォーム"

# ブランチ名をmainに変更
Write-Host "ブランチ名をmainに変更しています..." -ForegroundColor Green
git branch -M main

# GitHubリポジトリのURL
$username = "sendai1"
$repoName = "06_flow-check"
$repoUrl = "https://github.com/$username/$repoName.git"

Write-Host "`nリモートリポジトリを追加しています..." -ForegroundColor Green
git remote add origin $repoUrl

Write-Host "`nGitHubにプッシュしています..." -ForegroundColor Green
Write-Host "注意: GitHubリポジトリが存在しない場合は、先に作成してください: https://github.com/new" -ForegroundColor Yellow
git push -u origin main

Write-Host "`n完了しました！" -ForegroundColor Green
