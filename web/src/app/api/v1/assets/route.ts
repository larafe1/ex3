import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

import { EX3_STORAGE_KEYS } from '@/common/constants';
import api, { type ApiError, type ApiErrorData } from '@/lib/axios';

import type { GetAssetRequestParams, GetAssetResponseData } from './types';

export const GET = async (
  _: NextRequest,
  { params }: Record<'params', GetAssetRequestParams>
) => {
  try {
    const authToken = cookies().get(EX3_STORAGE_KEYS.Token);
    if (!authToken?.value) throw new Error('Missing access token');

    const headers = {
      Authorization: `Bearer ${authToken.value}`
    };

    const { data, status, statusText } =
      await api.server.get<GetAssetResponseData>('/v1/assets', {
        headers,
        params
      });

    return NextResponse.json<GetAssetResponseData>(data, {
      status,
      statusText
    });
  } catch (e) {
    const { message } = e as Error;
    const { status, statusText, ...error }: ApiError = JSON.parse(message);

    return NextResponse.json<ApiErrorData>(error, { status, statusText });
  }
};