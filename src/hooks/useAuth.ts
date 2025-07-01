import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { initializeFirestore } from '@/lib/initFirestore';
import { toast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Initialiser Firestore pour le nouvel utilisateur
      await initializeFirestore(userCredential.user.uid);
      toast({ title: "Compte créé avec succès !" });
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error);
      toast({ 
        title: "Erreur lors de l'inscription", 
        description: error.message,
        variant: "destructive" 
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Connexion réussie !" });
    } catch (error: any) {
      console.error('Erreur lors de la connexion:', error);
      toast({ 
        title: "Erreur lors de la connexion", 
        description: error.message,
        variant: "destructive" 
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Déconnexion réussie !" });
    } catch (error: any) {
      console.error('Erreur lors de la déconnexion:', error);
      toast({ 
        title: "Erreur lors de la déconnexion", 
        description: error.message,
        variant: "destructive" 
      });
    }
  };

  return { user, loading, signUp, signIn, logout };
}; 