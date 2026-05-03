import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from './config';
import { getFriendlyFirestoreError } from '@trackify/utils';

// ==================== TRANSACTIONS ====================

export const addTransaction = async (userId: string, transactionData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'transactions'), {
      ...transactionData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding transaction:', error);
    return { success: false, error: getFriendlyFirestoreError(error, 'add') };
  }
};

export const updateTransaction = async (transactionId: string, transactionData: any) => {
  try {
    const transactionRef = doc(db, 'transactions', transactionId);
    await updateDoc(transactionRef, {
      ...transactionData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating transaction:', error);
    return { success: false, error: getFriendlyFirestoreError(error, 'update') };
  }
};

export const deleteTransaction = async (transactionId: string) => {
  try {
    await deleteDoc(doc(db, 'transactions', transactionId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return { success: false, error: getFriendlyFirestoreError(error, 'delete') };
  }
};

export const getTransactions = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const transactions: any[] = [];
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: transactions };
  } catch (error) {
    console.error('Error getting transactions:', error);
    return { success: false, error: getFriendlyFirestoreError(error, 'fetch') };
  }
};

export const subscribeToTransactions = (userId: string, callback: (data: any[]) => void, onError?: (error: any) => void) => {
  const q = query(
    collection(db, 'transactions'),
    where('userId', '==', userId),
    orderBy('date', 'desc')
  );
  
  return onSnapshot(q, 
    (querySnapshot) => {
      const transactions: any[] = [];
      querySnapshot.forEach((doc) => {
        transactions.push({ id: doc.id, ...doc.data() });
      });
      callback(transactions);
    },
    (error) => {
      console.error('Error in subscribeToTransactions:', error);
      if (onError) onError(error);
    }
  );
};

// ==================== CATEGORIES ====================

export const addCategory = async (userId: string, categoryData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'categories'), {
      ...categoryData,
      userId,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding category:', error);
    return { success: false, error: getFriendlyFirestoreError(error, 'add') };
  }
};

export const updateCategory = async (categoryId: string, categoryData: any) => {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    await updateDoc(categoryRef, categoryData);
    return { success: true };
  } catch (error) {
    console.error('Error updating category:', error);
    return { success: false, error: getFriendlyFirestoreError(error, 'update') };
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    await deleteDoc(doc(db, 'categories', categoryId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { success: false, error: getFriendlyFirestoreError(error, 'delete') };
  }
};

export const getCategories = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'categories'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const categories: any[] = [];
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error('Error getting categories:', error);
    return { success: false, error: getFriendlyFirestoreError(error, 'fetch') };
  }
};

export const subscribeToCategories = (userId: string, callback: (data: any[]) => void, onError?: (error: any) => void) => {
  const q = query(
    collection(db, 'categories'),
    where('userId', '==', userId)
  );
  
  return onSnapshot(q, 
    (querySnapshot) => {
      const categories: any[] = [];
      querySnapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() });
      });
      callback(categories);
    },
    (error) => {
      console.error('Error in subscribeToCategories:', error);
      if (onError) onError(error);
    }
  );
};

export const initializeDefaultCategories = async (userId: string) => {
  const defaultCategories = [
    { name: 'Food', type: 'expense', icon: 'Utensils', color: '#FF6B6B' },
    { name: 'Petrol', type: 'expense', icon: 'Fuel', color: '#4ECDC4' },
    { name: 'Shopping', type: 'expense', icon: 'ShoppingBag', color: '#95E1D3' },
    { name: 'Bills', type: 'expense', icon: 'FileText', color: '#F38181' },
    { name: 'Salary', type: 'income', icon: 'Banknote', color: '#6BCF7F' },
    { name: 'Other Income', type: 'income', icon: 'Coins', color: '#51CF66' },
    { name: 'Other Expense', type: 'expense', icon: 'Receipt', color: '#FFA94D' },
    { name: 'Savings', type: 'savings', icon: 'Landmark', color: '#4A90D9' },
    { name: 'Lent', type: 'lent', icon: 'Handshake', color: '#F59F00' },
    { name: 'Borrow', type: 'borrow', icon: 'CreditCard', color: '#9B59B6' }
  ];

  try {
    const batch = writeBatch(db);
    defaultCategories.forEach((category) => {
      const docRef = doc(collection(db, 'categories'));
      batch.set(docRef, {
        ...category,
        userId,
        createdAt: serverTimestamp()
      });
    });
    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error('Error initializing categories:', error);
    return { success: false, error: getFriendlyFirestoreError(error, 'add') };
  }
};
