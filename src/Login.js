import React, { useEffect, useState } from 'react';
import './Login.css';
import { auth, provider } from './Firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import logo from './icons/Untitled-1.png';

function Login() {
	const [state, dispatch] = useStateValue();

	useEffect((e) => {
		auth.onAuthStateChanged((user) => {
			dispatch({
				type: 'SET_USER',
				user: user,
			});
		});
	}, []);
	const signIn = (e) => {
		auth
			.signInWithPopup(provider)
			.then((result) => {
				dispatch({
					type: 'SET_USER',
					user: result.user,
				});
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div className="login">
			<img src={logo} alt="Image not available" />
			<h3>QuickBill</h3>
			<button type="button" className="btn btn-dark" onClick={signIn}>
				Sign-In with Google
			</button>
			<h6>Billing made Quicker with ❤</h6>
		</div>
	);
}

export default Login;
