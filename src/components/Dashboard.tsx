
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { BudgetChart } from './BudgetChart';
import { StatsCards } from './StatsCards';
import { useState } from 'react';

export const Dashboard = () => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  
  // Données d'exemple pour la démo
  const mockTransactions = [
    {
      id: '1',
      type: 'income' as const,
      amount: 3000,
      category: 'Salary',
      description: 'Monthly salary',
      date: '2024-06-01',
      userId: 'demo'
    },
    {
      id: '2',
      type: 'expense' as const,
      amount: 150,
      category: 'Food',
      description: 'Groceries',
      date: '2024-06-05',
      userId: 'demo'
    },
    {
      id: '3',
      type: 'expense' as const,
      amount: 80,
      category: 'Transportation',
      description: 'Gas',
      date: '2024-06-03',
      userId: 'demo'
    }
  ];

  const totalIncome = mockTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BudgetMaster
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Mode démo
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <StatsCards 
          balance={balance} 
          totalIncome={totalIncome} 
          totalExpenses={totalExpenses} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                <TransactionForm onSuccess={() => setShowTransactionForm(false)} />
              </CardContent>
            )}
          </Card>

          <BudgetChart transactions={mockTransactions} />
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Transactions récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTransactions.map((transaction) => (
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
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                      }).format(Math.abs(transaction.amount))}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
