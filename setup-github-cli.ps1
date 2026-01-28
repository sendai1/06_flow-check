# GitHub CLIをインストールしてリポジトリを作成するスクリプト

Write-Host "=== GitHub CLIのインストールとリポジトリ作成 ===" -ForegroundColor Cyan
Write-Host ""

# GitHub CLIがインストールされているか確認
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue

if (-not $ghInstalled) {
    Write-Host "GitHub CLIがインストールされていません。" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "インストール方法:" -ForegroundColor Cyan
    Write-Host "1. https://cli.github.com/ にアクセス" -ForegroundColor White
    Write-Host "2. Windows用のインストーラーをダウンロード" -ForegroundColor White
    Write-Host "3. インストーラーを実行" -ForegroundColor White
    Write-Host ""
    Write-Host "または、wingetを使用してインストール:" -ForegroundColor Cyan
    Write-Host "winget install --id GitHub.cli" -ForegroundColor White
    Write-Host ""
    
    $install = Read-Host "wingetでインストールしますか？ (Y/N)"
    if ($install -eq "Y" -or $install -eq "y") {
        winget install --id GitHub.cli
        Write-Host ""
        Write-Host "インストールが完了しました。PowerShellを再起動してください。" -ForegroundColor Green
        exit
    } else {
        Write-Host "手動でインストールしてください。" -ForegroundColor Yellow
        exit
    }
} else {
    Write-Host "GitHub CLIは既にインストールされています。" -ForegroundColor Green
}

# GitHubにログイン
Write-Host ""
Write-Host "GitHubにログインします..." -ForegroundColor Yellow
gh auth login

# リポジトリを作成
Write-Host ""
Write-Host "リポジトリを作成します..." -ForegroundColor Yellow
cd "c:\AIプロジェクト\06_flow-check"
gh repo create 06_flow-check --public --source=. --remote=origin --push

Write-Host ""
Write-Host "=== 完了しました！ ===" -ForegroundColor Green
Write-Host "リポジトリURL: https://github.com/sendai1/06_flow-check" -ForegroundColor Cyan
