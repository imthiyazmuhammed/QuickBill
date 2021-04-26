import React, { useState } from 'react';
import db from './Firebase';
import { auth } from './Firebase';
import './Shop.css';

function Shop() {
	const [shopName, setShopName] = useState('');
	const [address, setAddress] = useState('');
	const [pincode, setPincode] = useState('');
	const [phoneNumber, setPhoneNumber] = useState(null);
	const [error, setError] = useState('');
	const id = auth.currentUser?.uid;

	const shopData = (e) => {
		e.preventDefault();
		db.collection('users')
			.doc(id)
			.collection('shopData')
			.add({
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
			})
			.catch((err) => setError(err.message));
	};
	return (
		<div className="shop">
			<br></br>
			<h4>Add your shop details</h4>
			<hr></hr>
			<form
				action=""
				autoComplete="off"
				classname="form-control"
				onSubmit={shopData}>
				<br></br>
				<label className="shop__form" htmlfor="shop_name">
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

				<label className="shop__form" htmlfor="address">
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
				<label className="shop__form" htmlfor="pincode">
					pincode
				</label>
				<br></br>
				<input
					type="text"
					className="form-control"
					onChange={(e) => setPincode(e.target.value)}
					value={pincode}
				/>
				<br></br>
				<label className="shop__form" htmlfor="phone number">
					Phone Number
				</label>
				<br></br>
				<input
					type="text"
					className="form-control"
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
