import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCUahwqmKiv0aU4WWTDjrIi4wz9kjHisdg",
  authDomain: "mate-clothing-db.firebaseapp.com",
  projectId: "mate-clothing-db",
  storageBucket: "mate-clothing-db.appspot.com",
  messagingSenderId: "1075350070638",
  appId: "1:1075350070638:web:ec09be30b783ed0d874d7f"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const firebaseAuth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(firebaseAuth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(firebaseAuth, googleProvider);

export const fireStoreDatabase = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;

  const userDocRef = doc(fireStoreDatabase, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists())
  {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
      });
    } catch (error) {
      console.log('Error creating the user', error.message);
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return ;

  return await createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return ;

  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

