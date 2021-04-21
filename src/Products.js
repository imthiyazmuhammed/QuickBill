import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './Product.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import db from './Firebase';
import { auth } from './Firebase';

function Products() {
	const [products, setProducts] = useState([]);
	const id = auth.currentUser?.uid;
	useEffect(() => {
		//run code when products component loads
		db.collection('users')
			.doc(id)
			.collection('products')
			.onSnapshot((snapshot) =>
				setProducts(
					snapshot.docs.map((doc) => ({
						Name: doc.data().Name,
						Category: doc.data().Category,
						Price: doc.data().Price,
						Quantity: doc.data().Quantity,
					}))
				)
			);
	}, []);
	return (
		<div className="products">
			<div className="products__add">
				<Link to="/AddProduct">
					<h5 style={{ 'text-decoration': 'none' }}>
						<AddCircleIcon fontSize="medium" />
						&nbsp; Add new product
					</h5>
				</Link>
			</div>
			<div className="products__list">
				<ul className="product__cards">
					{products.map((products) => (
						<li class="cards__item">
							<div class="card__content">
								<h5 class="card__title">{products.Name}</h5>
								<h6 class="card__text">Category : {products.Category}</h6>
								<h6 class="card__text">Price : ₹ {products.Price}</h6>
								<h6 class="card__text">Quantity : {products.Quantity}</h6>
								{/* <a href="#" class="card_text">
										⛔
									</a> */}
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Products;
