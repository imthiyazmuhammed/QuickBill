import React, { useState } from 'react';
import './Customer.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { useStateValue } from './StateProvider';
import { Avatar } from '@material-ui/core';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { Link } from 'react-router-dom';


function Customer() {
	const [{ user }] = useStateValue();
	return (
		<div className="customer">
			<section>
				<h5 class="customer__hello">
					<Avatar
						className="customer__avatar"
						alt={user?.displayName}
						src={user?.photoURL}
					/>
					&nbsp; hello<b>&nbsp;{user?.displayName}</b>
				</h5>
			</section>
			<Link to="/shop" style={{ 'text-decoration': 'none' }}>
				<section>
					<h5 className="customer__shop">
						<StorefrontIcon fontSize="large" />
						&nbsp;Edit Store details
					</h5>
				</section>
			</Link>
		</div>
	);
}

export default Customer;
