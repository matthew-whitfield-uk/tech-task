export interface PaymentTransactionOptions {
  createdAtStart?: string;
  createdAtEnd?: string;
  page?: number;
  size?: number;
  status?: 'CAPTURED' | 'COMPLETED' | 'CREATED' | 'FAILED' | 'SETTLED';
}

export interface PaginatedDto {
  currentPage: number;
  hasNext: boolean;
  items: PaymentTransactionDto[];
  numberOfPages: number;
  pageSize: number;
  totalNumberOfItems: number;
}

export interface PaymentTransactionDto {
  amount: number;
  createdAt: string;
  currency: string;
  description: string;
  id: string;
  status: 'CAPTURED' | 'COMPLETED' | 'CREATED' | 'FAILED' | 'SETTLED';
}
