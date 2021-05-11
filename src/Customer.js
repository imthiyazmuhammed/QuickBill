import React, { useState, useEffect } from 'react';
import './Customer.css';
import { useStateValue } from './StateProvider';
import { Avatar } from '@material-ui/core';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { Link } from 'react-router-dom';
import db, { auth } from './Firebase';
import { Button, Modal } from 'react-bootstrap';

const id = auth.currentUser?.uid;

function Customer() {
	const [{ user }] = useStateValue();
	const [data, setData] = useState(null);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
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
	}, [data]);
	return (
		<div className="customer">
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Update store details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
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
							maxLength="6"
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
							maxLength="10"
							minLength="10"
							required
							onChange={(e) => setPhoneNumber(e.target.value)}
							value={phoneNumber}
						/>
						<Modal.Footer>
							<button className="btn btn-success" onClick={handleClose}>
								Save Changes
							</button>
						</Modal.Footer>
					</form>
				</Modal.Body>
			</Modal>
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

			<section>
				<h5 className="customer__shop" onClick={handleShow}>
					<StorefrontIcon fontSize="large" />
					&nbsp;Store details
				</h5>
			</section>

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
