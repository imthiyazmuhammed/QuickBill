import React, { useState } from 'react';
import './Customer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStateValue } from './StateProvider';
import { Avatar } from '@material-ui/core';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { Link } from 'react-router-dom';

function Customer() {
	const [{ user }] = useStateValue();
	return (
		<div className="customer">
			<span class="shop">
				<Avatar
					className="avatar"
					alt={user?.displayName}
					src={user?.photoURL}
				/>
				<h5 class="h5">
					hello <b>{user?.displayName}</b>
				</h5>
			</span>
			<Link to="/shop" style={{ textDecoration: 'none' }}>
				<span>
					<h5  className="shop1">
						<StorefrontIcon fontSize="large" />
						&nbsp; Edit your shop details
					</h5>
				</span>
			</Link>
		</div>
	);
}

export default Customer;
