import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';
import GetAppIcon from '@material-ui/icons/GetApp';
import './Footer.css';

function Footer() {
	return (
		<div className="Footer">
			<AccountCircleIcon className="Account" />
            <ListIcon className="Account" />
            <GetAppIcon className="Account"/>
		</div>
	);
}

export default Footer;
