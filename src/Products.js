import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './Product.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import db from './Firebase';

function Products() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		//run code when products component loads
		db.collection('users').onSnapshot((snapshot) =>
			setProducts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					Name: doc.data().Name,
					Category: doc.data().Category,
					Price: doc.data().Price,
					Quantity: doc.data().Quantity,
				}))
			)
		);
	}, []);
	return (
		<div className="Products">
			<div className="add">
				<Link to="/AddProduct" style={{ textDecoration: 'none' }}>
					<span class="Product">
						<h5>
							<AddCircleIcon fontSize="medium" />
							&nbsp; Add new product
						</h5>
					</span>
				</Link>
			</div>
			<div class="main">
				<ul class="cards">
					{products.map((products) => (
						<li class="cards_item">
							<div class="card ">
								<div class="card_content">
									<h5 class="card_title">{products.Name}</h5>
									<h6 class="card_text">Category : {products.Category}</h6>
									<h6 class="card_text">Price : ₹ {products.Price}</h6>
									<h6 class="card_text">Quantity : {products.Quantity}</h6>
									{/* <a href="#" class="card_text">
										⛔
									</a> */}
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Products;
