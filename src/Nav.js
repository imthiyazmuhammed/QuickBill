import React, { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';
import './Nav.css';
import { Link, useHistory } from 'react-router-dom';
import db from './Firebase';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { auth, provider } from './Firebase';
import { useStateValue } from './StateProvider';
import { Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';

function Nav() {
	const [inputItems, setInputItems] = useState([]); //input value
	const [prods, setProds] = useState([]); //accessing from database
	const [singleProd, setSingleProd] = useState([]); //getting the clicked product
	const [{ basket }, dispatch] = useStateValue([]);
	const id = auth.currentUser?.uid;
	const [drawer, setDrawer] = useState(false);
	const history = useHistory();
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
		highlightedIndex,
		getToggleButtonProps,
	} = useCombobox({
		items: inputItems,
		onInputValueChange: ({ inputValue }) => {
			setInputItems(
				prods.filter((item) =>
					item.Name.toLowerCase().includes(inputValue.toLowerCase())
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
	const handleLogout = () => {
		if (window.confirm('Do you really want to logOut')) auth.signOut();
	};

	return (
		<div className="container-fluid header">
			<Drawer anchor="left" open={drawer} onClose={() => setDrawer(!drawer)}>
				<div className="drawer">
					<div className="drawer__item" onClick={() => history.push('/')}>
						<HomeIcon />
						<h5> Home</h5>
					</div>
					<div
						className="drawer__item"
						onClick={() => history.push('/Products')}>
						<FormatListBulletedIcon />
						<h5> Products</h5>
					</div>
					<div
						className="drawer__item"
						onClick={() => history.push('/Customer')}>
						<PeopleIcon />
						<h5> Customers</h5>
					</div>
					<div className="drawer__item" onClick={handleLogout}>
						<ExitToAppIcon />
						<h5> Logout</h5>
					</div>
				</div>
			</Drawer>

			<MenuIcon
				className="menuIcon"
				onClick={() => setDrawer(!drawer)}
				fontSize="large"
			/>
			<Link to="/" style={{ 'text-decoration': 'none' }}>
				<h3 className="h3">QuickBill</h3>
			</Link>

			<div className="header__search col">
				<form {...getComboboxProps()} className="form-group w-100">
					<input
						type="search"
						className="form-control searchInput"
						placeholder="Search Products"
						{...getInputProps()}
						href=""
					/>
					<div className="search__dropdown">
						<ul {...getMenuProps()} className="list-group">
							{isOpen &&
								inputItems.map((item, index) => (
									<li
										className="list__item"
										key={index}
										style={
											highlightedIndex === index
												? { backgroundColor: '#bde4ff' }
												: {}
										}
										{...getToggleButtonProps()}
										{...getItemProps({ item, index })}
										onClick={() => {
											setSingleProd({
												Name: item.Name,
												Category: item.Category,
												Price: item.Price,
												Quantity: item.Quantity,
											});
										}}>
										<h6>{item.Name}</h6>
										<span>
											<RemoveIcon />
											<AddIcon />
										</span>
									</li>
								))}
						</ul>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Nav;
