
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardsProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

export const StatsCards = ({ balance, totalIncome, totalExpenses }: StatsCardsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white transform hover:scale-105 transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatCurrency(balance)}</div>
          <p className="text-xs opacity-80 mt-1">
            {balance >= 0 ? 'Looking good!' : 'Consider reducing expenses'}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-500 to-cyan-600 text-white transform hover:scale-105 transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatCurrency(totalIncome)}</div>
          <p className="text-xs opacity-80 mt-1">This month</p>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-500 to-pink-600 text-white transform hover:scale-105 transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatCurrency(totalExpenses)}</div>
          <p className="text-xs opacity-80 mt-1">This month</p>
        </CardContent>
      </Card>
    </div>
  );
};
