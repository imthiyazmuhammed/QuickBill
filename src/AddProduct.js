import React, { useState } from 'react';
import './AddProduct.css';
import db from './Firebase';

export const AddProduct = () => {
	const [productName, setProductName] = useState('');
	const [productPrice, setProductPrice] = useState(0);
	const [productCategory, setProductCategory] = useState(null);
	const [productQuantity, setProductQuantity] = useState(null);
	const [error, setError] = useState('');
	const addProduct = (e) => {
		e.preventDefault();
		//console.log(productName, productPrice, productCategory, productQuantity);
		db.collection('users')
			.add({
				Name: productName,
				Price: productPrice,
				Category: productCategory,
				Quantity: productQuantity,
			})
			.then(() => {
				setProductName('');
				setProductPrice(0);
				setProductQuantity('');
				setProductCategory('');
				setError('');
			})
			.catch((err) => setError(err.message));
	};
	return (
		<div classname="AddProduct">
			<br></br>
			<h4>Add Product</h4>
			<hr></hr>
			<form
				action=""
				autoComplete="off"
				classname="form-control"
				onSubmit={addProduct}>
				<br></br>
				<label className="form" htmlfor="product_name">
					Product Name
				</label>
				<br></br>
				<input
					type="text"
					className="form-control"
					required
					onChange={(e) => setProductName(e.target.value)}
					value={productName}
				/>
				<br></br>

				<label className="form" htmlfor="product_price">
					Product Price
				</label>
				<br></br>
				<input
					type="text"
					className="form-control"
					required
					onChange={(e) => setProductPrice(e.target.value)}
					value={productPrice}
				/>
				<br></br>
				<label className="form" htmlfor="product_category">
					category
				</label>
				<br></br>
				<input
					type="text"
					className="form-control"
					onChange={(e) => setProductCategory(e.target.value)}
					value={productCategory}
				/>
				<br></br>
				<label className="form" htmlfor="product_quantity">
					Quantity
				</label>
				<br></br>
				<input
					type="text"
					className="form-control"
					required
					onChange={(e) => setProductQuantity(e.target.value)}
					value={productQuantity}
				/>
				<br></br>
				<div className="text-center">
					<button className="btn btn-success btn-md ">Add</button>
				</div>
			</form>
			{error && <span>{error}</span>}
		</div>
	);
};

export default AddProduct;
