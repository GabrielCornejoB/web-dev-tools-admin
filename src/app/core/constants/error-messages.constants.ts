/** Object that contains custom form error messages for different error types. The key is the type of the error and the value is the message */
export const FORM_ERROR_MESSAGES: { [key: string]: string } = {
  required: 'This field is required',
  isValidEmail: 'This field must be a valid email',
  arePasswordsEqual: 'The passwords must match',

  invalidLoginCredentials: 'Invalid login credentials',
  incorrectPassword: 'Incorrect password',
  userNotFound: 'User not found',
  tooManyAttempts: 'Too many login attempts, please try again later',
  emailNotAvailable: 'Email already in use, try using another one',
  unknownError: 'Unknown error :c',
};
