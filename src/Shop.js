import React, { useEffect, useState } from 'react';
import db from './Firebase';
import { auth } from './Firebase';
import './Shop.css';

function Shop() {
	const [shopName, setShopName] = useState('');
	const [address, setAddress] = useState('');
	const [pincode, setPincode] = useState('');
	const [phoneNumber, setPhoneNumber] = useState(null);
	const [error, setError] = useState('');

	const id = auth.currentUser?.uid; //unique user id
	//adding the shop data
	const shopData = (e) => {
		e.preventDefault();
		db.collection('users')
			.doc(id)
			.collection('shopData')
			.doc('BSRYAPMMABH')
			.set({
				Name: shopName,
				Address: address,
				Pincode: pincode,
				Phone: phoneNumber,
			})
			.then(() => {
				setShopName('');
				setAddress('');
				setPincode('');
				setPhoneNumber('');
				setError('');
				console.log(error);
			})
			.catch((err) => setError(err.message));
	};

	return (
		<div className="shop">
			<br></br>
			<h4>Update shop details</h4>
			<hr></hr>
			<form
				action=""
				autoComplete="off"
				classname="form-control"
				onSubmit={shopData}>
				<br></br>
				<label className="shop__form" htmlFor="shop_name">
					Shop Name
				</label>
				<br></br>

				<input
					type="text"
					className="form-control"
					required
					onChange={(e) => setShopName(e.target.value)}
					value={shopName}
				/>
				<br></br>

				<label className="shop__form" htmlFor="address">
					Address
				</label>
				<br></br>
				<input
					type="text"
					className="form-control"
					required
					onChange={(e) => setAddress(e.target.value)}
					value={address}
				/>
				<br></br>
				<label className="shop__form" htmlFor="pincode">
					pincode
				</label>
				<br></br>
				<input
					type="number"
					className="form-control"
					maxlength="6"
					minLength="6"
					onChange={(e) => setPincode(e.target.value)}
					value={pincode}
				/>
				<br></br>
				<label className="shop__form" htmlFor="phone number">
					Phone Number
				</label>
				<br></br>
				<input
					type="number"
					className="form-control"
					maxlength="10"
					minLength="10"
					required
					onChange={(e) => setPhoneNumber(e.target.value)}
					value={phoneNumber}
				/>
				<br></br>
				<div className="text-center">
					<button className="btn btn-success btn-md ">Add</button>
				</div>
			</form>
		</div>
	);
}

export default Shop;
