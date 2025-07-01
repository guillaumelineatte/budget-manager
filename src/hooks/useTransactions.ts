import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Transaction } from '@/types/budget';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(format(new Date(), 'yyyy-MM'));
  const { user } = useAuth();

  const fetchTransactions = async (month = currentMonth) => {
    if (!user) return;
    
    try {
      setLoading(true);
      const q = query(
        collection(db, 'transactions'),
        where('userId', '==', user.uid),
        where('month', '==', month)
      );
      const querySnapshot = await getDocs(q);
      const transactionData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[];
      
      const sortedTransactions = transactionData.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      setTransactions(sortedTransactions);
    } catch (error) {
      console.error('Erreur lors de la récupération des transactions:', error);
      toast({ title: "Erreur lors de la récupération des transactions", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user, currentMonth]);

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'userId' | 'month'>) => {
    if (!user) return;

    try {
      const month = format(new Date(transaction.date), 'yyyy-MM');
      const docRef = await addDoc(collection(db, 'transactions'), {
        ...transaction,
        userId: user.uid,
        month
      });

      // Si la transaction est du mois courant, mettre à jour la liste
      if (month === currentMonth) {
        const newTransaction: Transaction = {
          id: docRef.id,
          ...transaction,
          userId: user.uid,
          month
        };

        setTransactions(prevTransactions => {
          const updatedTransactions = [newTransaction, ...prevTransactions];
          return updatedTransactions.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        });
      }

      toast({ title: "Transaction ajoutée avec succès !" });
    } catch (error) {
      toast({ title: "Erreur lors de l'ajout de la transaction", variant: "destructive" });
    }
  };

  const deleteTransaction = async (id: string, month: string) => {
    try {
      await deleteDoc(doc(db, 'transactions', id));
      
      // Si la transaction supprimée est du mois courant, mettre à jour la liste
      if (month === currentMonth) {
        setTransactions(prevTransactions => 
          prevTransactions.filter(transaction => transaction.id !== id)
        );
      }
      
      toast({ title: "Transaction supprimée avec succès !" });
    } catch (error) {
      toast({ title: "Erreur lors de la suppression de la transaction", variant: "destructive" });
    }
  };

  const changeMonth = (month: string) => {
    setCurrentMonth(month);
  };

  return { 
    transactions, 
    loading, 
    currentMonth,
    addTransaction, 
    deleteTransaction, 
    changeMonth,
    fetchTransactions 
  };
};
