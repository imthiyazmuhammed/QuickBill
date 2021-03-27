import { Link } from 'react-router-dom';
import React from 'react';
import './Product.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function Products() {
	return (
		<div className="Products">
			 <Link to="/AddProduct">
				<AddCircleIcon />
			</Link>
		</div>
	);
}

export default Products;
