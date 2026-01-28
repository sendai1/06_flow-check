# GitHubアップロード手順

このプロジェクトをGitHubにアップロードする手順です。

## 方法1：GitHub CLIを使用（推奨）

### 1. GitHub CLIのインストール

GitHub CLIがインストールされていない場合：
- [GitHub CLI公式サイト](https://cli.github.com/)からインストール

### 2. GitHubにログイン

```bash
gh auth login
```

### 3. リポジトリを作成してアップロード

```bash
cd "c:\AIプロジェクト\06_flow-check"
gh repo create 06_flow-check --public --source=. --remote=origin --push
```

## 方法2：GitHubウェブサイトから作成

### 1. GitHubでリポジトリを作成

1. [GitHub](https://github.com)にログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名を入力（例：`06_flow-check`）
4. 「Public」または「Private」を選択
5. 「Create repository」をクリック

### 2. ローカルでGitリポジトリを初期化

```bash
cd "c:\AIプロジェクト\06_flow-check"

# .gitフォルダが存在する場合は削除（必要に応じて）
Remove-Item -Path .git -Recurse -Force -ErrorAction SilentlyContinue

# Gitリポジトリを初期化
git init

# すべてのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: 仙台第一事務所 業務フロー整理 Googleフォーム"

# ブランチ名をmainに変更
git branch -M main

# リモートリポジトリを追加（YOUR_USERNAMEとREPO_NAMEを置き換えてください）
git remote add origin https://github.com/YOUR_USERNAME/06_flow-check.git

# ファイルをアップロード
git push -u origin main
```

## 方法3：GitHub Desktopを使用

1. [GitHub Desktop](https://desktop.github.com/)をインストール
2. GitHub Desktopを開く
3. 「File」→「Add Local Repository」を選択
4. `c:\AIプロジェクト\06_flow-check`を選択
5. 「Publish repository」をクリック
6. リポジトリ名を入力して「Publish Repository」をクリック

## アップロードされるファイル

以下のファイルがアップロードされます：

- `src/Code.gs` - メインのGASコード
- `appsscript.json` - GASプロジェクト設定
- `README.md` - プロジェクト説明
- `prompts/` - プロンプトファイル
- `docs/` - ドキュメント
- `.gitignore` - Git除外設定
- `.claspignore` - clasp除外設定

## 注意事項

- `.gitignore`に含まれているファイル（`.clasp.json`、`node_modules/`など）はアップロードされません
- 個人情報や機密情報が含まれていないか確認してください
- 必要に応じて`.gitignore`を編集して除外ファイルを追加してください
