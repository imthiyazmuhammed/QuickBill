export const initialState = {
	basket: [],
	user: null,
};

export const actionTypes = {
	SET_USER: 'SET_USER',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'addToBasket':
			return {
				...state,
				basket: [...state.basket, action.item],
			};

		case actionTypes.SET_USER:
			return {
				...state,
				user: action.user,
			};
		default:
			return state;
	}
};

export default reducer;
