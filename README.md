# Admin Panel

簡介：React + Vite + TypeScript 建置的後台管理介面，採用 Ant Design 元件與 Tailwind 4 樣式，並以 TanStack Router/React Query 管理路由與資料流。內建儀表板、訂單管理（含客服回饋訊息）、商品列表等模組，供開發與示範之用。

## 特色

- React 19 + Vite 7 + TypeScript，開發與建置快速
- Ant Design 6 + Tailwind 4：介面元件與實用的原子化樣式
- TanStack Router / React Query：型別安全的路由與資料快取管理
- 狀態管理採用 Zustand；日期時間採用 dayjs
- 已包含儀表板、訂單管理（含客服/使用者訊息流）、商品清單等頁面骨架

## 開發環境

- Node.js >= 18（建議 18/20 LTS）
- 套件管理：pnpm

## 快速開始

1. 安裝依賴

```
pnpm install
```

2. 啟動開發伺服器

```
pnpm dev
```

3. 其他常用腳本

```
pnpm build     # 生產建置
pnpm preview   # 本地預覽已建置產物
pnpm lint      # ESLint 檢查
pnpm format    # Prettier 排版
```

## 專案結構（節選）

```
src/
	routes/
		__root.tsx
		_authenticated/
			_layout.tsx
			_layout/dashboard/...
			_layout/order-management/
				feedback/            # 客服訊息/回饋頁面
				order-list/...
				...
			_layout/setting.tsx
		product-list/...
	components/
	utils/
```

## 說明

- 時間格式化以 `dayjs` 實作，預設顯示中文環境。
- 樣式主要使用 Ant Design + Tailwind，少量客製化 classNames。
- 路由與資料請求以 TanStack Router / React Query 組織，可依需求擴充。
