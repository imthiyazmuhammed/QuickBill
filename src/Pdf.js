import React, { useEffect, useState } from 'react';
import Pdf from 'react-to-pdf';
import './Pdf.css';
import { useStateValue } from './StateProvider';

function Pdf1() {
	const ref = React.createRef();
	const [{ basket }, dispatch] = useStateValue();
	const [count, setCount] = useState();
	const options = {
		orientation: 'p',
		unit: 'px',
		hotFixes: ['px_scaling'],
	};
	useEffect(() => {
		setCount((count) => count + 1);
	}, [basket]);
	return (
		<div className="pdf">
			<Pdf
				targetRef={ref}
				filename="Invoice.pdf"
				style={(options, (options.hotfixes = ['px_scaling']))}>
				{({ toPdf }) => (
					<button class="btn btn-primary" onClick={toPdf}>
						Create Invoice
					</button>
				)}
			</Pdf>
			<div className="pdf__ref" style={options} ref={ref}>
				<h3>QuickBill</h3>
				<div className="pdf__bill">
					<ul>
						<h>
							<b>Seller : </b>
						</h>
						<li>LBS model Degree College</li>
						<li>NCC Road parappanagadi</li>
						<li>673301</li>
						<li>+91 80898 66696</li>
					</ul>
					<ul>
						<h>
							<b>Customer : </b>
						</h>
						<li>dr rameshan p</li>
						<li>principal ,lbs</li>
						<li>parappanangadi</li>
						<li>+91 9895 364892</li>
					</ul>
				</div>
				<table class="pdf__table table-dotted">
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
						{basket.map((item, count) => (
							<tr>
								<td>{count}</td>
								<td>{item.Name}</td>
								<td>{item.Quantity}</td>
								<td>{item.Price}</td>
								<td>{item.Category}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Pdf1;
