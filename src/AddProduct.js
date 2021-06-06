import React, { useState } from 'react';
import './AddProduct.css';
import db from './Firebase';
import { auth } from './Firebase';

export const AddProduct = () => {
	const [productName, setProductName] = useState('');
	const [productPrice, setProductPrice] = useState(0);
	const [productCategory, setProductCategory] = useState(null);
	const [productQuantity, setProductQuantity] = useState(null);
	const [error, setError] = useState('');
	const id = auth.currentUser?.uid;

	const addProduct = (e) => {
		e.preventDefault();
		db.collection('users')
			.doc(id)
			.collection('products')
			.add({
				Name: productName,
				Price: productPrice,
				Category: productCategory,
				Quantity: productQuantity,
			})
			.then(() => {
				setProductName('');
				setProductPrice();
				setProductQuantity();
				setProductCategory('');
				setError('');
				alert('Product added succesfully');
			})
			.catch((err) => setError(err.message));
	};
	return (
		<div classname="AddProduct">
			<br></br>
			<h4>Add Product</h4>
			<hr></hr>
			<form autoComplete="off" classname="form-control" onSubmit={addProduct}>
				<br></br>
				<label className="form">Product Name</label>
				<br></br>
				<input
					type="text"
					className="form-control"
					required
					onChange={(e) => setProductName(e.target.value)}
					value={productName}
				/>
				<br></br>
				<label className="form">Product Price</label>
				<br></br>
				<span className="rupee">
					<h5>₹</h5>
					<input
						type="number"
						className="form-control"
						required
						onChange={(e) => setProductPrice(e.target.value)}
						value={productPrice}
					/>
				</span>
				<br></br>
				<label className="form">category</label>
				<br></br>
				<input
					type="text"
					className="form-control"
					onChange={(e) => setProductCategory(e.target.value)}
					value={productCategory}
				/>
				<br></br>
				<label className="form">Quantity</label>
				<br></br>
				<input
					type="number"
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
