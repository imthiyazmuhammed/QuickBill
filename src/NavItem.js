import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useStateValue } from './StateProvider';

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
			<li className="list__item">
				<h6 onClick={addToBasket}>{item.name}</h6>
				<span>
					<RemoveIcon onClick={minusQuantity} />
					{counter}
					<AddIcon onClick={plusQuantity} />
				</span>
			</li>
		</div>
	);
}

export default NavItem;
