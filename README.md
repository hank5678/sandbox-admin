# 🚀 Sandbox Admin

**基於 React 打造的後台管理示範系統。**

本專案目的是展示構建一個可維護且具備現代 UI/UX 邏輯的後台架構。

> **專案定位：** 這是一個 Sandbox (沙盒) 示範專案。所有業務數據均為模擬，專門用於展示設計使用。

---

## 🛠️ 技術棧

| 分類         | 技術工具                          |
| :----------- | :-------------------------------- |
| **核心框架** | **React** + **Vite**              |
| **型別系統** | **TypeScript**                    |
| **後端集成** | **Supabase**                      |
| **UI 體系**  | **Ant Design** + **Tailwind CSS** |
| **路由管理** | **TanStack Router**               |
| **非同步流** | **TanStack React Query**          |
| **表單驗證** | **Zod**                           |
| **狀態管理** | **Zustand**                       |
| **單元測試** | **Vitest** + **Testing Library**  |

---

## ✨ 主要功能模組

- **儀表板**：視覺化統計圖表
- **商品列表**：CRUD 操作 / 篩選與排序 / 表格狀態管理與分頁連動。
- **訂單列表**：虛擬滾動渲染大量資料 / 篩選與排序
- **意見回饋**：即時聊天介面 / 訊息送出與接收

---

## 🚀 快速開始

### 環境需求

- **Node.js**: >= 18.0 (建議使用 LTS 版本)
- **套件管理工具**: pnpm

### 安裝與啟動

```bash
# 1. 安裝依賴
pnpm install

# 2. 啟動開發伺服器
pnpm dev
```

### 其他指令

```bash
# 建置生產版本
pnpm build

# 預覽建置結果
pnpm preview

# 執行 ESLint 檢查
pnpm lint

# 格式化程式碼
pnpm format

# 執行測試
pnpm test
```

---

## 🔑 環境變數配置

本專案已包含 `.env` 檔案，提供立即可用的示範環境配置。

```env
VITE_SITE_NAME=阿貴的後台管理系統
VITE_SITE_DESCRIPTION=此系統沒有真實功能，是展示用的範例專案

VITE_SUPABASE_URL=https://iwnwxoazjaydulhcqitw.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_-5YQD4YoDJJfMsRtrcco4g_rkopQyms

VITE_DEMO_AUTH_EMAIL=demo@example.com
VITE_DEMO_AUTH_PASSWORD=759bNmZr5MJulTjw
```

### 🔒 關於金鑰安全性

本專案將環境變數推送至版本控制的原因：

- **使用 Publishable Key**：`SUPABASE_PUBLISHABLE_KEY` 是設計給前端公開使用的金鑰，並非 Secret Key。
- **無安全風險**：所有功能純粹為技術展示，無真實業務數據或敏感資訊。
- **方便體驗**：讓查看者可以立即 clone 並啟動專案，無需額外設定。
