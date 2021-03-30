import React, { useState } from 'react';
import './Customer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStateValue } from './StateProvider';
import { Avatar } from '@material-ui/core';

function Customer() {
	const [{ user }] = useStateValue();
	return (
		<div className="customer">
			<Avatar className="avatar" alt={user?.displayName} src={user?.photoURL} />
			<h5>
				
				hello <b>{user?.displayName}</b>
			</h5>
		</div>
	);
}

export default Customer;
