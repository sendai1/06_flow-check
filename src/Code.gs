/**
 * 仙台第一事務所 業務フロー整理 Googleフォーム生成スクリプト
 * 
 * 業務マニュアルを登録するためのGoogleフォームを自動生成します。
 * フォーム送信時、回答は新規作成したGoogleスプレッドシートに保存されます。
 * 
 * 【使用方法】
 * 方法1（推奨）：フォームに紐づくGASとして使用
 * 1. Googleフォームを新規作成（空のフォームでOK）
 * 2. フォームの「⋮」→「スクリプトエディタ」を開く
 * 3. このコードを貼り付ける
 * 4. setupManualForm() を実行（フォームIDは自動取得されます）
 * 5. 条件分岐の設定（必須）：
 *    - フォームの編集画面で各ステップ（ステップ2以降）の「このステップの完了状況」ラジオボタンを選択
 *    - 右側の「⋮」→「回答に応じてセクションに移動」を選択
 *    - 「全て完了」を選択した場合、「最終ページ」（セクション14）に移動するよう設定
 *    - 「次のステップへ進む」を選択した場合、「次のセクションに進む」を選択
 *    - これにより、「全て完了」を選択したら最終ページに移動します
 * 
 * 方法2：既存フォームを編集
 * 1. フォームの「⋮」→「スクリプトエディタ」を開く
 * 2. このコードを貼り付ける
 * 3. setupManualForm() を実行
 */

/**
 * メイン関数：現在のフォームに紐づいてフォームを設定
 * フォームのスクリプトエディタから実行してください
 */
function setupManualForm() {
  try {
    // 現在のフォームを取得（フォームに紐づくスクリプトから実行される場合）
    const form = FormApp.getActiveForm();
    
    if (!form) {
      throw new Error('フォームが見つかりません。フォームのスクリプトエディタから実行してください。');
    }
    
    // 既存の項目をクリア（オプション：既存項目を残したい場合はこの行を削除）
    const items = form.getItems();
    items.forEach(item => form.deleteItem(item));
    
    // スプレッドシートを作成してフォームに接続
    const spreadsheet = SpreadsheetApp.create('マニュアル登録_回答');
    form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
    
    // フォームの説明を設定
    form.setDescription('業務マニュアルを登録するためのフォームです。各項目を入力してください。');
    
    // セクション1：業務概要
    createBusinessOverviewSection(form);
    
    // セクション2：事前準備
    createPreparationSection(form);
    
    // セクション3-1〜3-10：手順詳細（ステップ1〜10）
    const stepSections = [];
    for (let i = 1; i <= 10; i++) {
      stepSections.push(createStepDetailSection(form, i));
    }
    
    // セクション4：例外・イレギュラー対応
    createExceptionSection(form);
    
    // セクション5：関連情報
    createRelatedInfoSection(form);
    
    // セクション6：全体振り返り
    createReflectionSection(form);
    
    // セクション7：確認・承認（送信セクション）
    const approvalSection = createApprovalSection(form);
    
    // 条件分岐を設定：ステップ2以降で「このステップで全ての作業が完了」がチェックされたら送信セクションへ
    setupConditionalNavigation(form, stepSections, approvalSection);
    
    Logger.log('フォーム設定が完了しました。フォームURL: ' + form.getPublishedUrl());
    Logger.log('スプレッドシートURL: ' + spreadsheet.getUrl());
    
    return {
      formUrl: form.getPublishedUrl(),
      spreadsheetUrl: spreadsheet.getUrl(),
      formId: form.getId(),
      spreadsheetId: spreadsheet.getId()
    };
    
  } catch (error) {
    Logger.log('エラーが発生しました: ' + error.toString());
    throw error;
  }
}

/**
 * スタンドアロン版：新規フォームを作成（従来の方法）
 * script.google.comから実行する場合に使用
 */
function createManualForm() {
  try {
    // フォームを作成
    const form = FormApp.create('業務マニュアル登録フォーム');
    
    // スプレッドシートを作成してフォームに接続
    const spreadsheet = SpreadsheetApp.create('マニュアル登録_回答');
    form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
    
    // フォームの説明を設定
    form.setDescription('業務マニュアルを登録するためのフォームです。各項目を入力してください。');
    
    // セクション1：業務概要
    createBusinessOverviewSection(form);
    
    // セクション2：事前準備
    createPreparationSection(form);
    
    // セクション3-1〜3-10：手順詳細（ステップ1〜10）
    const stepSections = [];
    for (let i = 1; i <= 10; i++) {
      stepSections.push(createStepDetailSection(form, i));
    }
    
    // セクション4：例外・イレギュラー対応
    createExceptionSection(form);
    
    // セクション5：関連情報
    createRelatedInfoSection(form);
    
    // セクション6：全体振り返り
    createReflectionSection(form);
    
    // セクション7：確認・承認（送信セクション）
    const approvalSection = createApprovalSection(form);
    
    // 条件分岐を設定：ステップ2以降で「このステップで全ての作業が完了」がチェックされたら送信セクションへ
    setupConditionalNavigation(form, stepSections, approvalSection);
    
    Logger.log('フォーム作成が完了しました。フォームURL: ' + form.getPublishedUrl());
    Logger.log('スプレッドシートURL: ' + spreadsheet.getUrl());
    
    return {
      formUrl: form.getPublishedUrl(),
      spreadsheetUrl: spreadsheet.getUrl(),
      formId: form.getId(),
      spreadsheetId: spreadsheet.getId()
    };
    
  } catch (error) {
    Logger.log('エラーが発生しました: ' + error.toString());
    throw error;
  }
}

/**
 * セクション1：業務概要
 */
function createBusinessOverviewSection(form) {
  const section = form.addPageBreakItem();
  section.setTitle('業務概要');
  
  // 業務内容
  const businessCategory = form.addListItem();
  businessCategory.setTitle('業務内容')
    .setRequired(true)
    .setChoiceValues([
      'VISA 特定技能 認定',
      'VISA 特定技能 変更',
      'VISA 特定技能 更新',
      'VISA 特定技能 定期届出',
      'VISA 特定技能 各種変更届出',
      'VISA 特定技能 特定活動経由',
      'VISA 技人国 認定',
      'VISA 技人国 変更',
      'VISA 技人国 更新',
      '社保 取得',
      '社保 喪失',
      '社保 産休給付金',
      '雇保 取得',
      '雇保 喪失、離職票',
      '雇保 育休給付金',
      '労災5号',
      '労災6号',
      '労災8号',
      '傷病手当',
      'ネット顧問登録',
      'マイナンバー登録',
      'ダイレクトHR登録',
      '給与計算（ネット顧問経由）',
      '給与計算（Excel経由）',
      '法人設立',
      '法人変更',
      '建設業 決算変更届'
    ]);
  
  // この業務の目的・ゴール
  const purpose = form.addParagraphTextItem();
  purpose.setTitle('この業務の目的・ゴール')
    .setRequired(true);
  
  // 想定所要時間（全体）
  const totalTime = form.addListItem();
  totalTime.setTitle('想定所要時間（全体）')
    .setChoiceValues(['15分以内', '30分以内', '1時間以内', '半日', '1日以上']);
  
  // 失敗時の訂正、追加のレベル
  const correctionLevel = form.addListItem();
  correctionLevel.setTitle('失敗時の訂正、追加のレベル')
    .setChoiceValues([
      '顧客に大きな影響なく訂正が可能',
      '訂正可能だが顧客に迷惑がかかる',
      '訂正不可（大きな責任が発生する）'
    ]);
}

/**
 * セクション2：事前準備
 */
function createPreparationSection(form) {
  const section = form.addPageBreakItem();
  section.setTitle('事前準備');
  
  // 必要な書類・データ
  const documents = form.addParagraphTextItem();
  documents.setTitle('必要な書類・データ');
  
  // 先回りするための段取り
  const step1 = form.addTextItem();
  step1.setTitle('先回りするための段取り①');
  
  const step2 = form.addTextItem();
  step2.setTitle('先回りするための段取り②');
  
  const step3 = form.addTextItem();
  step3.setTitle('先回りするための段取り③');
  
  const step4 = form.addTextItem();
  step4.setTitle('先回りするための段取り④');
  
  const step5 = form.addTextItem();
  step5.setTitle('先回りするための段取り⑤');
  
  // 使用するツール
  const tools = form.addCheckboxItem();
  tools.setTitle('使用するツール')
    .setChoiceValues([
      '社労夢',
      'ネットde顧問',
      'マイナボックス',
      'dekisugi',
      '入管オンラインシステム',
      'その他'
    ]);
  
  // その他のツール（自由記入）
  const otherTools = form.addTextItem();
  otherTools.setTitle('その他のツール（「その他」を選択した場合に記入）')
    .setHelpText('「使用するツール」で「その他」を選択した場合に記入してください');
  
  // 事前確認事項
  const preChecks = form.addParagraphTextItem();
  preChecks.setTitle('事前確認事項');
  
  // この手続きについて確認できる行政官庁
  const governmentOffice = form.addTextItem();
  governmentOffice.setTitle('この手続きについて確認できる行政官庁');
}

/**
 * 条件分岐を設定：ステップで「全て完了」が選択されたら最終ページ（セクション14）へ
 * 注意：Google Apps ScriptのAPIでは、条件分岐を直接設定することはできません
 * フォームの編集画面で手動設定が必要です
 */
function setupConditionalNavigation(form, stepSections, approvalSection) {
  try {
    // ステップ2以降のセクションを処理
    for (let i = 1; i < stepSections.length; i++) {
      const stepData = stepSections[i];
      if (stepData && stepData.completeRadio && stepData.section) {
        // ラジオボタン項目に条件分岐を設定
        // 注意：Google Apps ScriptのAPIでは、条件分岐を直接設定することはできません
        // そのため、フォームの編集画面で手動設定が必要です
        // 設定方法：
        // 1. 「このステップの完了状況」ラジオボタンを選択
        // 2. 右側の「⋮」→「回答に応じてセクションに移動」を選択
        // 3. 「全て完了」を選択した場合、「最終ページ」（セクション14）に移動するよう設定
        // 4. 「次のステップへ進む」を選択した場合、「次のセクションに進む」を選択
        Logger.log('ステップ' + (i + 1) + 'の条件分岐設定が必要です。フォームの編集画面で手動設定してください。');
      }
    }
  } catch (error) {
    Logger.log('条件分岐の設定中にエラーが発生しました: ' + error.toString());
  }
}

/**
 * セクション3：手順詳細（ステップ1〜10）
 * @return {Object} セクション情報（条件分岐設定用）
 */
function createStepDetailSection(form, stepNumber) {
  const section = form.addPageBreakItem();
  section.setTitle('手順詳細：ステップ' + stepNumber);
  
  // 作業内容
  const workContent = form.addParagraphTextItem();
  if (stepNumber === 1) {
    workContent.setTitle('作業内容')
      .setRequired(true)
      .setHelpText('ステップ１は、業務に入る際にどのような形でスタートするかを丁寧に記載する');
  } else {
    workContent.setTitle('作業内容')
      .setHelpText('どのツールを使い、どのような方法で、どのページで、何を入力・処理するかを丁寧に記載する');
  }
  
  // 所要時間
  const timeRequired = form.addListItem();
  timeRequired.setTitle('所要時間')
    .setChoiceValues(['5分以内', '15分以内', '30分以内', '1時間以内', 'それ以上']);
  
  // このステップのゴール（旧：成果物）
  const deliverable = form.addTextItem();
  deliverable.setTitle('このステップのゴール');
  
  // ゴール到達と判断できる判定ポイント（どこを見るか？）
  const judgment = form.addParagraphTextItem();
  judgment.setTitle('ゴール到達と判断できる判定ポイント（どこを見るか？）');
  
  // ケースによって変わる作業（旧：分岐パターン）
  const branching = form.addParagraphTextItem();
  branching.setTitle('ケースによって変わる作業');
  
  // 使用ツール（統一されたツールリスト）
  const tools = form.addCheckboxItem();
  tools.setTitle('使用ツール')
    .setChoiceValues([
      '社労夢',
      'ネットde顧問',
      'マイナボックス',
      'dekisugi',
      '入管オンラインシステム',
      'その他'
    ]);
  
  // その他のツール（自由記入）
  const otherTools = form.addTextItem();
  otherTools.setTitle('その他のツール（「その他」を選択した場合に記入）')
    .setHelpText('「使用ツール」で「その他」を選択した場合に記入してください');
  
  const template = form.addTextItem();
  template.setTitle('使用テンプレート・書式');
  
  const reference = form.addTextItem();
  reference.setTitle('参照情報');
  
  // 画像添付（3枚）
  // 注意：Google Apps Script APIではファイルアップロード項目を直接追加できません
  // フォームの編集画面で手動でファイルアップロード項目を追加するか、Googleドライブの共有リンクを使用してください
  const image1 = form.addTextItem();
  image1.setTitle('画像①（Googleドライブの共有リンク）')
    .setHelpText('このステップに関連する画像をGoogleドライブにアップロードし、共有リンクを貼り付けてください。画像を右クリック→「共有」→「リンクを取得」でURLをコピーできます。');
  
  const image2 = form.addTextItem();
  image2.setTitle('画像②（Googleドライブの共有リンク）')
    .setHelpText('このステップに関連する画像をGoogleドライブにアップロードし、共有リンクを貼り付けてください。');
  
  const image3 = form.addTextItem();
  image3.setTitle('画像③（Googleドライブの共有リンク）')
    .setHelpText('このステップに関連する画像をGoogleドライブにアップロードし、共有リンクを貼り付けてください。');
  
  // 注意点・ナレッジ
  const notes = form.addParagraphTextItem();
  notes.setTitle('この工程の注意点');
  
  const failures = form.addParagraphTextItem();
  failures.setTitle('過去の失敗事例');
  
  const tips = form.addParagraphTextItem();
  tips.setTitle('防止策・コツ');
  
  // DX化・改善ヒント
  const isTroublesome = form.addListItem();
  isTroublesome.setTitle('この工程は面倒か？')
    .setChoiceValues(['とても面倒', 'やや面倒', '普通', '簡単']);
  
  const whatIsTroublesome = form.addParagraphTextItem();
  whatIsTroublesome.setTitle('何が面倒か？');
  
  const improvement = form.addParagraphTextItem();
  improvement.setTitle('どうなると楽になるか？');
  
  const aiFeasibility = form.addListItem();
  aiFeasibility.setTitle('AI・自動化で代替できそうか？')
    .setChoiceValues(['できそう', '一部できそう', '難しい', 'わからない']);
  
  const automationIdea = form.addParagraphTextItem();
  automationIdea.setTitle('自動化のアイデア');
  
  // ステップ2以降に「全て完了」または「次のステップへ進む」のラジオボタンを追加
  let completeRadio = null;
  if (stepNumber >= 2) {
    completeRadio = form.addMultipleChoiceItem();
    completeRadio.setTitle('このステップの完了状況')
      .setChoiceValues(['全て完了', '次のステップへ進む']);
  }
  
  // セクション情報を返す（条件分岐設定用）
  return {
    section: section,
    completeRadio: completeRadio,
    stepNumber: stepNumber
  };
}

/**
 * セクション4：例外・イレギュラー対応
 */
function createExceptionSection(form) {
  const section = form.addPageBreakItem();
  section.setTitle('例外・イレギュラー対応');
  
  // 例外パターン1
  const exception1 = form.addParagraphTextItem();
  exception1.setTitle('例外パターン1');
  
  const response1 = form.addParagraphTextItem();
  response1.setTitle('例外時の対応1');
  
  // 例外パターン2
  const exception2 = form.addParagraphTextItem();
  exception2.setTitle('例外パターン2');
  
  const response2 = form.addParagraphTextItem();
  response2.setTitle('例外時の対応2');
  
  // 例外パターン3
  const exception3 = form.addParagraphTextItem();
  exception3.setTitle('例外パターン3');
  
  const response3 = form.addParagraphTextItem();
  response3.setTitle('例外時の対応3');
  
  // イレギュラー時に自己判断をしても良いケース
  const escalationCondition = form.addParagraphTextItem();
  escalationCondition.setTitle('イレギュラー時に自己判断をしても良いケース');
  
  // イレギュラー時の確認先
  const escalationTarget = form.addCheckboxItem();
  escalationTarget.setTitle('イレギュラー時の確認先')
    .setChoiceValues([
      '2か所以上の行政機関に確認',
      '代表に確認',
      '同僚に確認',
      'その他（下記詳細を記入する）'
    ]);
  
  // イレギュラー時の確認先（その他）の詳細
  const escalationTargetOther = form.addTextItem();
  escalationTargetOther.setTitle('イレギュラー時の確認先（その他）の詳細')
    .setHelpText('「イレギュラー時の確認先」で「その他（下記詳細を記入する）」を選択した場合に記入してください');
}

/**
 * セクション5：関連情報
 */
function createRelatedInfoSection(form) {
  const section = form.addPageBreakItem();
  section.setTitle('関連情報');
  
  // 関連マニュアル
  const relatedManual = form.addTextItem();
  relatedManual.setTitle('関連マニュアル');
  
  // 前工程のマニュアル
  const previousManual = form.addTextItem();
  previousManual.setTitle('前工程のマニュアル');
  
  // 後工程のマニュアル
  const nextManual = form.addTextItem();
  nextManual.setTitle('後工程のマニュアル');
  
  // 使用テンプレート一覧
  const templates = form.addParagraphTextItem();
  templates.setTitle('使用テンプレート一覧');
  
  // 参照法令・通達
  const laws = form.addParagraphTextItem();
  laws.setTitle('参照法令・通達');
  
  // 参考URL
  const referenceUrl = form.addTextItem();
  referenceUrl.setTitle('参考URL');
}

/**
 * セクション6：全体振り返り
 */
function createReflectionSection(form) {
  const section = form.addPageBreakItem();
  section.setTitle('全体振り返り');
  
  // この業務全体で一番面倒な工程
  const mostTroublesome = form.addTextItem();
  mostTroublesome.setTitle('この業務全体で一番面倒な工程');
  
  // この業務で最も失敗しやすい点
  const failurePoint = form.addParagraphTextItem();
  failurePoint.setTitle('この業務で最も失敗しやすい点');
  
  // 業務全体の改善アイデア
  const improvementIdea = form.addParagraphTextItem();
  improvementIdea.setTitle('業務全体の改善アイデア');
  
  // この業務の習得に必要な期間
  const learningPeriod = form.addListItem();
  learningPeriod.setTitle('この業務の習得に必要な期間')
    .setChoiceValues(['即日', '1週間', '1ヶ月', '3ヶ月以上']);
  
  // 新人に教える時のポイント
  const teachingPoint = form.addParagraphTextItem();
  teachingPoint.setTitle('新人に教える時のポイント');
}

/**
 * セクション7：最終ページ
 * @return {PageBreakItem} セクション情報（条件分岐設定用）
 */
function createApprovalSection(form) {
  const section = form.addPageBreakItem();
  section.setTitle('最終ページ');
  
  // フォーム入力者
  const reviewer = form.addListItem();
  reviewer.setTitle('フォーム入力者')
    .setChoiceValues(['許', '劉', '任', '鄭', '金', '黄', '李', '横山']);
  
  // 入力日
  const reviewDate = form.addDateItem();
  reviewDate.setTitle('入力日')
    .setIncludesYear(true);
  
  // コメント
  const reviewComment = form.addParagraphTextItem();
  reviewComment.setTitle('コメント');
  
  return section;
}
