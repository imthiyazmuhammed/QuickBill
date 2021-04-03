import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import Products from './Products';
import Customer from './Customer';
import AddProduct from './AddProduct';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
	const [{ user }, dispatch] = useStateValue();
	const [data, setData] = useState([]);//calling data from header to body
	return (
		<Router>
			<div className="App">
				{!user ? (
					<Login />
				) : (
					<>
						<Switch>
							<Route path="/Products">
								<Header />
								<Products />
							</Route>
							<Route path="/AddProduct">
								<Header />
								<AddProduct />
							</Route>
							<Route path="/customer">
								<Header />
								<Customer />
							</Route>
							<Route path="/">
								<Header setData={setData} />
								<Body data={data} />
								<Footer />
							</Route>
						</Switch>
					</>
				)}
			</div>
		</Router>
	);
}

export default App;
