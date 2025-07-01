import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { BudgetChart } from './BudgetChart';
import { StatsCards } from './StatsCards';
import { IncomeManager } from './IncomeManager';
import { useAuth } from '@/hooks/useAuth';
import { useTransactions } from '@/hooks/useTransactions';
import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const { transactions } = useTransactions();
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [currentMonth] = useState(format(new Date(), 'yyyy-MM'));

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Budget Manager
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" onClick={logout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <StatsCards 
          balance={balance} 
          totalIncome={totalIncome} 
          totalExpenses={totalExpenses}
          currentMonth={currentMonth}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <IncomeManager />
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">Actions rapides</CardTitle>
                <Button 
                  onClick={() => setShowTransactionForm(!showTransactionForm)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:scale-105"
                >
                  {showTransactionForm ? 'Masquer le formulaire' : 'Ajouter une transaction'}
                </Button>
              </CardHeader>
              {showTransactionForm && (
                <CardContent>
                  <TransactionForm onSuccess={() => {
                    setShowTransactionForm(false);
                    window.location.reload();
                  }} />
                </CardContent>
              )}
            </Card>
          </div>

          <BudgetChart transactions={transactions} />
        </div>

        <TransactionList />
      </main>
    </div>
  );
};
