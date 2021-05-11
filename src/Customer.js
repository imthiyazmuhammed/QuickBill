import React, { useState, useEffect } from 'react';
import './Customer.css';
import { useStateValue } from './StateProvider';
import { Avatar } from '@material-ui/core';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { Link } from 'react-router-dom';
import db, { auth } from './Firebase';
const id = auth.currentUser?.uid;

function Customer() {
	const [{ user }] = useStateValue();
	const [data, setData] = useState(null);
	//getting shop data
	useEffect(() => {
		db.collection('users')
			.doc(id)
			.collection('shopData')
			.doc('BSRYAPMMABH')
			.get()
			.then((doc) => {
				if (doc.exists) {
					setData({
						name: doc.data().Name,
						address: doc.data().Address,
						phone: doc.data().Phone,
						pincode: doc.data().Pincode,
					});
				} else {
				}
			})
			.catch((error) => {
				console.log('error getting document :', error);
			});
	}, []);
	return (
		<div className="customer">
			<section>
				<h5 className="customer__hello">
					<Avatar
						className="customer__avatar"
						alt={user?.displayName}
						src={user?.photoURL}
					/>
					&nbsp; hello<b>&nbsp;{user?.displayName}</b>
				</h5>
			</section>
			<Link to="/Shop" style={{ 'text-decoration': 'none' }}>
				<section>
					<h5 className="customer__shop">
						<StorefrontIcon fontSize="large" />
						&nbsp;Store details
					</h5>
				</section>
			</Link>
			{data != null ? (
				<div className="data mt-5 card__content">
					<span className="card-content m-2 ">
						<p>
							Shop :<b> {data.name}</b>
						</p>
					</span>
					<span class="card-content m-2">
						<p>
							Address :<b> {data.address}</b>
						</p>
					</span>
					<span class="card-content m-2 ">
						<p>
							Pincode :<b> {data.pincode}</b>
						</p>
					</span>
					<span class="card-content m-2">
						<p>
							phone :<b> {data.phone}</b>
						</p>
					</span>
				</div>
			) : (
				<h6 class="mt-3">please update your store details 👆</h6>
			)}
		</div>
	);
}

export default Customer;
