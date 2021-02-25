import React from 'react';
import './Body.css';

function Body() {
	return (
		<div className="Body">
			<div className="customer">
				<span>
					<h4>Bill to : </h4>
					<h3>Mubashir</h3>
				</span>
				<span>
					<h4>Credit : </h4>
					<h3>2906/-</h3>
				</span>
			</div>
			<br></br>
			<table>
				<tr>
					<th>No.</th>
					<th>Name</th>
					<th>Qty.</th>
					<th>Rate</th>
					<th>Amt.</th>
				</tr>
				<tr>
					<td>01</td> <td>Goodday</td> <td>22</td> <td>20</td> <td>440</td>
				</tr>
				<tr>
					<td>02</td> <td>50x50</td> <td>20</td> <td>25</td> <td>500</td>
				</tr>
				<tr>
					<td>03</td> <td>20x20</td> <td>27</td> <td>20</td> <td>540</td>
				</tr>
				<tr>
					<td>04</td> <td>Arrowroot</td> <td>23</td> <td>25</td> <td>575</td>
				</tr>
				<tr>
					<td>05</td> <td>crackjack</td> <td>22</td> <td>20</td> <td>440</td>
				</tr>
				<tr>
					<td>06</td> <td>cuttee</td> <td>22</td> <td>17</td> <td>374</td>
				</tr>
				<br></br>
				<tr>
					<th colspan="2">total Quantity : 8</th>

					<th colspan="3">Amount : 15000/-</th>
				</tr>
			</table>
		</div>
	);
}

export default Body;
