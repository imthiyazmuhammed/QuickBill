import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useStateValue } from './StateProvider';

function NavItem({ index, item, highlightedIndex }) {
	const [{ basket }, dispatch] = useStateValue([]);
	const addToBasket = () => {
		dispatch({
			type: 'addToBasket',
			item: {
				id: item.id,
				name: item.name,
				price: item.price,
				category: item.category,
				quantity: 1,
			},
		});
	};
	const plusQuantity = () => {
		dispatch({
			type: 'addToBasket',
			item: {
				id: item.id,
			},
		});
	};
	const minusQuantity = () => {
		dispatch({
			type: 'removeFromBasket',
			item: {
				id: item.id,
			},
		});
	};
	return (
		<div className="navItem">
			<li
				className="list__item"
				style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
				onClick={addToBasket}>
				<h6>{item.name}</h6>
				<span>
					<RemoveIcon onClick={minusQuantity} />

					<AddIcon onClick={plusQuantity} />
				</span>
			</li>
		</div>
	);
}

export default NavItem;
