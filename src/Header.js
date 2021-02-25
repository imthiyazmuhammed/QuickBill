import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './Header.css';
function Header() {
	return (
		<div className="Header">
			<h1>💸 QuickBill</h1>
			<div className="header__search">
				<input className="header__searchinput" type="text" />
				<SearchIcon className="header__searchicon" />
			</div>
		</div>
	);
}

export default Header;
