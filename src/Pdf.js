import { CenterFocusStrong } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Pdf from 'react-to-pdf';
import Body from './Body';
import './Pdf.css';
import { useStateValue } from './StateProvider';

function Pdf1() {
	const ref = React.createRef();
	const [{ basket }, dispatch] = useStateValue();
	const [count, setCount] = useState();
	const options = {
		orientation: 'portrait',
		unit: 'cm',
		format: 'a4',
		floatPrecision: 16,
		width: 750,
	};
	useEffect(() => {
		setCount((count) => count + 1);
	}, [basket]);
	return (
		<div className="Pdf1">
			<Pdf
				targetRef={ref}
				filename="Invoice.pdf"
				options={options}
				x={0.4}
				style={{}}>
				{({ toPdf }) => (
					<button class="btn btn-primary" onClick={toPdf}>
						Create Invoice
					</button>
				)}
			</Pdf>
			<div className="ref" style={{ width: 770 }} ref={ref}>
				<div className="bill">
					<ul>
					<h>Seller : </h>
						<li>LBS model Degree College</li>
						<li>NCC Road parappanagadi</li>
						<li>673301</li>
						<li>+91 80898 66696</li>
					</ul>
					<ul>
					<h>Customer : </h>
						<li>dr rameshan p</li>
						<li>principal ,lbs</li>
						<li>parappanangadi</li>
						<li>+91 9895 364892</li>
					</ul>
				</div>
				<table class="table table-dotted">
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
		</div>
	);
}

export default Pdf1;
