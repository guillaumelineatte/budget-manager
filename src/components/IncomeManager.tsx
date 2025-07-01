import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTransactions } from '@/hooks/useTransactions';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const IncomeManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [totalIncome, setTotalIncome] = useState('');
  const { addTransaction, currentMonth } = useTransactions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!totalIncome) return;

    await addTransaction({
      type: 'income',
      amount: parseFloat(totalIncome),
      category: 'Salaire',
      description: 'Revenus totaux du mois',
      date: new Date().toISOString()
    });

    setTotalIncome('');
    setShowForm(false);
    window.location.reload();
  };

  return (
    <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          Revenus du mois de {format(new Date(currentMonth), 'MMMM yyyy', { locale: fr })}
        </CardTitle>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:scale-105"
        >
          {showForm ? 'Annuler' : 'Définir les revenus'}
        </Button>
      </CardHeader>
      {showForm && (
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Revenus totaux du mois</Label>
              <Input
                type="number"
                step="0.01"
                value={totalIncome}
                onChange={(e) => setTotalIncome(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:scale-105"
            >
              Enregistrer les revenus
            </Button>
          </form>
        </CardContent>
      )}
    </Card>
  );
}; 