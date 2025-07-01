import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCpYf1M3V-czCHbVc3rS3J35oCkc_Nh0a4",
  authDomain: "budget-man-e63cb.firebaseapp.com",
  projectId: "budget-man-e63cb",
  storageBucket: "budget-man-e63cb.firebasestorage.app",
  messagingSenderId: "241993947362",
  appId: "1:241993947362:web:46ec39ecd76fc85a18e6bb",
  measurementId: "G-17PYEX7H8W"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Structure des catégories
const categories = {
  expense: [
    { id: 'alimentation', name: 'Alimentation', icon: '🍽️', color: '#3B82F6', type: 'expense' },
    { id: 'transport', name: 'Transport', icon: '🚗', color: '#8B5CF6', type: 'expense' },
    { id: 'loisirs', name: 'Loisirs', icon: '🎮', color: '#10B981', type: 'expense' },
    { id: 'factures', name: 'Factures', icon: '📝', color: '#F59E0B', type: 'expense' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#EF4444', type: 'expense' },
    { id: 'sante', name: 'Santé', icon: '💊', color: '#06B6D4', type: 'expense' },
    { id: 'autre', name: 'Autre', icon: '📦', color: '#F97316', type: 'expense' }
  ],
  income: [
    { id: 'salaire', name: 'Salaire', icon: '💰', color: '#3B82F6', type: 'income' },
    { id: 'freelance', name: 'Freelance', icon: '💻', color: '#8B5CF6', type: 'income' },
    { id: 'investissement', name: 'Investissement', icon: '📈', color: '#10B981', type: 'income' },
    { id: 'cadeau', name: 'Cadeau', icon: '🎁', color: '#F59E0B', type: 'income' },
    { id: 'autre', name: 'Autre', icon: '📦', color: '#F97316', type: 'income' }
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

// Fonction pour initialiser la base de données
const initializeDatabase = async () => {
  try {
    // Créer la collection des catégories
    const categoriesRef = collection(db, 'categories');
    for (const category of [...categories.expense, ...categories.income]) {
      await setDoc(doc(categoriesRef, category.id), category);
      console.log(`Catégorie créée : ${category.name}`);
    }

    // Créer la collection des budgets
    const budgetsRef = collection(db, 'budgets');
    const currentMonth = new Date().toISOString().slice(0, 7); // Format: YYYY-MM
    for (const [category, budget] of Object.entries(defaultBudgets)) {
      const budgetId = `default_${category}_${currentMonth}`;
      await setDoc(doc(budgetsRef, budgetId), {
        ...budget,
        category,
        month: currentMonth,
        isDefault: true
      });
      console.log(`Budget créé : ${category}`);
    }

    console.log('Initialisation de la base de données terminée avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  }
};

// Exécuter l'initialisation
initializeDatabase(); 