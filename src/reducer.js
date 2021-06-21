export const initialState = {
	basket: [],
	user: null,
	customer: null,
};
export const getBasketTotal = (basket) =>
	basket?.reduce(
		(amount, item) =>
			parseFloat(item.price) * parseFloat(item.quantity) + parseFloat(amount),
		0
	);

export const getQuantityTotal = (basket) =>
	basket?.reduce(
		(quantity, item) => parseFloat(item.quantity) + parseFloat(quantity),
		0
	);

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_BASKET': {
			const itemIndex = state.basket.findIndex(
				(basketItem) => basketItem.id === action.item.id
			);
			let newBasket = [...state.basket];
			if (itemIndex >= 0) {
				newBasket[itemIndex].quantity += action.item.quantity;
			} else {
				newBasket = [...state.basket, action.item];
			}
			localStorage.setItem('basket', JSON.stringify(newBasket));

			return {
				...state,
				basket: newBasket,
			};
		}
		case 'REMOVE_FROM_BASKET': {
			const itemIndex = state.basket.findIndex(
				(basketItem) => basketItem.id === action.item.id
			);
			let newBasket = [...state.basket];
			if (itemIndex >= 0) {
				newBasket.splice(itemIndex, 1);
			} else {
				console.warn('item not found');
			}
			localStorage.setItem('basket', JSON.stringify(newBasket));
			// console.log(JSON.stringify(newBasket));
			return {
				...state,
				basket: newBasket,
			};
		}
		case 'SET_CUSTOMER': {
			return {
				...state,
				customer: action.customer,
			};
		}
		case 'SET_USER':
			return {
				...state,
				user: action.user,
			};
		case 'SET_SHOP':
			return {
				...state,
				shop: action.shopData,
			};
		default:
			return state;
	}
};

export default reducer;
