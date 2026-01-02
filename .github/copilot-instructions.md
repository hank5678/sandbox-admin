# 開發規範

## 技術棧

- 使用 React + TypeScript 開發
- 使用 ANTD 作為主要 UI 元件庫
- 使用 React Query 進行資料抓取與快取管理
- 使用 Zod 進行表單資料驗證
- 使用 TanStack Router 作為路由解決方案
- 使用 Tailwind CSS 處理樣式
- 使用 Vitest 作為測試框架
- 使用 ESLint 與 Prettier 維持程式碼品質與一致性

## 命名規則

- 使用 **Camel Case**（camelCase）來命名變數
- 使用 **Pascal Case**（PascalCase）來命名 React 元件和 TypeScript 介面
- 使用 **Upper Snake Case**（UPPER_SNAKE_CASE）來命名常數
- 使用 **Kebab Case** 來命名檔案和資料夾，例如 `user-profile.tsx`、`product-list`
- 使用 **動詞+名詞** 的方式來命名函式，例如 `fetchUserData`、`updateProductList`

## 樣式撰寫

- 以 ANTD 基礎樣式為主
- 需要自行撰寫時，優先使用 **Tailwind CSS**
- 避免使用非必要的行內樣式

## 工具函式選用

- **時間格式化**：使用 `@/utils/format-time`
- **金額格式化**：使用 `@/utils/format-currency`
- **類名合併**：使用 `@/utils/class-names`

## React

- 使用 `Function Component`，偏好使用 `Arrow Function`
- 避免在 `JSX` 中直接撰寫邏輯運算，將邏輯抽離至函式或變數
- 處理非同步優先使用 `async/await` 語法

## TypeScript

- 不使用 `any` 類型
- 優先使用 `interface` 定義物件形狀
- 避免使用非必要的型別斷言（`as`）

## Git Commit 規範

- 必須遵循 Conventional Commits 格式
- 格式範例：`<type>(<scope>): <subject>`
- 類型 (type) 僅限：`feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- 說明文字請使用 **繁體中文**
- 結尾不需要句號

## 註解規範

- 使用繁體中文撰寫註解
