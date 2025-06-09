
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  userId: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  userId: string;
  month: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon: string;
  color: string;
}
