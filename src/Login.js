import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from './Firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
	const [state, dispatch] = useStateValue();
	const signIn = (e) => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				console.log(result);
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
			.catch((error) => {
				alert(error.message);
			});
	};
	/* const [state, dispatch] = useStateValue();
	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
			.catch((error) => {
				alert(error.messsage);
			});
	}; */

	return (
		<div className="Login">
			<div className="login__container">
				<img
					src="https://image.freepik.com/free-vector/vector-receipt-icon_8276-195.jpg"
					alt="image not available"
				/>
				<h3>Sign-In to QuickBilll</h3>
				<Button variant="outlined" color="primary" onClick={signIn}>
					Sign-In with Google
				</Button>
			</div>
		</div>
	);
}

export default Login;
