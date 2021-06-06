import React, { useEffect, useState } from 'react';
import './Body.css';
import { useStateValue } from './StateProvider';
import { bounceInLeft } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import BodyImage from './icons/body.svg';
import db, { auth } from './Firebase';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';

function Body() {
	const [{ basket }, dispatch] = useStateValue();
	const [customer, setCustomer] = useState([]);
	const [select, setSelect] = useState([]);
	const id = auth.currentUser?.uid;
	useEffect(() => {
		db.collection('users')
			.doc(id)
			.collection('customer')
			.onSnapshot((snapshot) => {
				setCustomer(
					snapshot.docs.map((doc) => ({
						ID: doc.id,
						name: doc.data().Name,
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

	return (
		<div className="body">
			<div className="body__header">
				<div className="select__customer">
					<p>{select.credit}</p>

					<label>Choose a customer &nbsp;</label>
					<select
						name="customers"
						className="form-select"
						placeholder="Pick customer">
						<option selected value="null" id="null">
							None
						</option>
						{customer.map((cust, i) => (
							<option
								key={i}
								onSelect={() => {
									setSelect(cust);
								}}>
								{cust.name}
							</option>
						))}
					</select>
				</div>
			</div>
			{basket.length > 1 ? (
				<StyleRoot>
					<table className="body__table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Item</th>
								<th scope="col">Quantity</th>
								<th scope="col">Price</th>
								<th scope="col">Amount</th>
							</tr>
						</thead>

						<tbody>
							{basket.map((item, index) => (
								<tr style={styles.bounceInLeft} key={index}>
									<td scope="col">{index}</td>
									<td scope="col">{item.Name}</td>
									<td scope="col">{item.Quantity}</td>
									<td scope="col">{item.Price}</td>
									<td scope="col">{item.Price}</td>
								</tr>
							))}
							<tr style={styles.bounceInLeft} className="mt-2">
								<td scope="col" colSpan="2">
									<b>Total</b>
								</td>
								<td scope="col">
									<b>{getBasketTotal(basket)}</b>
								</td>
								<td scope="col">
									<b>78</b>
								</td>

								<CurrencyFormat
									renderText={(value) => (
										<td scope="col">
											<strong>{value}</strong>
										</td>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={'text'}
									prefix={'₹ '}
								/>
							</tr>
						</tbody>
					</table>
				</StyleRoot>
			) : (
				<div className="image">
					<img className="image" src={BodyImage}></img>
					<h6>Search and list products here...</h6>
					<div className="updates">
						<pre className="mt-4 mb-10">✔ Login with google authentication</pre>
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
