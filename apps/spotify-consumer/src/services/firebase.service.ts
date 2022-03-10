import {
  Auth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  UserCredential,
} from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

export class FirebaseService {
  actionCodeSettings = {
    url: 'http://localhost:4200',
    // This must be true.
    handleCodeInApp: true,
  };

  constructor(private readonly db: Firestore, private readonly auth: Auth) {}

  async sendSignInEmailLink(email: string): Promise<void> {
    await sendSignInLinkToEmail(this.auth, email, this.actionCodeSettings);
  }

  async confirmSignInEmailLink(email: string): Promise<UserCredential> {
    if (!isSignInWithEmailLink(this.auth, window.location.href)) {
      throw new Error('Invalid authentication method');
    }
    return signInWithEmailLink(
      this.auth,
      email,
      window.location.href
    );
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }
}
