import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { EX3_STORAGE_KEYS } from '@/common/constants';
import api, { type ApiError, type ApiErrorData } from '@/lib/axios';

import { type GetTransactionCountResponseData } from '../../types';

export const GET = async (req: NextRequest) => {
  try {
    const assetSymbol = req.nextUrl.pathname.split('/').at(-2);
    if (!assetSymbol) throw new Error('Missing asset symbol');

    const authToken = cookies().get(EX3_STORAGE_KEYS.Token);
    if (!authToken?.value) throw new Error('Missing access token');

    const headers = {
      Authorization: `Bearer ${authToken.value}`
    };

    const { data, status, statusText } =
      await api.server.get<GetTransactionCountResponseData>(
        `/v1/transaction/${assetSymbol}/count`,
        { headers }
      );

    return NextResponse.json<GetTransactionCountResponseData>(data, {
      status,
      statusText
    });
  } catch (e) {
    const { message } = e as Error;
    const { status, statusText, ...error }: ApiError = JSON.parse(message);

    return NextResponse.json<ApiErrorData>(error, { status, statusText });
  }
};