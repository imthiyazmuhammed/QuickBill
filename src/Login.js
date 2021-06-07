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
		<div className="waveWrapper waveAnimation">
			<div className="login">
				<img src={logo} alt="Image not available" />
				<h3>QuickBill</h3>
				<div>
					<button
						onClick={signIn}
						className="btn btn-outline-primary mt-3"
						style={{ textDecoration: 'none' }}
						href="#">
						<img
							width="15px"
							style={{ marginBottom: '3px', marginRight: '5px' }}
							alt="Google login"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
						/>
						Sign in with Google
					</button>
				</div>
				<h6>Billing made Quicker with ❤</h6>
			</div>

			<div className="waveWrapperInner bgTop">
				<div className="wave waveTop"></div>
			</div>
			<div className="waveWrapperInner bgMiddle">
				<div className="wave waveMiddle"></div>
			</div>
			<div className="waveWrapperInner bgBottom">
				<div className="wave waveBottom"></div>
			</div>
		</div>
	);
}

export default Login;
