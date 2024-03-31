import { api } from '@/lib/axios';
import type { WithId } from '@/types';

export type TransactionType = 'BUY' | 'SELL';

export type TransactionProperties = {
  type: TransactionType;
  amount: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  assetId: string;
};

export interface Transaction extends WithId, TransactionProperties {}

type GetTransactionsResponse = Record<'transactions', Array<Transaction>>;

export const getTransactions = async (assetId: string) =>
  await api.get<GetTransactionsResponse>(`/v1/transactions/${assetId}`);