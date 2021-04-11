import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from './Firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import logo from './icons/Untitled-1.png';

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

	return (
		<div className="login">
			<div className="login-wrap">
				<img src={logo} alt="image not available" />
				<div id="crd-title">
					<h3>QuickBilll</h3>
				</div>

				<Button variant="outlined" color="primary" onClick={signIn}>
					Sign-In with Google
				</Button>
				<h6>Billing made Quicker with ❤</h6>
			</div>
		</div>
	);
}

export default Login;
