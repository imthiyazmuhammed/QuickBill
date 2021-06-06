export const initialState = {
	basket: [],
	user: null,
};

export const getBasketTotal = (basket) =>
	basket?.reduce((amount, item) => item.Price + amount, 0);

console.log(getBasketTotal);
/* const reducer = (state, action) => {
	console.log(action);
	switch (action.type) {
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
		case 'addToBasket':
			return {
				...state,
				basket: [...state.basket, action.item],
			};

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
