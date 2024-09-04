import { http, HttpResponse } from 'msw';

export const testHandlers = [
  // fetcher の挙動を確認するためのハンドラ
  http.get('*/api/test', ({ request }) => {
    const url = new URL(request.url);
    const error = url.searchParams.get('error');

    if (error) {
      return new HttpResponse(null, {
        status: 500,
      });
    }

    return HttpResponse.json({
      message: 'Hello, world!',
    });
  }),
];
