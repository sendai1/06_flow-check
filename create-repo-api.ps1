# GitHub APIを使ってリポジトリを作成するスクリプト
# Personal Access Tokenが必要です

Write-Host "=== GitHub APIでリポジトリ作成 ===" -ForegroundColor Cyan
Write-Host ""

# Personal Access Tokenの入力
Write-Host "GitHub Personal Access Tokenが必要です。" -ForegroundColor Yellow
Write-Host "トークンの作成方法:" -ForegroundColor Cyan
Write-Host "1. https://github.com/settings/tokens にアクセス" -ForegroundColor White
Write-Host "2. 「Generate new token (classic)」をクリック" -ForegroundColor White
Write-Host "3. 「repo」スコープにチェック" -ForegroundColor White
Write-Host "4. トークンを生成してコピー" -ForegroundColor White
Write-Host ""

$token = Read-Host "Personal Access Tokenを入力してください"

if ([string]::IsNullOrWhiteSpace($token)) {
    Write-Host "トークンが入力されていません。" -ForegroundColor Red
    exit 1
}

# リポジトリ情報
$repoName = "06_flow-check"
$repoDescription = "仙台第一事務所 業務フロー整理 Googleフォーム"
$isPrivate = $false

# GitHub APIでリポジトリを作成
Write-Host ""
Write-Host "リポジトリを作成しています..." -ForegroundColor Yellow

$headers = @{
    Authorization = "token $token"
    Accept = "application/vnd.github.v3+json"
}

$body = @{
    name = $repoName
    description = $repoDescription
    private = $isPrivate
    auto_init = $false
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" `
        -Method Post `
        -Headers $headers `
        -Body $body `
        -ContentType "application/json"
    
    Write-Host "リポジトリが作成されました！" -ForegroundColor Green
    Write-Host "URL: $($response.html_url)" -ForegroundColor Cyan
    
    # Gitリポジトリを初期化してプッシュ
    Write-Host ""
    Write-Host "Gitリポジトリを初期化しています..." -ForegroundColor Yellow
    cd "c:\AIプロジェクト\06_flow-check"
    
    # ロックファイルを削除
    Remove-Item -Path ".git\index.lock" -Force -ErrorAction SilentlyContinue
    Remove-Item -Path ".git\HEAD.lock" -Force -ErrorAction SilentlyContinue
    Remove-Item -Path ".git\config.lock" -Force -ErrorAction SilentlyContinue
    
    git add .
    git commit -m "Initial commit: $repoDescription"
    git branch -M main
    git remote add origin $response.clone_url
    git push -u origin main
    
    Write-Host ""
    Write-Host "=== 完了しました！ ===" -ForegroundColor Green
    
} catch {
    Write-Host "エラーが発生しました: $_" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
