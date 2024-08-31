# React + TypeScript + Vite

## Lefthookについて
本プロジェクトでは、Lefthookを導入しています。
commit-msg/pre-commit/pre-pushのタイミングで、主に以下の内容を確認しています。
- フォーマットが違反していないか
- commitのメッセージがconventional-commitに準拠しているか
- テストが通るか

詳細は`lefthook.yml`を確認して下さい。

## mockについて

mockには、MSWを利用している。

### handlersのディレクトリ構成について

MSWのhandlersは、`src/mocks/handlers/api/resas/**/`に定義されている。<br>
`**/`のディレクトリ構成は、RESASのAPIのパスと同じ構成となっている。

### mockの有効化について

storybook、vitestでは、全てのmockが有効化される。<br>

localでは、`.env`で指定したhandlerのみが有効化できるようになっている。<br>
以下のように、`VITE_ENABLE_MSW_ENDPOINT`に設定したkeyに対応するhandlerが有効化される。<br>
keyは、`src/mocks/handlers/index.ts`に定義されている`handlerObjects`を参照すること。<br>

```env
VITE_ENABLE_MSW_ENDPOINT="/api/resas/prefectures /api/resas/population/composition/perYear"
```
