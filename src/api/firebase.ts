import { initializeApp } from 'firebase/app';
import {
    GoogleAuthProvider,
    User,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const login = async () => {
    return signInWithPopup(auth, provider).catch((error) => {
        throw new Error(error);
    });
};

export const logout = async () => {
    return signOut(auth).catch((error) => {
        throw new Error(error);
    });
};

export const onUserStateChange = (callback: (user: User | null) => void) =>
    onAuthStateChanged(auth, (user) => callback(user));
