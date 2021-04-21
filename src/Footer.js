import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
	return (
		<div className="footer">
			<Link to="/Customer">
				<AccountCircleIcon className="footer__icon" />
			</Link>
			<Link to="/Products">
				<ListIcon className="footer__icon" />
			</Link>
			<Link to="/Pdf">
				<GetAppIcon className="footer__icon" />
			</Link>
		</div>
	);
}

export default Footer;
