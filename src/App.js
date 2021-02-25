import './App.css';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import Products from './Products';
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
					<Route path="/customer">
						<Header />
						<Products />
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
