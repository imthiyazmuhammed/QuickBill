import React, { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';
import './Nav.css';
import { Link, useHistory } from 'react-router-dom';
import db from './Firebase';
import { auth } from './Firebase';
import { Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import NavItem from './NavItem';

function Nav() {
	const [inputItems, setInputItems] = useState([]); //input value
	const [prods, setProds] = useState([]); //accessing from database
	const [singleProd, setSingleProd] = useState([]); //getting the clicked product
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
							id: doc.id,
							name: doc.data().Name,
							category: doc.data().Category,
							price: doc.data().Price,
							quantity: doc.data().Quantity,
						}))
					)
				)
		);
	}, []);

	const { isOpen, getMenuProps, getInputProps, getComboboxProps } = useCombobox(
		{
			items: inputItems,
			onInputValueChange: ({ inputValue }) => {
				setInputItems(
					prods.filter((item) =>
						item.name.toLowerCase().includes(inputValue.toLowerCase())
					)
				);
			},
		}
	);

	const handleLogout = () => {
		if (window.confirm('Do you really want to logOut')) auth.signOut();
	};

	return (
		<div className="container-fluid header">
			<Drawer anchor="left" open={drawer} onClick={() => setDrawer(!drawer)}>
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
				style={{ fill: 'whitesmoke' }}
				className="menuIcon"
				onClick={() => setDrawer(!drawer)}
				fontSize="large"
			/>
			<Link to="/" style={{ 'text-decoration': 'none' }}>
				<h3 className="h3 ml-5">QuickBill</h3>
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
								inputItems.map((item, index) => {
									return <NavItem key={index} item={item} highlightedIndex />;
								})}
						</ul>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Nav;
