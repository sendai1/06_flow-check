# 仙台第一事務所 業務フロー整理 Googleフォーム

このプロジェクトは、仙台第一事務所の業務フローを整理するためのGoogleフォームを自動生成するGoogle Apps Script（GAS）プロジェクトです。

## プロジェクト構成

- `src/Code.gs` - GASソースコード（メインスクリプト）
- `prompts/` - AIプロンプトファイル
- `docs/` - ドキュメント
- `appsscript.json` - GASプロジェクト設定ファイル
- `.claspignore` - claspでアップロードしないファイルの設定
- `.gitignore` - Gitで管理しないファイルの設定

## 機能

- 業務マニュアル登録用のGoogleフォームを自動生成
- 17セクション構成（業務概要、事前準備、手順詳細×10、例外対応、関連情報、全体振り返り、最終ページ）
- フォーム送信時に自動でスプレッドシートに回答を保存
- 条件分岐機能（ステップ完了時に最終ページへ移動）

## セットアップ

### 1. claspのインストール（推奨）

Google Apps Scriptをローカルで開発・管理するために、claspを使用します。

```bash
npm install -g @google/clasp
```

### 2. Google Apps Script APIの有効化

1. [Google Apps Script API](https://script.google.com/home/usersettings) にアクセス
2. 「Google Apps Script API」を有効化

### 3. claspでログイン

```bash
clasp login
```

### 4. プロジェクトの作成

```bash
clasp create --type standalone --title "仙台第一事務所 業務フロー整理"
```

または、既存のプロジェクトに接続する場合：

```bash
clasp clone <SCRIPT_ID>
```

## 開発フロー

1. ローカルでコードを編集
2. `clasp push` でGoogle Apps Scriptにアップロード
3. Google Apps Scriptエディタで実行・テスト

## GitHubへのアップロード

このプロジェクトをGitHubにアップロードする方法は、`GITHUB_UPLOAD.md`を参照してください。

### クイックスタート

1. PowerShellでプロジェクトディレクトリに移動
2. `.\upload-to-github.ps1`を実行
3. GitHubでリポジトリを作成
4. 表示されたコマンドを実行してアップロード

詳細は`GITHUB_UPLOAD.md`を参照してください。

## 参考資料

- [clasp公式ドキュメント](https://github.com/google/clasp)
- [Google Apps Script公式ドキュメント](https://developers.google.com/apps-script)
