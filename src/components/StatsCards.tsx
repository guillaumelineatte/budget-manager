import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface StatsCardsProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  currentMonth: string;
}

export const StatsCards = ({ balance, totalIncome, totalExpenses, currentMonth }: StatsCardsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white transform hover:scale-105 transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Solde total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatCurrency(balance)}</div>
          <p className="text-xs opacity-80 mt-1">
            {balance >= 0 ? 'Tout va bien !' : 'Envisagez de réduire vos dépenses'}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-500 to-cyan-600 text-white transform hover:scale-105 transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Revenus totaux</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatCurrency(totalIncome)}</div>
          <p className="text-xs opacity-80 mt-1">
            {format(new Date(currentMonth), 'MMMM yyyy', { locale: fr })}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-500 to-pink-600 text-white transform hover:scale-105 transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Dépenses totales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatCurrency(totalExpenses)}</div>
          <p className="text-xs opacity-80 mt-1">
            {format(new Date(currentMonth), 'MMMM yyyy', { locale: fr })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
