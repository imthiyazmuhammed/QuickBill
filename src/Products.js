import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './Product.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import db from './Firebase';
import { auth } from './Firebase';
import { Modal } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
function Products() {
	const [productName, setProductName] = useState('');
	const [productPrice, setProductPrice] = useState();
	const [productCategory, setProductCategory] = useState(null);
	const [productQuantity, setProductQuantity] = useState(null);
	const [products, setProducts] = useState([]);
	const id = auth.currentUser?.uid;
	const prd = db.collection('users').doc(id).collection('products');
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [error, setError] = useState('');
	const [doc, setDoc] = useState('');

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
			.doc(doc.Id)
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
				setProductPrice();
				setProductQuantity('');
				setProductCategory('');
				alert('Product edited');
			})
			.catch((err) => setError(err.message));
		console.log(error);
	};

	const onDelete = () => {
		if (window.confirm(`Are you sure to delete ${doc.Name}?`)) {
			prd.doc(doc.Id).delete();
			handleClose();
		}
	};

	return (
		<div className="container">
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
							placeholder={doc.Name}
							value={productName}
							required
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
								placeholder={doc.Price}
								value={productPrice}
								required
							/>
						</span>
						<br></br>
						<label className="form">category</label>
						<br></br>
						<input
							type="text"
							className="form-control"
							onChange={(e) => setProductCategory(e.target.value)}
							placeholder={doc.Category}
							value={productCategory}
							required
						/>
						<br></br>
						<label className="form">Quantity</label>
						<br></br>
						<input
							type="number"
							className="form-control"
							required
							onChange={(e) => setProductQuantity(e.target.value)}
							placeholder={doc.Quantity}
							value={productQuantity}
							required
						/>
						<br></br>
						<div className="text-center">
							<Modal.Footer class="mr-auto">
								<div className="modal__footer">
									<DeleteIcon
										style={{ fontSize: 'default' }}
										onClick={onDelete}
									/>
									<button className="btn btn-success" onClick={handleClose}>
										Edit
									</button>
								</div>
							</Modal.Footer>
						</div>
					</form>
				</Modal.Body>
			</Modal>

			<div className="products">
				<div className="products__add">
					<Link to="/AddProduct" style={{ textDecoration: 'none' }}>
						<h5 className="h5">
							<AddCircleIcon fontSize="default" />
							&nbsp; Add new product
						</h5>
					</Link>
					<p>{products.length} Products</p>
				</div>
				{products.length != 0 ? (
					<div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 m-1">
						{products.map((product) => (
							<div
								className="col mb-2 card p-0 border-secondary"
								key={product.Id}>
								<div className="card-body p-3">
									<div className="card-title product__header">
										<b>{product.Name}</b>
										<div className="editDelete">
											<a
												onClick={handleShow}
												style={{ textDecoration: 'none' }}
												className="card_text">
												<EditIcon
													className="m-1 editIcon"
													onClick={() => setDoc(product)}
													fontSize="default"
												/>
											</a>
											&nbsp;
										</div>
									</div>
									<p className="card__text m-1">
										Category : {product.Category}
									</p>
									<p className="card__text m-1">Price : ₹ {product.Price}</p>
									<p className="card__text m-1">Stock : {product.Quantity}</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<h5 class="ml-4">👆 please add your products show here !</h5>
				)}
			</div>
		</div>
	);
}

export default Products;
