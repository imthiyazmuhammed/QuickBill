import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useStateValue } from './StateProvider';
import Truncate from 'react-truncate';

function NavItem({ item }) {
	const [{ basket }, dispatch] = useStateValue([]);
	const [counter, setCounter] = useState(1);
	const addToBasket = () => {
		dispatch({
			type: 'addToBasket',
			item: {
				id: item.id,
				name: item.name,
				price: item.price,
				category: item.category,
				quantity: counter,
			},
		});
	};
	const plusQuantity = () => {
		setCounter(counter + 1);
	};
	const minusQuantity = () => {
		setCounter(counter - 1);
	};
	return (
		<div className="navItem">
			<li className="navItem_list">
				<div className="navItem__left" onClick={addToBasket}>
					<Truncate lines={1} width={150} ellipsis={<span>...</span>}>
						<h6>{item.name}</h6>
					</Truncate>
				</div>
				<div className="navItem__right">
					<div className="navItem__listQty">
						<strong>₹{item.price}</strong>
					</div>
					<div className="navItem__listQty">
						<span>
							<RemoveIcon onClick={minusQuantity} />
							{counter}
							<AddIcon onClick={plusQuantity} />
						</span>
					</div>
				</div>
			</li>
		</div>
	);
}

export default NavItem;
