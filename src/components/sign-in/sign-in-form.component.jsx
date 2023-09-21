import {useState} from 'react';

import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import {UserContext} from '../../contexts/user.context';
import { 
	createAuthUserWithEmailAndPassword, 
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';


const defaultFormFields = {
	email: '',
	password: '',
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email, 
				password
			);
			resetFormFields();
		} catch(err) {
			switch(err.code) {
			case 'auth/wrong-password':
				alert('incorrect password for email')
				break;
			case 'auth/user-not-found':
				alert('no usser associatetd with this email')
				break;
			default:
				console.log(err);
			}
		}
	}
	const handleChange = (event) => {
		const {name, value} = event.target;

		setFormFields({...formFields, [name]: value})
	};

	return (
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput 
					label="Email"
					type="email" 
					required 
					onChange={handleChange} 
					name="email"
					value={email}
				/>

				<FormInput 
					label="Password"
					type="password" 
					required 
					onChange={handleChange} 
					name="password"
					value={password}
				/>
				<ButtonsContainer>
					<Button type="submit">Sign In</Button>
					<Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign In</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	)
}

export default SignInForm;