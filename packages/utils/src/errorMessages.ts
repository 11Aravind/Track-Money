const authErrorMap: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already registered. Try signing in instead.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled. Please contact support.',
  'auth/user-not-found': 'No account found with this email. Please sign up first.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-credential': 'Invalid email or password. Please try again.',
  'auth/too-many-requests': 'Too many failed attempts. Please wait a moment and try again.',
  'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
  'auth/network-request-failed': 'Network error. Please check your internet connection.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled. Please try again.',
  'auth/popup-blocked': 'Sign-in popup was blocked. Please allow popups and try again.',
  'auth/account-exists-with-different-credential': 'An account already exists with this email using a different sign-in method.',
  'auth/requires-recent-login': 'Please sign in again to complete this action.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled. Please contact support.',
  'auth/unauthorized-domain': 'This domain is not authorized for sign-in. Please add it to the authorized domains in Firebase Console.',
};

const firestoreErrorMap: Record<string, string> = {
  'permission-denied': "You don't have permission to perform this action.",
  'not-found': 'The requested data was not found.',
  'already-exists': 'This item already exists.',
  'resource-exhausted': 'Too many requests. Please wait a moment and try again.',
  'unavailable': 'Service is temporarily unavailable. Please try again later.',
  'deadline-exceeded': 'The operation took too long. Please try again.',
  'unauthenticated': 'Please sign in to continue.',
};

export const getFriendlyError = (error: any) => {
  if (error?.code) {
    if (authErrorMap[error.code]) {
      return authErrorMap[error.code];
    }
    if (firestoreErrorMap[error.code]) {
      return firestoreErrorMap[error.code];
    }
  }

  const msg = error?.message || String(error);
  
  if (msg.includes('auth/')) {
    const match = msg.match(/auth\/[\w-]+/);
    if (match && authErrorMap[match[0]]) {
      return authErrorMap[match[0]];
    }
  }

  return 'Something went wrong. Please try again.';
};

export const getFriendlyFirestoreError = (error: any, operation: 'add' | 'update' | 'delete' | 'fetch' | string = 'complete this action') => {
  if (error?.code && firestoreErrorMap[error.code]) {
    return firestoreErrorMap[error.code];
  }

  const operationMessages: Record<string, string> = {
    'add': 'Unable to save. Please try again.',
    'update': 'Unable to update. Please try again.',
    'delete': 'Unable to delete. Please try again.',
    'fetch': 'Unable to load data. Please try again.',
  };

  return operationMessages[operation] || 'Something went wrong. Please try again.';
};
