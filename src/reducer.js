export const initialState = {
	basket: [],
	user: null,
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

/* const reducer = (state, action) => {
	console.log(action);
	switch (action.type) 	{
		case 'addToBasket': {
			const itemIndex = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			);
			let newBasket = [...state.basket];
			console.log(itemIndex);

			if (itemIndex >= 0) {
				newBasket[itemIndex].Quantity += 1;
			} else {
				newBasket = [...state.basket, action.item];
			}
			localStorage.setItem('basket', JSON.stringify(newBasket));

			return {
				...state,
				basket: newBasket,
			};
		}

		case 'SET_USER':
			return {
				...state,
				user: action.user,
			};

		default:
			return state;
	}
}; */
const reducer = (state, action) => {
	switch (action.type) {
		case 'addToBasket': {
			const itemIndex = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			);
			let newBasket = [...state.basket];
			if (itemIndex >= 0) {
				newBasket[itemIndex].quantity += 1;
			} else {
				newBasket = [...state.basket, action.item];
			}
			localStorage.setItem('basket', JSON.stringify(newBasket));

			return {
				...state,
				basket: newBasket,
			};
		}
		case 'SET_USER':
			return {
				...state,
				user: action.user,
			};

		default:
			return state;
	}
};

export default reducer;
