import React, { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';
import './Header.css';
import { Link } from 'react-router-dom';
import db from './Firebase';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { auth } from './Firebase';
import { useStateValue } from './StateProvider';

function Header() {
	const [inputItems, setInputItems] = useState([]); //input value
	const [prods, setProds] = useState([]); //accessing from database
	const [singleProd, setSingleProd] = useState([]); //getting the clicked product
	const [{ basket }, dispatch] = useStateValue([]);
	const id = auth.currentUser?.uid;
	const [open, setOpen] = useState(false);

	useEffect(() => {
		fetch(
			db
				.collection('users')
				.doc(id)
				.collection('products')
				.onSnapshot((snapshot) =>
					setProds(
						snapshot.docs.map((doc) => ({
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
	}, [singleProd]);
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
		<div className="header">
			<div className="header__logo">
				<Link to="/" style={{ 'text-decoration': 'none' }}>
					<h3>QuickBill</h3>
				</Link>
			</div>
			<div className="header__search">
				<form {...getComboboxProps()}>
					<input
						class="form-control container-fluid header__searchInput"
						placeholder="Search Products"
						onClick={() => setOpen(!open)}
						{...getInputProps()}
					/>
					{open && (
						<div className="header__dropdown">
							<ul {...getMenuProps()} class="header__searchlist">
								{inputItems.map((item, index) => (
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
										<li className="list_group_item">
											<h6>{item.Name}</h6>&nbsp;&nbsp;&nbsp;
											<span>
												<RemoveIcon />
												<AddIcon />
											</span>
										</li>
									</span>
								))}
							</ul>
						</div>
					)}
				</form>
			</div>
		</div>
	);
}

export default Header;
