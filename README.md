# ゆめみ フロントエンド コーディングテスト　

![vercel](https://vercelbadge.vercel.app/api/kaitakabe0301/yumemi-frontend)
[![codecov](https://codecov.io/gh/KaiTakabe0301/yumemi-frontend/graph/badge.svg?token=hRMitW3LlV)](https://codecov.io/gh/KaiTakabe0301/yumemi-frontend)

## 1. 成果物

- アプリ (https://yumemi-frontend-rho.vercel.app/)
- Storybook (https://yumemi-frontend-storybook.vercel.app/)

## 2. 技術スタック

- Node.js 20.17.0
- Typescript
- Vite
- React
- React Router
- TanStack Query
- tailwindcss
- Recharts
- Lucide
- MSW
- Vitest
- Storybook

## 3. 開発方法

### 3-1. RESAS APIキーの設定

`.env.example`に従って、`.env`を作成し、APIキーを登録して下さい。

### 3-2.ローカルサーバの起動方法

本アプリは、RESASのAPIをコールするためのプロキシサーバとして、Vercel Functions を利用しています。<br>
そのため、ローカル環境ではVercel CLIを使用して、以下のコマンドでアプリを立ち上げて下さい。

```bash
vercel dev
```

### 3-3. Unit Testの方法

Unit Testには、Vitestを採用しています。<br>
テストを実行するには、以下のコマンドを実行して下さい。

```bash
npm test
```

### 3-4. Storybookについて

Storybookをlocalで立ち上げるには、以下のコマンドを実行して下さい。

```bash
npm run storybook
```

正常に立ち上がったあとは、`http://localhost:6006`にアクセスすることで、各コンポーネントが確認できます。

### 3-5. Integration Testについて

Integration Testには、Storybookのcomponent testを採用しています。<br>
storybookが立ち上がっている状況で、以下のコマンドを実行することで、テストが実行できます。

```bash
npm run test-storybok
```

## 4. ディレクトリ設計について

| ディレクトリ | テスト戦略                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| components/  | Layoutや基礎的なコンポーネントを格納する。                                                           |
| features/    | ドメインに基づいたコンポーネントを格納する。<br>基本的にContainer/Presentationalパターンで記載する。 |
| mocks/       | MSWでmockしたいAPIに対するhandlerを格納する。                                                        |
| utils/       | featuresに依存しない便利関数を格納します。                                                           |

## 5. テスト戦略について

ディレクトリごとに、大まかなテスト戦略が決まっています。
詳細は以下の通りです。

| ディレクトリ | テスト戦略                                                                           |
| ------------ | ------------------------------------------------------------------------------------ |
| components/  | 基本的にUnit Testで担保する。機能でないコンポーネントに対してはテストは記載しない。  |
| features/    | Integration Testで担保するので、基本的にカスタムフックに対してはテストは記載しない。 |
| mocks/       | handlersが意図した値を返却しているか確認するテストを記載する。                       |
| utils/       | 基本的に全ての関数に対して、Unit Testを記載する。                                    |

## 6. Lefthookについて

本プロジェクトでは、Lefthookを導入しています。<br>
commit-msg/pre-commit/pre-pushのタイミングで、主に以下の内容を確認しています。

- フォーマットが違反していないか
- commitのメッセージがconventional-commitに準拠しているか
- テストが通るか

詳細は`lefthook.yml`を確認して下さい。

## 7. mockについて

mockには、MSWを利用しています。

### 7-1. handlersのディレクトリ構成について

MSWのhandlersは、`src/mocks/handlers/api/resas/**/`に定義しています。<br>
`**/`のディレクトリ構成は、RESASのAPIのパスと同じ構成になっています。

### 7-2. mockの有効化について

storybook、vitestでは、全てのmockが有効化されます。<br>

localでは、`.env`で指定したhandlerのみが有効化できるようになっています。<br>
以下のように、`VITE_ENABLE_MSW_ENDPOINT`に設定したkeyと対になるhandlerが有効化されます。<br>
複数のmockを有効化したい場合は、半角スペース区切りでkeyを記載して下さい。
keyは、`src/mocks/handlers/index.ts`に定義されている`handlerObjects`を参照して下さい。<br>

```env
VITE_ENABLE_MSW_ENDPOINT="/api/resas/prefectures /api/resas/population/composition/perYear"
```
