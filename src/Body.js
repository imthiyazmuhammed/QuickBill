import React from 'react';
import './Body.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

function Body() {
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
						<th scope="col">total</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
						<td>@fat</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Larry</td>
						<td>the Bird</td>
						<td>@twitter</td>
						<td>@twitter</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default Body;
