import React from 'react';
import './Pdf.css';
import { useStateValue } from './StateProvider';
import PdfGenerator from './pdfGenerator';
import CurrencyFormat from 'react-currency-format';

const Items = () => {
	const [{ basket, customer, shop }, dispatch] = useStateValue([]);
	return (
		<div className="pdf">
			<button
				className="btn btn-primary"
				onClick={() => PdfGenerator(basket, customer, shop)}>
				Generate Bill
			</button>
			<table class="body__table table-striped" style={{ overflowX: 'scroll' }}>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Item</th>
						<th scope="col">Price</th>
						<th scope="col">Quantity</th>
						<th scope="col">Amount</th>
					</tr>
				</thead>

				<tbody>
					{basket.map((item, index) => (
						<tr>
							<td scope="col">{index + 1}</td>
							<td scope="col">{item.name}</td>
							<CurrencyFormat
								renderText={(value) => <td scope="col">{value}</td>}
								decimalScale={2}
								value={item.price}
								displayType={'text'}
								thousandSeperator={true}
								prefix={'₹'}
							/>
							<td scope="col">{item.quantity}</td>
							<CurrencyFormat
								renderText={(value) => <td scope="col">{value}</td>}
								decimalScale={2}
								value={item.price * item.quantity}
								displayType={'text'}
								thousandSeperator={true}
								prefix={'₹'}
							/>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Items;
