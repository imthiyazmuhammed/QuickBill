import React, { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';
import './Header.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import db from './Firebase';

function Header() {
	const [inputItems, setInputItems] = useState([]);
	const [prods, setProds] = useState([]);
	const [singleProd, setSingleProd] = useState('');
	const [products, setProducts] = useState([]);
	useEffect(() => {
		fetch(
			db.collection('users').onSnapshot((snapshot) =>
				setProds(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						Name: doc.data().Name,
						Category: doc.data().Category,
						Price: doc.data().Price,
						Quantity: doc.data().Quantity,
					}))
				)
			)
		);
		console.log(prods);
	}, []);

	const {
		isOpen,
		getMenuProps,
		getInputProps,
		getComboboxProps,
		highlightedIndex,
		getItemProps,
	} = useCombobox({
		items: inputItems,
		onInputValueChange: ({ inputValue }) => {
			setInputItems(
				prods.filter((item) =>
					item.Name.toLowerCase().startsWith(inputValue.toLowerCase())
				)
			);
		},
	});
	return (
		<div className="Header">
			<Link to="/" style={{ textDecoration: 'none' }}>
				<h3 className="h3"> QuickBill</h3>
			</Link>

			<div className="header__search">
				<form class="form-control form-control1" {...getComboboxProps}>
					<input
						class="header__searchInput form-control"
						placeholder="Search"
						{...getInputProps()}></input>
					<div class="dropdown">
						<ul {...getMenuProps()} class="list">
							{isOpen &&
								inputItems.map((item, index) => (
									<span
										key={item.id}
										{...getItemProps({ item, index })}
										onClick={() => setSingleProd(item.Name)}>
										<li class="list-group-item list-group-item-light">
											<h6>{item.Name}</h6>
										</li>
									</span>
								))}
						</ul>
					</div>
				</form>
			</div>
		</div>
	);
}
export default Header;
/* useEffect(() => {
	db.collection('users').onSnapshot((snapshot) =>
		setProds(
			snapshot.docs
				.map((doc) => ({
					id: doc.id,
					Name: doc.data().Name,
					Category: doc.data().Category,
					Price: doc.data().Price,
					Quantity: doc.data().Quantity,
				}))
		)
	)

}, []); */

/* useEffect(() => {
	fetch('https://jsonplaceholder.typicode.com/users')
		.then((response) => response.json())
		.then((data) => setProds(data));
}, []); */
