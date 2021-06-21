import React, { useEffect, useState } from 'react';
import './Body.css';
import { useStateValue } from './StateProvider';
import { bounceInLeft } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import emptyCart from './icons/emptyCart.png';
import db, { auth } from './Firebase';
import { getBasketTotal, getQuantityTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import SearchBar from './SearchBar';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Select from 'react-select';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function Body() {
	const [{ basket }, dispatch] = useStateValue([]);
	const [customerList, setCustomerList] = useState([]);
	const [select, setSelect] = useState({});
	const [open, setOpen] = useState(false);
	const id = auth.currentUser?.uid;
	useEffect(() => {
		db.collection('users')
			.doc(id)
			.collection('customer')
			.onSnapshot((snapshot) => {
				setCustomerList(
					snapshot.docs.map((doc) => ({
						value: doc.id,
						label: doc.data().Name,
						credit: doc.data().Credit,
					}))
				);
			});
	}, []);

	const styles = {
		bounceInLeft: {
			animation: 'x 0.5s',
			animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft'),
		},
	};
	const handleOpen = () => {
		setOpen(!open);
	};

	const handleCustomer = (e) => {
		let identity = customerList.find((obj) => obj.value === e?.value);
		setSelect(identity);
		if (identity) {
			dispatch({
				type: 'SET_CUSTOMER',
				customer: {
					label: identity.label,
					id: identity.value,
					credit: identity.credit,
				},
			});
		} else {
			dispatch({
				type: 'SET_CUSTOMER',
				customer: {
					label: 'Customer',
					id: 'Customer ID',
					credit: 'No credit',
				},
			});
		}
	};
	// useEffect(() => {
	// 	console.log(customer);
	// }, [select]);
	return (
		<div className="body">
			<SearchBar />
			<div className="body__header mx-4">
				<p>Customer : &nbsp;</p>
				<div className="selectcustomer">
					<Select
						value={customerList.find((cust) => cust.value === select)}
						isSearchable
						isClearable
						onChange={handleCustomer}
						options={customerList}
					/>
				</div>
			</div>
			{basket.length !== 0 ? (
				<StyleRoot>
					<table className="body__table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Item</th>
								<th scope="col">Price</th>
								<th scope="col">Quantity</th>

								<th scope="col">Amount</th>
							</tr>
						</thead>

						<tbody style={{ cursor: 'pointer' }}>
							{basket.map((item, index) => (
								<tr
									style={styles.bounceInLeft}
									key={index}
									onClick={handleOpen}>
									<td scope="col">{index + 1}</td>
									<td scope="col">{item.name}</td>
									<CurrencyFormat
										renderText={(value) => <td scope="col">{value}</td>}
										decimalScale={2}
										value={item.price}
										displayType={'text'}
										thousandSeperator={true}
										prefix={'₹'}
									/>
									<Dialog
										open={open}
										TransitionComponent={Transition}
										keepMounted
										aria-labelledby="alert-dialog-slide-title"
										aria-describedby="alert-dialog-slide-description">
										<MuiDialogContent dividers>
											Are you sure you want to remove{' '}
											<strong>{item.name} </strong> from basket
										</MuiDialogContent>
										<MuiDialogActions>
											<Button onClick={handleOpen} color="primary">
												Keep
											</Button>
											<Button
												onClick={() => {
													dispatch({
														type: 'REMOVE_FROM_BASKET',
														item: { id: item.id },
													});
													setOpen(!open);
												}}
												color="secondary"
												autoFocus>
												Remove
											</Button>
										</MuiDialogActions>
									</Dialog>
									<td scope="col">{item.quantity}</td>
									<CurrencyFormat
										renderText={(value) => <td scope="col">{value}</td>}
										decimalScale={2}
										value={item.price * item.quantity}
										displayType={'text'}
										thousandSeperator={true}
										prefix={'₹'}
									/>
								</tr>
							))}
							<tr style={styles.bounceInLeft} className="mt-2">
								<td scope="col" colSpan="3">
									<b>Total</b>
								</td>

								<td scope="col">
									<strong>{getQuantityTotal(basket)} nos.</strong>
								</td>

								<CurrencyFormat
									renderText={(value) => (
										<>
											<td scope="col">
												<strong>{value}</strong>
											</td>
										</>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={'text'}
									thousandSeperator={true}
									prefix={'₹'}
								/>
							</tr>
						</tbody>
					</table>
				</StyleRoot>
			) : (
				<div className="bodycart__empty">
					<div className="bodyCart">
						<img className="" src={emptyCart}></img>
						<h6>Search and list products here...</h6>
					</div>
					<div className="updates mt-5 mb-5">
						<pre className="">✔ Login with google authentication</pre>
						<pre>✔ CRUD functionality on products</pre>
						<pre>✔ Easy search of added products</pre>
						<pre>✔ Create PDF invoice with the listed items</pre>
						<pre>✔ Add and update store details </pre>
						<pre>✔ Customer database</pre>
						<pre className="mt-4">❌ Credit on customer</pre>
						<pre>❌ share generated invoice tothe customer</pre>
					</div>
				</div>
			)}
		</div>
	);
}

export default Body;
