import React, { useState } from 'react';
import './Body.css';
import { useStateValue } from './StateProvider';
//import 'bootstrap/dist/css/bootstrap.min.css';
function Body({ data }) {
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
					<tr>
						<td scope="col">{1}</td>
						<td scope="col">{data.Name}</td>
						<td scope="col">{data.Quantity}</td>
						<td scope="col">{data.Price}</td>
						<td scope="col">{data.Category}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default Body;
