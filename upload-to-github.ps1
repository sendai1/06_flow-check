# GitHubアップロード用スクリプト
# PowerShellで実行: .\upload-to-github.ps1

Write-Host "GitHubアップロードスクリプトを開始します..." -ForegroundColor Green

# 現在のディレクトリに移動
$projectPath = "c:\AIプロジェクト\06_flow-check"
Set-Location $projectPath

# .gitフォルダが存在する場合、削除を試みる
if (Test-Path .git) {
    Write-Host ".gitフォルダが見つかりました。削除を試みます..." -ForegroundColor Yellow
    try {
        Remove-Item -Path .git -Recurse -Force
        Write-Host ".gitフォルダを削除しました。" -ForegroundColor Green
    } catch {
        Write-Host "エラー: .gitフォルダを削除できませんでした。手動で削除してください。" -ForegroundColor Red
        Write-Host "エラー詳細: $_" -ForegroundColor Red
        exit 1
    }
}

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

Write-Host "`n次のステップ:" -ForegroundColor Cyan
Write-Host "1. GitHubでリポジトリを作成してください: https://github.com/new" -ForegroundColor Yellow
Write-Host "2. リポジトリ名を入力（例: 06_flow-check）" -ForegroundColor Yellow
Write-Host "3. 以下のコマンドを実行してください（YOUR_USERNAMEを置き換えてください）:" -ForegroundColor Yellow
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/06_flow-check.git" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host "`nまたは、GitHub CLIを使用する場合:" -ForegroundColor Cyan
Write-Host "   gh repo create 06_flow-check --public --source=. --remote=origin --push" -ForegroundColor White
