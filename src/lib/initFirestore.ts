import { collection, doc, setDoc, getFirestore } from 'firebase/firestore';
import { db } from './firebase';

// Structure des catégories par défaut
const defaultCategories = {
  expense: [
    { id: 'alimentation', name: 'Alimentation', icon: '🍽️', color: '#3B82F6' },
    { id: 'transport', name: 'Transport', icon: '🚗', color: '#8B5CF6' },
    { id: 'loisirs', name: 'Loisirs', icon: '🎮', color: '#10B981' },
    { id: 'factures', name: 'Factures', icon: '📝', color: '#F59E0B' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#EF4444' },
    { id: 'sante', name: 'Santé', icon: '💊', color: '#06B6D4' },
    { id: 'autre', name: 'Autre', icon: '📦', color: '#F97316' }
  ],
  income: [
    { id: 'salaire', name: 'Salaire', icon: '💰', color: '#3B82F6' },
    { id: 'freelance', name: 'Freelance', icon: '💻', color: '#8B5CF6' },
    { id: 'investissement', name: 'Investissement', icon: '📈', color: '#10B981' },
    { id: 'cadeau', name: 'Cadeau', icon: '🎁', color: '#F59E0B' },
    { id: 'autre', name: 'Autre', icon: '📦', color: '#F97316' }
  ]
};

// Structure des budgets par défaut
const defaultBudgets = {
  alimentation: { limit: 400, spent: 0 },
  transport: { limit: 200, spent: 0 },
  loisirs: { limit: 150, spent: 0 },
  factures: { limit: 500, spent: 0 },
  shopping: { limit: 200, spent: 0 },
  sante: { limit: 100, spent: 0 }
};

export const initializeFirestore = async (userId: string) => {
  try {
    // Créer la collection des catégories
    const categoriesRef = collection(db, 'categories');
    for (const category of [...defaultCategories.expense, ...defaultCategories.income]) {
      await setDoc(doc(categoriesRef, category.id), {
        ...category,
        userId,
        type: defaultCategories.expense.includes(category) ? 'expense' : 'income'
      });
    }

    // Créer la collection des budgets
    const budgetsRef = collection(db, 'budgets');
    const currentMonth = new Date().toISOString().slice(0, 7); // Format: YYYY-MM
    for (const [category, budget] of Object.entries(defaultBudgets)) {
      await setDoc(doc(budgetsRef, `${userId}_${category}_${currentMonth}`), {
        ...budget,
        category,
        userId,
        month: currentMonth
      });
    }

    console.log('Initialisation de Firestore terminée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de Firestore:', error);
    throw error;
  }
}; 