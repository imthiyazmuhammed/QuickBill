import React, { useEffect, useState } from 'react';
import './Body.css';
import { useStateValue } from './StateProvider';
import { bounce } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
function Body() {
	const [{ basket }, dispatch] = useStateValue();
	const [count, setCount] = useState();
	const styles = {
		bounce: {
			animation: 'x 1s',
			animationName: Radium.keyframes(bounce, 'bounce'),
		},
	};

	useEffect(() => {
		setCount((count) => count + 1);
	}, [basket]);

	return (
		<div className="body">
			<StyleRoot>
				<table class="body__table table-striped">
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
							<tr style={styles.bounce}>
								<td scope="col">{count}</td>
								<td scope="col">{item.Name}</td>
								<td scope="col">{item.Quantity}</td>
								<td scope="col">{item.Price}</td>
								<td scope="col">{item.Category}</td>
							</tr>
						))}
					</tbody>
				</table>
			</StyleRoot>
		</div>
	);
}

export default Body;
