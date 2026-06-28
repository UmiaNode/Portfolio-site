const SHEET_NAME = "シート1";
const ADMIN_EMAIL = "k-kanamori@umianode.com";

function doPost(e) {
  const params = (e && e.parameter) || {};
  const submittedAt = new Date();
  const name = params.name || "";
  const email = params.email || "";
  const message = params.message || "";

  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  let autoReplyStatus = "not sent";

  if (email) {
    autoReplyStatus = sendAutoReply({ name, email, message });
  }

  if (ADMIN_EMAIL) {
    sendAdminNotification({ submittedAt, name, email, message });
  }

  sheet.appendRow([submittedAt, name, email, message, autoReplyStatus]);

  return ContentService.createTextOutput("OK");
}

function sendAutoReply({ name = "", email = "", message = "" } = {}) {
  if (!email) {
    return "failed: email is empty";
  }

  const displayName = name || "お客様";
  const subject = "UMIAへのお問い合わせを受け付けました";
  const body = `${displayName} 様

UMIAへお問い合わせいただきありがとうございます。
ご入力いただいた内容を以下の通り受け付けました。

お名前：
${displayName}

メールアドレス：
${email}

お問い合わせ内容：
${message}

内容を確認のうえ、担当者よりご連絡いたします。

------------------------------
UMIA
k-kanamori@umianode.com
`;

  try {
    GmailApp.sendEmail(email, subject, body, {
      name: "UMIA",
      replyTo: "k-kanamori@umianode.com",
    });

    return "sent";
  } catch (error) {
    return `failed: ${error.message}`;
  }
}

function sendAdminNotification({
  submittedAt = new Date(),
  name = "",
  email = "",
  message = "",
} = {}) {
  const subject = "【UMIA】お問い合わせがありました";
  const body = `Webサイトからお問い合わせがありました。

送信日時：
${submittedAt}

お名前：
${name}

メールアドレス：
${email}

お問い合わせ内容：
${message}
`;

  GmailApp.sendEmail(ADMIN_EMAIL, subject, body, {
    name: "UMIA Contact",
  });
}

function testGmailAppAuthorization() {
  GmailApp.sendEmail(
    "k-kanamori@umianode.com",
    "GmailApp authorization test",
    "GmailApp authorization test.",
    {
      name: "UMIA",
      replyTo: "k-kanamori@umianode.com",
    }
  );
}

function testAutoReply() {
  return sendAutoReply({
    name: "テスト太郎",
    email: ADMIN_EMAIL,
    message: "自動返信メールのテストです。",
  });
}

function testAdminNotification() {
  sendAdminNotification({
    submittedAt: new Date(),
    name: "テスト太郎",
    email: "test@example.com",
    message: "管理者通知のテストです。",
  });
}
