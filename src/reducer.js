export const initialState = {
	basket: [],
	user: 'null',
	
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
	/* 	case 'productId':
			return {
				docId: action.docId,
			}; */
		default:
			return state;
	}
};

export default reducer;
