import {
  Auth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  UserCredential,
} from 'firebase/auth';
import {
  Database,
  set,
  ref,
  onValue as _onValue,
  Query,
  DataSnapshot,
} from 'firebase/database';
import { Track } from '../types';

const onValue = (query: Query) =>
  new Promise<DataSnapshot>((res, rej) => {
    _onValue(
      query,
      (snapshot) => res(snapshot),
      (error) => rej(error)
    );
  });

export class FirebaseService {
  authConfigs = {
    url: process.env['NX_REDIRECT_URI'] ?? '',
    handleCodeInApp: true,
  };

  constructor(
    private readonly database: Database,
    private readonly auth: Auth
  ) {}

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
  async uploadLibrary(
    creds: UserCredential,
    library: Track[]
  ): Promise<Track[]> {
    await set(ref(this.database, `libraries/${creds.user.uid}`), library);
    return library;
  }

  async getLibrary(creds: UserCredential): Promise<Track[]> {
    const dataSnapshot = await onValue(
      ref(this.database, `libraries/${creds.user.uid}`)
    );

    return dataSnapshot.val() ?? [];
  }
}
