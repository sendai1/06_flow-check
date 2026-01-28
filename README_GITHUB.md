# GitHubアップロード手順

## 問題：.gitフォルダがロックされている場合

`.git`フォルダが削除できない場合は、以下の手順で解決してください。

### 解決方法1：Cursorを閉じる（推奨）

1. **Cursorを完全に閉じる**
   - すべてのCursorウィンドウを閉じる
   - タスクマネージャーでCursorプロセスが残っていないか確認

2. **エクスプローラーで.gitフォルダを削除**
   - `c:\AIプロジェクト\06_flow-check` を開く
   - 表示設定で「隠しファイル」を表示
   - `.git` フォルダを右クリック → 削除

3. **PowerShellでスクリプトを実行**
   ```powershell
   cd "c:\AIプロジェクト\06_flow-check"
   .\create-github-repo.ps1
   ```

### 解決方法2：GitHub CLIを使用

1. **GitHub CLIをインストール**
   - https://cli.github.com/ からインストール

2. **GitHubにログイン**
   ```powershell
   gh auth login
   ```

3. **リポジトリを作成してプッシュ**
   ```powershell
   cd "c:\AIプロジェクト\06_flow-check"
   gh repo create 06_flow-check --public --source=. --remote=origin --push
   ```

### 解決方法3：手動でGitHubリポジトリを作成

1. **GitHubでリポジトリを作成**
   - https://github.com/new にアクセス
   - リポジトリ名: `06_flow-check`
   - Public または Private を選択
   - 「Create repository」をクリック
   - **重要**: README、.gitignore、ライセンスは追加しない

2. **.gitフォルダを削除（Cursorを閉じてから）**
   - エクスプローラーで `.git` フォルダを削除

3. **Gitリポジトリを初期化**
   ```powershell
   cd "c:\AIプロジェクト\06_flow-check"
   git init
   git add .
   git commit -m "Initial commit: 仙台第一事務所 業務フロー整理 Googleフォーム"
   git branch -M main
   git remote add origin https://github.com/sendai1/06_flow-check.git
   git push -u origin main
   ```

## トラブルシューティング

### .gitフォルダが削除できない場合

1. タスクマネージャーで `git.exe` や `git-credential-manager.exe` が実行されていないか確認
2. それらを終了してから再試行
3. それでも削除できない場合は、PCを再起動

### プッシュ時に認証エラーが出る場合

```powershell
git config --global credential.helper manager-core
```

その後、再度プッシュを試みてください。GitHubの認証画面が表示されます。
