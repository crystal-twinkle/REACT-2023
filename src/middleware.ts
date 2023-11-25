import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const page = url.searchParams.get('page');
  const limit = request.nextUrl.searchParams.get('limit');

  const isHaveDefaultQuery = !page || !limit;

  if (isHaveDefaultQuery) {
    if (!page) url.searchParams.set('page', '1');
    if (!limit) url.searchParams.set('limit', '20');
    return NextResponse.redirect(url);
  }
}
