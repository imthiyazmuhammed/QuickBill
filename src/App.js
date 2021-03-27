import './App.css';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import Products from './Products';
import Customer from './Customer';
import AddProduct from './AddProduct';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="App">
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
						<Header />
						<Body />
						<Footer />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
