import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './Header.css';
import { Link } from 'react-router-dom';
function Header() {
	return (
		<div className="Header">
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container-fluid">
					<Link to="/">
						<h3>💸 QuickBill</h3>
					</Link>

					<form class="d-flex">
						<input
							class="form-control me-2" 
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button class="btn btn-outline-success" type="submit">
							Search
						</button>
					</form>
				</div>
			</nav>
		</div>
	);
}

export default Header;
