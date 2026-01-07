/**
 * PostgreSQL 錯誤碼
 * 參考: https://docs.postgrest.org/en/latest/references/errors.html
 */
export const POSTGRES_ERROR_MESSAGES: Record<string, string> = {
  // --- Group 0: 連線錯誤 ---
  PGRST000: "無法連線至伺服器，請檢查網路連線",
  PGRST001: "連線發生異常，請稍後再試",
  PGRST002: "系統初始化失敗",
  PGRST003: "伺服器繁忙導致連線逾時，請稍後再試",

  // --- Group 1: 請求參數錯誤 ---
  PGRST100: "搜尋條件格式錯誤",
  PGRST101: "此請求操作不允許",
  PGRST102: "資料傳送格式錯誤",
  PGRST103: "請求的資料範圍無效",
  PGRST105: "更新操作無效",
  PGRST106: "找不到指定的系統區域",
  PGRST107: "傳輸格式不支援",
  PGRST108: "關聯資料篩選異常",
  PGRST111: "系統標頭設定異常",
  PGRST112: "系統狀態碼設定錯誤",
  PGRST114: "操作參數設定衝突",
  PGRST115: "資料主鍵驗證不符",
  PGRST116: "找不到該筆資料",
  PGRST117: "不支援的請求方法",
  PGRST118: "無法對相關資料進行排序",
  PGRST120: "關聯篩選條件限制錯誤",
  PGRST121: "系統錯誤訊息解析失敗",
  PGRST122: "系統優先權設定無效",
  PGRST123: "統計計算功能暫未開啟",
  PGRST124: "操作影響的資料量過大",
  PGRST125: "請求路徑無效",
  PGRST126: "目前無法存取 API 根路徑",
  PGRST127: "此功能尚未開放",
  PGRST128: "操作影響的資料行數超過限制",

  // --- Group 2: 物件與關聯錯誤 ---
  PGRST200: "資料關聯已失效或不存在",
  PGRST201: "資料關聯路徑不明確",
  PGRST202: "找不到指定的系統函式",
  PGRST203: "系統函式呼叫衝突",
  PGRST204: "找不到指定的資料欄位",
  PGRST205: "找不到指定的資料表",

  // --- Group 3: 驗證錯誤 ---
  PGRST300: "系統設定缺失，請聯繫管理員",
  PGRST301: "登入憑證無效或已過期",
  PGRST302: "權限不足，請重新登入",
  PGRST303: "憑證欄位驗證失敗",

  // --- Group X: 內部錯誤 ---
  PGRSTX00: "資料庫處理發生內部錯誤",

  // --- PostgreSQL 標準錯誤代碼 ---
  "23502": "請填寫所有必填欄位",
  "23503": "資料正在使用中，無法執行此操作",
  "23505": "資料重複，請更換內容後再試",
  "42P01": "系統找不到指定的資料",
  "42883": "系統執行函式異常",
  "42501": "您沒有權限執行此動作",
  "57014": "操作時間過長，請重試",

  default: "系統發生異常，請稍後再試"
}
/**
 * Supabase Auth 錯誤碼
 * 參考: https://supabase.com/docs/guides/auth/debugging/error-codes
 */
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  // --- 登入與註冊相關 ---
  invalid_credentials: "帳號或密碼錯誤",
  user_not_found: "找不到此使用者",
  user_already_exists: "此帳號已被註冊",
  user_banned: "您的帳號已被停權",
  signup_disabled: "目前暫停開放註冊",
  email_exists: "此電子郵件已被註冊",
  phone_exists: "此手機號碼已被註冊",
  email_not_confirmed: "電子郵件尚未驗證",
  phone_not_confirmed: "手機號碼尚未驗證",
  email_address_invalid: "無效的電子郵件地址",
  weak_password: "密碼強度不足",
  same_password: "新密碼不可與舊密碼相同",

  // --- 驗證碼與憑證 (OTP / Token) ---
  otp_expired: "驗證碼已過期，請重新取得",
  otp_disabled: "目前的登入方式已被停用",
  bad_code_verifier: "驗證程序異常，請重新嘗試",
  bad_json: "資料格式錯誤",
  bad_jwt: "憑證無效",
  invite_not_found: "邀請連結無效或已過期",
  refresh_token_not_found: "連線已失效，請重新登入",
  refresh_token_already_used: "安全性異常，請重新登入",
  session_expired: "登入狀態已過期",
  session_not_found: "找不到有效的登入狀態",

  // --- 頻率限制 (Rate Limits) ---
  over_email_send_rate_limit: "郵件發送過於頻繁，請稍候再試",
  over_sms_send_rate_limit: "簡訊發送過於頻繁，請稍候再試",
  over_request_rate_limit: "請求過於頻繁，請幾分鐘後再試",

  // --- 雙重驗證 (MFA) ---
  mfa_verification_failed: "驗證碼錯誤",
  mfa_challenge_expired: "驗證已逾時，請重新嘗試",
  mfa_factor_not_found: "找不到驗證裝置",
  insufficient_aal: "請完成雙重驗證以繼續",

  // --- 第三方登入與 SSO ---
  bad_oauth_callback: "第三方登入回傳異常",
  bad_oauth_state: "第三方登入驗證失敗",
  oauth_provider_not_supported: "不支援此登入方式",
  provider_disabled: "此登入服務目前已停用",
  saml_idp_not_found: "找不到企業登入服務商",
  sso_provider_not_found: "找不到單一登入服務",

  // --- 系統權限與其他 ---
  not_admin: "權限不足，拒絕存取",
  captcha_failed: "安全驗證（Captcha）失敗",
  reauthentication_needed: "為了安全起見，請重新驗證身份",
  reauthentication_not_valid: "身份驗證失敗",
  conflict: "連線衝突，請重新嘗試",
  request_timeout: "伺服器請求逾時",
  validation_failed: "輸入內容格式不正確",
  unexpected_failure: "系統發生未知錯誤",

  default: "登入系統發生異常，請稍後再試"
}

/**
 * Zod 驗證錯誤的通用訊息
 */
export const ZOD_ERROR_MESSAGE = "表單資料驗證失敗，請檢查輸入內容"

/**
 * 標準錯誤訊息
 */
export const STANDARD_ERROR_MESSAGES: Record<string, string> = {
  NetworkError: "網路連線失敗",
  TimeoutError: "請求逾時",
  TypeError: "資料類型錯誤",
  ReferenceError: "內部錯誤"
}
