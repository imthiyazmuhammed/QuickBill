import { Link } from 'react-router-dom';
import React from 'react';
import './Product.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function Products() {
	return (
		<div className="Products">
			<Link className="Products" to="/AddProduct">
				<AddCircleIcon fontSize="large"/>
				<h5>Add new product</h5>
			</Link>
		</div>
	);
}

export default Products;
