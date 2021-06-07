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
	const [prods, setProds] = useState([
		{
			id: 1,
			name: 'DummyData1 add_product',
			price: 109.95,
			category: "men's clothing",
			quantity: 100,
		},
		{
			id: 2,
			name: 'DummyData2 add_product',
			price: 22.3,
			category: "men's clothing",
			quantity: 100,
		},
		{
			id: 3,
			name: 'DummyData3 add_product',
			price: 35.4,
			category: "men's clothing",
			quantity: 100,
		},
	]); //dumm data or data fetched from databse
	const id = auth.currentUser?.uid;
	const [drawer, setDrawer] = useState(false);
	const history = useHistory();
	const productData = db.collection('users').doc(id).collection('products');

	useEffect(() => {
		fetch(
			productData.onSnapshot((snapshot) => {
				if (snapshot.docs.length != 0) {
					setProds(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							name: doc.data().Name,
							category: doc.data().Category,
							price: doc.data().Price,
							quantity: doc.data().Quantity,
						}))
					);
				}
			})
		);
	}, [productData.doc]);

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
				<h3 className="header__logo">QB</h3>
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
