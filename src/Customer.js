import React, { useState } from 'react';
import './Customer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStateValue } from './StateProvider';
import { Avatar } from '@material-ui/core';

function Customer() {
	const [{ user }] = useStateValue();
	return (
		<div className="customer">
			<div className="retailer">
				<Avatar className="avatar" alt={user?.displayName} src={user?.photoURL} />
				<h3> hello {user?.displayName} ! these are your customers.</h3>
			</div>
		</div>
	);
}

export default Customer;
