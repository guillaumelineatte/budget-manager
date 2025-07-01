import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTransactions } from '@/hooks/useTransactions';
import { format, subMonths, addMonths } from 'date-fns';
import { fr } from 'date-fns/locale';

export const TransactionList = () => {
  const { transactions, loading, deleteTransaction, currentMonth, changeMonth } = useTransactions();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' 
      ? subMonths(new Date(currentMonth), 1)
      : addMonths(new Date(currentMonth), 1);
    const newMonth = format(newDate, 'yyyy-MM');
    changeMonth(newMonth);
  };

  if (loading) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <div className="animate-pulse">Chargement des transactions...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Transactions récentes</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleMonthChange('prev')}
            className="hover:scale-105 transition-transform"
          >
            ←
          </Button>
          <span className="font-medium">
            {format(new Date(currentMonth), 'MMMM yyyy', { locale: fr })}
          </span>
          <Button
            variant="outline"
            onClick={() => handleMonthChange('next')}
            className="hover:scale-105 transition-transform"
          >
            →
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Aucune transaction pour ce mois. Ajoutez votre première transaction ci-dessus !
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium">{transaction.category}</p>
                      {transaction.description && (
                        <p className="text-sm text-muted-foreground">{transaction.description}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(transaction.date), 'dd MMM yyyy', { locale: fr })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={async () => {
                      await deleteTransaction(transaction.id, transaction.month);
                      window.location.reload();
                    }}
                    className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20"
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
