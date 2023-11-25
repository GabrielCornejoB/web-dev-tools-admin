/** Firebase Auth error message codes */
export const AUTH = {
  EMAIL_ALREADY_IN_USE: 'auth/email-already-in-use',
  INVALID_LOGIN_CREDENTIALS: 'auth/invalid-login-credentials',
  INVALID_PASSWORD: 'auth/wrong-password',
  USER_NOT_FOUND: 'auth/user-not-found',
  TOO_MANY_ATTEMPTS: 'auth/too-many-requests',
} as const;
