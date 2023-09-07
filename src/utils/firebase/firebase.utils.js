import { initializeApp } from 'firebase/app';
import { 
	getAuth, 
	signInWithRedirect, 
	signInWithPopup, 
	GoogleAuthProvider,

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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
				createdAt
			});
		}
		catch (error){
			console.log('error crating the user', error.message);
		}
	}

	return userDocRef;
}