import {
  Auth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  UserCredential,
} from 'firebase/auth';
import { Database } from 'firebase/database'
import { Track } from '../types';

export class FirebaseService {
  authConfigs = {
    url: 'http://localhost:4200',
    handleCodeInApp: true,
  };

  constructor(private readonly database: Database, private readonly auth: Auth) {}

  // Firebase Auth Services
  async sendSignInEmailLink(email: string): Promise<void> {
    await sendSignInLinkToEmail(this.auth, email, this.authConfigs);
  }

  async confirmSignInEmailLink(email: string): Promise<UserCredential> {
    if (!isSignInWithEmailLink(this.auth, window.location.href)) {
      throw new Error('Invalid authentication method');
    }
    return signInWithEmailLink(this.auth, email, window.location.href);
  }

  async refreshToken(creds: UserCredential): Promise<UserCredential> {
    await creds.user.getIdToken(true);
    return creds;
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }

  // Firebase DB Services
  uploadLibrary(library: Track[]) {}

  getLibrary() {}
}
