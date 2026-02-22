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

// ==================== TRANSACTIONS ====================

export const addTransaction = async (userId, transactionData) => {
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
    return { success: false, error: error.message };
  }
};

export const updateTransaction = async (transactionId, transactionData) => {
  try {
    const transactionRef = doc(db, 'transactions', transactionId);
    await updateDoc(transactionRef, {
      ...transactionData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating transaction:', error);
    return { success: false, error: error.message };
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    await deleteDoc(doc(db, 'transactions', transactionId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return { success: false, error: error.message };
  }
};

export const getTransactions = async (userId) => {
  try {
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const transactions = [];
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: transactions };
  } catch (error) {
    console.error('Error getting transactions:', error);
    return { success: false, error: error.message };
  }
};

export const subscribeToTransactions = (userId, callback, onError) => {
  const q = query(
    collection(db, 'transactions'),
    where('userId', '==', userId),
    orderBy('date', 'desc')
  );
  
  return onSnapshot(q, 
    (querySnapshot) => {
      const transactions = [];
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

export const addCategory = async (userId, categoryData) => {
  try {
    const docRef = await addDoc(collection(db, 'categories'), {
      ...categoryData,
      userId,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding category:', error);
    return { success: false, error: error.message };
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const categoryRef = doc(db, 'categories', categoryId);
    await updateDoc(categoryRef, categoryData);
    return { success: true };
  } catch (error) {
    console.error('Error updating category:', error);
    return { success: false, error: error.message };
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    await deleteDoc(doc(db, 'categories', categoryId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting category:', error);
    return { success: false, error: error.message };
  }
};

export const getCategories = async (userId) => {
  try {
    const q = query(
      collection(db, 'categories'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error('Error getting categories:', error);
    return { success: false, error: error.message };
  }
};

export const subscribeToCategories = (userId, callback, onError) => {
  const q = query(
    collection(db, 'categories'),
    where('userId', '==', userId)
  );
  
  return onSnapshot(q, 
    (querySnapshot) => {
      const categories = [];
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

// Initialize default categories for new users
export const initializeDefaultCategories = async (userId) => {
  const defaultCategories = [
    { name: 'Food', type: 'expense', icon: '🍔', color: '#FF6B6B' },
    { name: 'Petrol', type: 'expense', icon: '⛽', color: '#4ECDC4' },
    { name: 'Shopping', type: 'expense', icon: '🛍️', color: '#95E1D3' },
    { name: 'Bills', type: 'expense', icon: '📄', color: '#F38181' },
    { name: 'Salary', type: 'income', icon: '💰', color: '#6BCF7F' },
    { name: 'Other Income', type: 'income', icon: '💵', color: '#51CF66' },
    { name: 'Other Expense', type: 'expense', icon: '💸', color: '#FFA94D' }
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
    return { success: false, error: error.message };
  }
};
