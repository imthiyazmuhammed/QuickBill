import React, { useEffect, useState } from 'react';
import { useCombobox } from 'downshift';
import db from './Firebase';
import NavItem from './NavItem';
import { auth } from './Firebase';

function SearchBar() {
	const [inputItems, setInputItems] = useState([]); //input value
	const id = auth.currentUser?.uid;
	const [prods, setProds] = useState([
		{
			id: 1,
			name: 'DummyData1 add_product',
			price: 109.95,
			category: 'abcdefghijklmnopqrstuvwxyz',
			quantity: 100,
		},
		{
			id: 2,
			name: 'DummyData2 add_product',
			price: 22.3,
			category: 'abcdefghijklmnopqrstuvwxyz',
			quantity: 100,
		},
		{
			id: 3,
			name: 'DummyData3 add_product',
			price: 35.4,
			category: 'abcdefghijklmnopqrstuvwxyz',
			quantity: 100,
		},
	]); //dumm data or data fetched from databse
	const productData = db.collection('users').doc(id).collection('products');
	useEffect(() => {
		fetch(
			productData.onSnapshot((snapshot) => {
				if (snapshot.docs.length != 0) {
					setProds(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							name: doc.data().Name,
							category: doc.data().Category,
							price: doc.data().Price,
							quantity: doc.data().Quantity,
						}))
					);
				}
			})
		);
	}, [productData.doc]);

	const { isOpen, getMenuProps, getInputProps, getComboboxProps } = useCombobox(
		{
			items: inputItems,
			onInputValueChange: ({ inputValue }) => {
				setInputItems(
					prods.filter(
						(item) =>
							item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
							item.category.toLowerCase().includes(inputValue.toLowerCase())
					)
				);
			},
		}
	);

	return (
		<div className="header__search col">
			<form {...getComboboxProps()} className="form-group w-100">
				<input
					type="search"
					className="form-control searchInput"
					placeholder="Search Products"
					{...getInputProps()}
					href=""
				/>
				<div className="search__dropdown">
					<ul {...getMenuProps()} className="list-group">
						{isOpen &&
							inputItems.map((item, index) => {
								return <NavItem key={index} item={item} highlightedIndex />;
							})}
					</ul>
				</div>
			</form>
		</div>
	);
}

export default SearchBar;
