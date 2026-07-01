/**
 * Result returned by auth server actions, shaped for React 19's
 * `useActionState`. A thrown redirect indicates success for sign-in.
 */
export interface AuthActionState {
  error?: string;
  message?: string;
  success?: boolean;
  fieldErrors?: Record<string, string[] | undefined>;
}

export const initialAuthState: AuthActionState = {};
