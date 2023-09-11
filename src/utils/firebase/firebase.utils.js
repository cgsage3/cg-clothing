import { initializeApp } from 'firebase/app';
import {
	getAuth, 
	signInWithRedirect, 
	signInWithPopup, 
	GoogleAuthProvider,
	createUserWithEmailAndPassword

} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCXdlN4svVoSclWe5dc00UwTW4_4UP8P0k",
  authDomain: "cg-clothes.firebaseapp.com",
  projectId: "cg-clothes",
  storageBucket: "cg-clothes.appspot.com",
  messagingSenderId: "721899568781",
  appId: "1:721899568781:web:417e2c362cade4aeeeecc4"
};


// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
	userAuth, 
	additionalInformation = {}
	) => {
	if(!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid );

	console.log(userDocRef);

	const userSnapShot = await getDoc(userDocRef);

	console.log(userSnapShot);

	if (!userSnapShot.exists()) {
		const { displayName, email} = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation
			});
		}
		catch (error){
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password)
}