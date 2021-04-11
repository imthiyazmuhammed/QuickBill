import React, { useEffect, useState } from 'react';
import './Body.css';
import { useStateValue } from './StateProvider';
//import 'bootstrap/dist/css/bootstrap.min.css';
function Body() {
	const [{ basket }, dispatch] = useStateValue();
	const [count, setCount] = useState(-1);
	useEffect(() => {
		setCount((count) => count + 1);
	}, []);
	return (
		<div className="Body">
			<div className="customer">
				<h3>Development In Progress 👨🏽‍💻</h3>
			</div>
			<br></br>
			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">No.</th>
						<th scope="col">Item</th>
						<th scope="col">Quantity</th>
						<th scope="col">Price</th>
						<th scope="col">Category</th>
					</tr>
				</thead>

				<tbody>
					{basket.map((item) => (
						<tr>
							<td scope="col">{count}</td>
							<td scope="col">{item.Name}</td>
							<td scope="col">{item.Quantity}</td>
							<td scope="col">{item.Price}</td>
							<td scope="col">{item.Category}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Body;
