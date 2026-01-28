# GitHubリポジトリ作成とアップロードスクリプト
# このスクリプトを実行すると、Gitリポジトリを初期化し、GitHubにアップロードします

cd "c:\AIプロジェクト\06_flow-check"

Write-Host "=== GitHubリポジトリ作成とアップロード ===" -ForegroundColor Cyan
Write-Host ""

# .gitフォルダを強制削除
Write-Host "1. 既存の.gitフォルダを削除しています..." -ForegroundColor Yellow
if (Test-Path .git) {
    try {
        # すべてのプロセスを終了してから削除を試みる
        Get-ChildItem -Path .git -Recurse -Force | ForEach-Object {
            $_.Attributes = 'Normal'
        }
        Remove-Item -Path .git -Recurse -Force -ErrorAction Stop
        Write-Host "   .gitフォルダを削除しました。" -ForegroundColor Green
        Start-Sleep -Seconds 1
    } catch {
        Write-Host "   エラー: .gitフォルダを削除できませんでした。" -ForegroundColor Red
        Write-Host "   手動で削除してください: エクスプローラーで.gitフォルダを削除" -ForegroundColor Yellow
        Write-Host "   エラー詳細: $_" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "   .gitフォルダは存在しません。" -ForegroundColor Green
}

# Gitリポジトリを初期化
Write-Host ""
Write-Host "2. Gitリポジトリを初期化しています..." -ForegroundColor Yellow
git init
if ($LASTEXITCODE -ne 0) {
    Write-Host "   エラー: Gitリポジトリの初期化に失敗しました。" -ForegroundColor Red
    exit 1
}
Write-Host "   初期化が完了しました。" -ForegroundColor Green

# すべてのファイルをステージング
Write-Host ""
Write-Host "3. ファイルをステージングしています..." -ForegroundColor Yellow
git add .
Write-Host "   ステージングが完了しました。" -ForegroundColor Green

# 初回コミット
Write-Host ""
Write-Host "4. 初回コミットを作成しています..." -ForegroundColor Yellow
git commit -m "Initial commit: 仙台第一事務所 業務フロー整理 Googleフォーム"
if ($LASTEXITCODE -ne 0) {
    Write-Host "   エラー: コミットに失敗しました。" -ForegroundColor Red
    exit 1
}
Write-Host "   コミットが完了しました。" -ForegroundColor Green

# ブランチ名をmainに変更
Write-Host ""
Write-Host "5. ブランチ名をmainに変更しています..." -ForegroundColor Yellow
git branch -M main
Write-Host "   ブランチ名を変更しました。" -ForegroundColor Green

# GitHubリポジトリの情報
$username = "sendai1"
$repoName = "06_flow-check"
$repoUrl = "https://github.com/$username/$repoName.git"

Write-Host ""
Write-Host "=== 次のステップ ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "GitHubでリポジトリを作成してください:" -ForegroundColor Yellow
Write-Host "1. https://github.com/new にアクセス" -ForegroundColor White
Write-Host "2. リポジトリ名: $repoName" -ForegroundColor White
Write-Host "3. Public または Private を選択" -ForegroundColor White
Write-Host "4. 「Create repository」をクリック" -ForegroundColor White
Write-Host ""
Write-Host "リポジトリを作成したら、以下のコマンドを実行してください:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  git remote add origin $repoUrl" -ForegroundColor White
Write-Host "  git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "または、このスクリプトを続行して自動で接続しますか？ (Y/N)" -ForegroundColor Cyan
$response = Read-Host

if ($response -eq "Y" -or $response -eq "y") {
    Write-Host ""
    Write-Host "6. リモートリポジトリを追加しています..." -ForegroundColor Yellow
    git remote add origin $repoUrl 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "   警告: リモートの追加に失敗しました（既に存在する可能性があります）" -ForegroundColor Yellow
    } else {
        Write-Host "   リモートを追加しました。" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "7. GitHubにプッシュしています..." -ForegroundColor Yellow
    Write-Host "   注意: GitHubリポジトリが存在しない場合はエラーになります。" -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "=== 完了しました！ ===" -ForegroundColor Green
        Write-Host "リポジトリURL: https://github.com/$username/$repoName" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "エラー: プッシュに失敗しました。" -ForegroundColor Red
        Write-Host "GitHubリポジトリが作成されているか確認してください。" -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "手動で接続してください。" -ForegroundColor Yellow
}
