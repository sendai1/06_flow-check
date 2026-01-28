# GitHub CLIを使ってリポジトリを作成してプッシュするスクリプト
# PowerShellを再起動した後に実行してください

Write-Host "=== GitHubリポジトリ作成とプッシュ ===" -ForegroundColor Cyan
Write-Host ""

# GitHub CLIのパスを確認
$ghPath = "C:\Program Files\GitHub CLI\gh.exe"
if (-not (Test-Path $ghPath)) {
    $ghPath = "C:\Program Files (x86)\GitHub CLI\gh.exe"
}

if (-not (Test-Path $ghPath)) {
    Write-Host "GitHub CLIが見つかりません。PowerShellを再起動してください。" -ForegroundColor Red
    Write-Host ""
    Write-Host "手動で実行する場合:" -ForegroundColor Yellow
    Write-Host "1. PowerShellを再起動" -ForegroundColor White
    Write-Host "2. cd `"c:\AIプロジェクト\06_flow-check`"" -ForegroundColor White
    Write-Host "3. gh auth login" -ForegroundColor White
    Write-Host "4. gh repo create 06_flow-check --public --source=. --remote=origin --push" -ForegroundColor White
    exit
}

cd "c:\AIプロジェクト\06_flow-check"

# ロックファイルを削除
Write-Host "ロックファイルを削除しています..." -ForegroundColor Yellow
Remove-Item -Path ".git\index.lock" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".git\HEAD.lock" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".git\config.lock" -Force -ErrorAction SilentlyContinue

# GitHubにログイン（必要に応じて）
Write-Host ""
Write-Host "GitHubにログインします..." -ForegroundColor Yellow
& $ghPath auth login

# リポジトリを作成してプッシュ
Write-Host ""
Write-Host "リポジトリを作成してプッシュします..." -ForegroundColor Yellow
& $ghPath repo create 06_flow-check --public --source=. --remote=origin --push

Write-Host ""
Write-Host "=== 完了しました！ ===" -ForegroundColor Green
Write-Host "リポジトリURL: https://github.com/sendai1/06_flow-check" -ForegroundColor Cyan
