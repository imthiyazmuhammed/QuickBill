import React, { useEffect, useState } from 'react';
import './Body.css';
import { useStateValue } from './StateProvider';
import { bounceInLeft } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import BodyImage from './icons/body.svg';
function Body() {
	const [{ basket }, dispatch] = useStateValue();
	const [count, setCount] = useState();
	const styles = {
		bounceInLeft: {
			animation: 'x 1s',
			animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft'),
		},
	};

	useEffect(() => {
		setCount((count) => count + 1);
	}, [basket]);

	return (
		<div className="body">
			{basket.length > 1 ? (
				<StyleRoot>
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
								<tr style={styles.bounceInLeft}>
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
			) : (
				<div className="image">
					<img className="image" src={BodyImage}></img>
					<h4>Search and List your Products here...</h4>
				</div>
			)}
		</div>
	);
}

export default Body;
