import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
	return (
		<div className="Footer">
			<Link to="/Customer">
				<AccountCircleIcon className="Account" />
			</Link>
			<Link to="/Products">
				<ListIcon className="Account" />
			</Link>
			<GetAppIcon className="Account" />
		</div>
	);
}

export default Footer;
