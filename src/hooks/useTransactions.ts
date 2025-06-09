
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Transaction } from '@/types/budget';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTransactions = async () => {
    if (!user) return;
    
    try {
      const q = query(
        collection(db, 'transactions'),
        where('userId', '==', user.uid),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const transactionData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[];
      setTransactions(transactionData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'userId'>) => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'transactions'), {
        ...transaction,
        userId: user.uid
      });
      fetchTransactions();
      toast({ title: "Transaction added successfully!" });
    } catch (error) {
      toast({ title: "Error adding transaction", variant: "destructive" });
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'transactions', id));
      fetchTransactions();
      toast({ title: "Transaction deleted successfully!" });
    } catch (error) {
      toast({ title: "Error deleting transaction", variant: "destructive" });
    }
  };

  return { transactions, loading, addTransaction, deleteTransaction, refetch: fetchTransactions };
};
