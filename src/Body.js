import React, { useEffect, useState } from 'react';
import './Body.css';
import { useStateValue } from './StateProvider';
import { bounceInLeft } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import BodyImage from './icons/body.svg';
import db, { auth } from './Firebase';
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
					{'  '}
					<select name="customers" placeholder="Pick customer">
						<option value="null" id="null">
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
					<table class="body__table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Item</th>
								<th scope="col">Quantity</th>
								<th scope="col">Price</th>
								<th scope="col">Category</th>
							</tr>
						</thead>

						<tbody>
							{basket.map((item, index) => (
								<tr style={styles.bounceInLeft} key={index}>
									<td scope="col">{index}</td>
									<td scope="col">{item.Name}</td>
									<td scope="col">{item.Quantity}</td>
									<td scope="col">{item.Price}</td>
									<td scope="col">{item.Category}</td>
								</tr>
							))}
						</tbody>
					</table>
				</StyleRoot>
			) : (
				<div className="image">
					<img className="image" src={BodyImage}></img>
					<h6>Search and list products here...</h6>
					<div className="updates">
						<pre class="mt-4">✔ Login with google authentication</pre>
						<pre>✔ CRUD functionality on products</pre>
						<pre>✔ Easy search of added products</pre>
						<pre>✔ Create PDF invoice with the listed items</pre>
						<pre>✔ Add and update store details </pre>
						<pre>✔ Customer database</pre>
						<pre class="mt-4">❌ Credit on customer</pre>
						<pre>❌ share generated invoice tothe customer</pre>
					</div>
				</div>
			)}
		</div>
	);
}

export default Body;
