import React, { useEffect, useState } from 'react';
import './Pdf.css';
import { useStateValue } from './StateProvider';
import PdfGenerator from './pdfGenerator';

const Items = () => {
	const [{ basket }, dispatch] = useStateValue();
	const [count, setCount] = useState();
	useEffect(() => {
		setCount((count) => count + 1);
	}, [basket]);

	return (
		<div className="pdf">
			<button className="btn btn-primary" onClick={() => PdfGenerator(basket)}>
				Generate Bill
			</button>
			<table class="body__table table-striped">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Item</th>
						<th scope="col">Quantity</th>
						<th scope="col">Price</th>
						<th scope="col">Category</th>
					</tr>
				</thead>

				<tbody>
					{basket.map((item, count) => (
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
};

export default Items;
