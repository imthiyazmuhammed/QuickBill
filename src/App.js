import React from 'react';
import './App.css';
import Nav from './Nav';
import Footer from './Footer';
import Body from './Body';
import Products from './Products';
import Customer from './Customer';
import Pdf from './Pdf';
import AddProduct from './AddProduct';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
	const [{ user }, dispatch] = useStateValue();

	return (
		<Router>
			<div className="App">
				{!user ? (
					<Login />
				) : (
					<>
						<Switch>
							<Route path="/Products">
								<Nav />
								<Products />
							</Route>
							<Route path="/AddProduct">
								<Nav />
								<AddProduct />
							</Route>
							<Route path="/customer">
								<Nav />
								<Customer />
							</Route>

							<Route path="/Pdf">
								<Nav />
								<Pdf />
							</Route>
							<Route path="/">
								<Nav />
								<Body />
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
