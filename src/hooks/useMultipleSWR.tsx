import useSWR, { SWRConfiguration } from 'swr';

const multipleFetcher = async (urls: string[]) => {
  const responses = await Promise.all(urls.map((url) => fetch(url)));

  const filteredErrors = (res: Response, index: number) => {
    if (!res.ok) {
      return { url: urls[index], status: res.status, statusText: res.statusText };
    }
    return false;
  };

  const errors = responses.filter(filteredErrors);

  if (errors.length > 0) {
    const errorMessages = errors
      .map(
        (err) => `Error fetching ${err.url}: { status: ${err.status}, message: ${err.statusText}}`,
      )
      .join('\n');
    throw new Error(errorMessages);
  }

  return Promise.all(responses.map((res) => res.json()));
};

/**
 * SWRを利用して複数のURLからデータを取得する
 *
 * エラーが発生した場合は、以下の形式でエラーメッセージを返す。
 * ```
 * Error fetching ${url}: { status: ${status}, message: ${statusText}}
 * ```
 *
 * エラーが複数発生した場合は、エラーメッセージを改行で連結する。
 *
 * @param urls URLの配列
 * @returns SWRのデータ
 */
export function useMultipleSWR([...urls]: string[], options?: SWRConfiguration) {
  return useSWR(urls, multipleFetcher, options);
}
