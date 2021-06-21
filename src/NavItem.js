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
			type: 'ADD_TO_BASKET',
			item: {
				id: item.id,
				name: item.name,
				price: item.price,
				category: item.category,
				quantity: counter,
			},
		});
		setCounter(1);
	};
	const plusQuantity = () => {
		setCounter(counter + 1);
	};
	const minusQuantity = () => {
		setCounter(counter - 1);
	};
	return (
		<div className="navItem">
			<div className="navItem__left" onClick={addToBasket}>
				<Truncate lines={1} width={150} ellipsis={<span>...</span>}>
					<h6>{item.name}</h6>
				</Truncate>
				<div className="navItem__listQty">
					<strong>₹{item.price}</strong>
				</div>
			</div>
			<div className="navItem__right">
				<div className="navItem__listQty">
					<span>
						{counter > 1 && <RemoveIcon onClick={minusQuantity} />}
						{counter}
						<AddIcon onClick={plusQuantity} />
					</span>
				</div>
			</div>
		</div>
	);
}

export default NavItem;
