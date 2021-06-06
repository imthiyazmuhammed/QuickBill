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
				<AccountCircleIcon
					fontSize="large"
					style={{ fill: '#2d4e6b' }}
					className="footer__icon"
				/>
			</Link>
			<Link to="/Products">
				<ListIcon
					fontSize="large"
					style={{ fill: '#2d4e6b' }}
					className="footer__icon"
				/>
			</Link>
			<Link to="/Pdf">
				<GetAppIcon
					fontSize="large"
					style={{ fill: '#2d4e6b' }}
					className="footer__icon"
				/>
			</Link>
		</div>
	);
}

export default Footer;
