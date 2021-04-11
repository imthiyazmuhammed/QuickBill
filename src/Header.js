import React, { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';
import './Header.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import db from './Firebase';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useStateValue } from './StateProvider';

function Header({}) {
	const [inputItems, setInputItems] = useState([]); //input value
	const [prods, setProds] = useState([]); //accessing from database
	const [singleProd, setSingleProd] = useState([]); //getting the clicked product
	const [{ basket }, dispatch] = useStateValue([]);

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
	}, []);
	useEffect(() => {
		addToBasket();
		//console.log(basket);
		return () => {};
	}, [singleProd]);
	//console.log(basket);
	const {
		isOpen,
		getMenuProps,
		getInputProps,
		getComboboxProps,
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
	const addToBasket = () => {
		dispatch({
			type: 'addToBasket',
			item: {
				Name: singleProd.Name,
				Price: singleProd.Price,
				Category: singleProd.Category,
				Quantity: singleProd.Quantity,
			},
		});
	};

	return (
		<div className="Header">
			<Link to="/" style={{ textDecoration: 'none' }}>
				<h3 className="h3">QuickBill</h3>
			</Link>

			<div className="header__search">
				<form class="form-control form-control1" {...getComboboxProps}>
					<input
						class="header__searchInput form-control"
						placeholder="Search Products"
						{...getInputProps()}
						href=""></input>
					<div class="dropdown">
						<ul {...getMenuProps()} class="list">
							{isOpen &&
								inputItems.map((item, index) => (
									<span
										{...getItemProps({ item, index })}
										onClick={() => {
											setSingleProd({
												Name: item.Name,
												Category: item.Category,
												Price: item.Price,
												Quantity: item.Quantity,
											});
										}}>
										<li
											class="list-group-item list-group-item-light"
											/* 	onClick={() => {
												const addToBasket = () => {
													dispatch({
														type: 'addToBasket',
														item: {
															Name: item.Name,
															Price: item.Price,
															Category: item.Category,
															Quantity: item.Quantity,
														},
													});
												};
												console.log(item.Name);
											}} */
										>
											<h6>{item.Name}</h6>

											<span>
												<RemoveIcon />

												<AddIcon />
											</span>
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
