/**
 * Maps Firebase error messages to user-friendly messages.
 * Keeps raw error in console for debugging, shows clean message to users.
 */

const authErrorMap = {
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
};

const firestoreErrorMap = {
  'permission-denied': 'You don\'t have permission to perform this action.',
  'not-found': 'The requested data was not found.',
  'already-exists': 'This item already exists.',
  'resource-exhausted': 'Too many requests. Please wait a moment and try again.',
  'unavailable': 'Service is temporarily unavailable. Please try again later.',
  'deadline-exceeded': 'The operation took too long. Please try again.',
  'unauthenticated': 'Please sign in to continue.',
};

/**
 * Get a user-friendly error message from a Firebase error.
 */
export const getFriendlyError = (error) => {
  // Firebase errors have a 'code' property like 'auth/email-already-in-use'
  if (error?.code) {
    // Check auth errors
    if (authErrorMap[error.code]) {
      return authErrorMap[error.code];
    }
    // Check firestore errors (codes are like 'permission-denied')
    if (firestoreErrorMap[error.code]) {
      return firestoreErrorMap[error.code];
    }
  }

  // Fallback: check if the message contains known Firebase patterns
  const msg = error?.message || String(error);
  
  if (msg.includes('auth/')) {
    // Extract the error code from the message
    const match = msg.match(/auth\/[\w-]+/);
    if (match && authErrorMap[match[0]]) {
      return authErrorMap[match[0]];
    }
  }

  // Generic fallback - never show raw Firebase messages
  return 'Something went wrong. Please try again.';
};

/**
 * Get a user-friendly error message for firestore operations.
 */
export const getFriendlyFirestoreError = (error, operation = 'complete this action') => {
  if (error?.code && firestoreErrorMap[error.code]) {
    return firestoreErrorMap[error.code];
  }

  // Generic messages based on operation type
  const operationMessages = {
    'add': 'Unable to save. Please try again.',
    'update': 'Unable to update. Please try again.',
    'delete': 'Unable to delete. Please try again.',
    'fetch': 'Unable to load data. Please try again.',
  };

  return operationMessages[operation] || 'Something went wrong. Please try again.';
};
