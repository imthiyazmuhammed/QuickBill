import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './Product.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import db from './Firebase';
import { auth } from './Firebase';
import { Button, Modal } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
function Products() {
	const [productName, setProductName] = useState('');
	const [productPrice, setProductPrice] = useState(0);
	const [productCategory, setProductCategory] = useState(null);
	const [productQuantity, setProductQuantity] = useState(null);
	const [products, setProducts] = useState([]);
	const id = auth.currentUser?.uid;
	const prd = db.collection('users').doc(id).collection('products');
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [error, setError] = useState('');
	const [docId, setDocId] = useState('');
	console.log(docId);
	useEffect(() => {
		//run code when products component loads
		prd.onSnapshot((snapshot) =>
			setProducts(
				snapshot.docs.map((doc) => ({
					Id: doc.id,
					Name: doc.data().Name,
					Category: doc.data().Category,
					Price: doc.data().Price,
					Quantity: doc.data().Quantity,
				}))
			)
		);
	}, []);

	const onUpdate = (e) => {
		e.preventDefault();
		prd
			.doc(docId)
			.set(
				{
					Category: productCategory,
					Name: productName,
					Price: productPrice,
					Quantity: productQuantity,
				},
				{ merge: true }
			)
			.then(() => {
				setProductName('');
				setProductPrice(0);
				setProductQuantity();
				setProductCategory('');
				alert('Product edited succesfully');
			})
			.catch((err) => setError(err.message));
		console.log(error);
	};

	const onDelete = () => {
		if (window.confirm('Are you sure to delete this product?')) {
			prd.doc(docId).delete();
		}
	};
	return (
		<div className="products">
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Edit product</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form autoComplete="off" classname="form-control" onSubmit={onUpdate}>
						<br></br>
						<label className="form">Product Name</label>
						<br></br>
						<input
							type="text"
							className="form-control"
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
							<Modal.Footer>
								<button className="btn btn-success" onClick={handleClose}>
									Edit
								</button>
							</Modal.Footer>
						</div>
					</form>
				</Modal.Body>
			</Modal>
			<div className="products">
				<div className="products__add">
					<Link to="/AddProduct" style={{ 'text-decoration': 'none' }}>
						<h5>
							<AddCircleIcon fontSize="medium" />
							&nbsp; Add new product
						</h5>
					</Link>
				</div>
				<div className="products__list">
					<ul className="product__cards">
						{products.map((product) => (
							<li class="cards__item" key={product.Id}>
								<div class="card__content">
									<h5 class="card__title">
										{product.Name}
										<div className="editDelete">
											<a
												onClick={handleShow}
												style={{ textDecoration: 'none' }}
												class="card_text">
												<EditIcon
													onClick={() => setDocId(product.Id)}
													style={{ fontSize: 'default' }}
												/>
											</a>
											&nbsp;&nbsp;
											<a
												onClick={() => setDocId(product.Id)}
												style={{ 'text-decoration': 'none' }}
												class="card_text">
												<DeleteIcon
													onClick={onDelete}
													style={{ fontSize: 'default' }}
												/>
											</a>
										</div>
									</h5>
									<h6 class="card__text">Category : {product.Category}</h6>
									<h6 class="card__text">Price : ₹ {product.Price}</h6>
									<h6 class="card__text">Quantity : {product.Quantity}</h6>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Products;
