import React, { useState } from 'react';
import './Nav.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './Firebase';
import { Drawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { motion } from 'framer-motion';

function Nav() {
	const [drawer, setDrawer] = useState(false);
	const history = useHistory();

	const handleLogout = () => {
		if (window.confirm('Do you really want to logOut')) auth.signOut();
	};

	return (
		<div className="container-fluid header">
			<div className="">
				<Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
					<div className="drawer">
						<div className="drawer__item" onClick={() => history.push('/')}>
							<HomeIcon />
							<h5>Home</h5>
						</div>
						<div
							className="drawer__item"
							onClick={() => history.push('/Products')}>
							<FormatListBulletedIcon />
							<h5>Products</h5>
						</div>
						<div
							className="drawer__item"
							onClick={() => history.push('/Customer')}>
							<PeopleIcon />
							<h5>Customers</h5>
						</div>
						<div className="drawer__item" onClick={handleLogout}>
							<ExitToAppIcon />
							<h5>Logout</h5>
						</div>
					</div>
				</Drawer>

				<MenuIcon
					style={{ fill: 'whitesmoke' }}
					className="menuIcon"
					onClick={() => setDrawer(!drawer)}
					fontSize="large"
				/>
				<Link to="/" style={{ textDecoration: 'none' }}>
					<h3 className="header__logo">QuickBill</h3>
				</Link>
			</div>
			<div className="info">
				<HelpOutlineIcon fontSize="large" style={{ fill: 'white' }} />
			</div>
		</div>
	);
}

export default Nav;
