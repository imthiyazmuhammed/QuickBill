import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './Header.css';
import { Link } from 'react-router-dom';
function Header() {
	return (
		<div className="Header">
			<Link to="/">
				<h3>💸 QuickBill</h3>
			</Link>
			<div className="header__search">
				<input className="header__searchinput" type="text" />
				<SearchIcon className="header__searchicon" />
			</div>
		</div>
	);
}

export default Header;
