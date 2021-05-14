import React, { useState, useEffect } from 'react';
import './Customer.css';
import { useStateValue } from './StateProvider';
import { Avatar } from '@material-ui/core';
import StorefrontIcon from '@material-ui/icons/Storefront';
import db, { auth } from './Firebase';
import { Modal } from 'react-bootstrap';
import ContactsIcon from '@material-ui/icons/Contacts';
import PhoneIcon from '@material-ui/icons/Phone';
import CreditCardIcon from '@material-ui/icons/CreditCard';
const id = auth.currentUser?.uid;

function Customer() {
	const [{ user }] = useStateValue();
	const [data, setData] = useState(null);
	const [customer, setCustomer] = useState([]);
	const [showShop, setShowShop] = useState(false);
	//storing customer an dstore details
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [pincode, setPincode] = useState('');
	const [phone, setPhone] = useState(null);
	const [showCustomer, setShowCustomer] = useState(false);
	const [credit, setCredit] = useState(Number);
	//customer deatils comes here
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
				Name: name,
				Address: address,
				Pincode: pincode,
				Phone: phone,
			})
			.then(() => {
				setName('');
				setAddress('');
				setPincode('');
				setPhone('');
				setError('');
				console.log(error);
			})
			.catch((err) => setError(err.message));
	};
	//adding customer data
	const customerData = (e) => {
		e.preventDefault();
		db.collection('users')
			.doc(id)
			.collection('customer')
			.add({ Name: name, Phone: phone, Credit: credit })
			.then(() => {
				setName('');
				setPhone('');
				setCredit(0);
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
				}
			})
			.catch((error) => {
				console.log('error getting document :', error);
			});
	}, [data]);
	useEffect(() => {
		db.collection('users')
			.doc(id)
			.collection('customer')
			.onSnapshot((snapshot) => {
				setCustomer(
					snapshot.docs.map((doc) => ({
						Id: doc.id,
						name: doc.data().Name,
						phone: doc.data().Phone,
						credit: doc.data().Credit,
					}))
				);
			});
	}, []);

	return (
		<div className="customer">
			<div className="customer__retailer">
				<Modal
					show={showShop}
					onHide={(e) => setShowShop(false)}
					backdrop="static">
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
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
							<br></br>

							<label className="shop__form">Address</label>
							<br></br>
							<input
								type="text"
								className="form-control"
								required
								onChange={(e) => setAddress(e.target.value)}
								value={address}
							/>
							<br></br>
							<label className="shop__form">pincode</label>
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
							<label className="shop__form">Phone Number</label>
							<br></br>
							<input
								type="number"
								className="form-control"
								maxLength="10"
								minLength="10"
								required
								onChange={(e) => setPhone(e.target.value)}
								value={phone}
							/>
							<Modal.Footer>
								<button
									className="btn btn-success"
									onClick={(e) => setShowShop(false)}>
									Save Changes
								</button>
							</Modal.Footer>
						</form>
					</Modal.Body>
				</Modal>
				<Modal
					show={showCustomer}
					onHide={(e) => setShowCustomer(false)}
					backdrop="static">
					<Modal.Header closeButton>
						<h5>Add new customer</h5>
					</Modal.Header>
					<Modal.Body>
						<form action="" classname="form-control" onSubmit={customerData}>
							<br></br>
							<label className="shop__form">Name</label>
							<br></br>

							<input
								type="text"
								className="form-control"
								required
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
							<br></br>

							<label className="shop__form">Phone Number</label>
							<br></br>
							<input
								type="text"
								className="form-control"
								size="10"
								required
								onChange={(e) => setPhone(e.target.value)}
								value={phone}
							/>
							<br></br>
							<label className="shop__form">Old Credit</label>
							<br></br>
							<input
								type="number"
								className="form-control"
								maxLength="6"
								minLength="6"
								onChange={(e) => setCredit(e.target.value)}
								value={credit}
							/>
							<Modal.Footer>
								<button
									className="btn btn-success"
									onClick={(e) => setShowCustomer(false)}>
									Save Changes
								</button>
							</Modal.Footer>
						</form>
					</Modal.Body>
				</Modal>
				<section className="customer__hello">
					<h5 className="customer__shop">
						<Avatar
							fontSize="large"
							alt={user?.displayName}
							src={user?.photoURL}
						/>
						&nbsp; hello<b>&nbsp;{user?.displayName}</b>
					</h5>

					<h5 onClick={(e) => setShowShop(true)} className="customer__shop">
						<StorefrontIcon fontSize="large" />
						&nbsp;Store details
					</h5>
				</section>
				{data != null ? (
					<div className="data mt-3 card__content">
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
			<h5 class="ml-4 mb-4" onClick={(e) => setShowCustomer(true)}>
				<ContactsIcon fontSize="large" />
				&nbsp;Add customer
			</h5>
			<div className="customer_data">
				{customer.length != 0 ? (
					<div className="products__list">
						<ul className="product__cards">
							{customer.map((cust) => (
								<li class="cards__item" key={cust.Id}>
									<div class="card__content">
										<h5 class="card__title">{cust.name}</h5>
										<h6 class="card__text">
											<PhoneIcon /> &nbsp;&nbsp;&nbsp;{cust.phone}
										</h6>
										<h6 class="card__text">
											<CreditCardIcon />
											&nbsp;&nbsp;&nbsp;
											{cust.credit}
										</h6>
									</div>
								</li>
							))}
						</ul>
					</div>
				) : (
					<h6 class="ml-4">👆 Add your customers to show here !</h6>
				)}
			</div>
		</div>
	);
}

export default Customer;
