import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { auth } from './Firebase';
import db from './Firebase';
const id = auth.currentUser?.uid;
const prd = db.collection('users').doc(id).collection('products');

/* useEffect(() => {
	//run code when products component loads
	prd.onSnapshot((snapshot) =>
		setProducts(
			snapshot.docs.map((doc) => ({
				Id: doc.id,
				Name: doc.data().Name,
				Category: doc.data().Category,
				Price: doc.data().Price,
				Quantity: doc.data().Quantity,
			}))
		)
	);
}, []); */
// define a generatePDF function that accepts an argument
const PdfGenerator = (items, customer, shop) => {
	// initialize jsPDF
	const doc = new jsPDF();
	// define the columns we want and their titles
	const tableColumn = ['#', 'Item', 'Price', 'Quantity', 'Category'];
	// define an empty array of rows
	const tableRows = [];
	// for each items pass all its data into an array
	items.forEach((item, index) => {
		const itemData = [
			index + 1,
			item.name,
			item.price,
			item.quantity,
			item.category,
		];
		// push each item info into a row
		tableRows.push(itemData);
	});
	// startY is basically margin-top
	doc.autoTable(tableColumn, tableRows, { startY: 80 });
	const date = Date().split(' ');
	// we use a date string to generate our filename.
	const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
	// ticket title. and margin-top + margin-left
	// doc.text('QuickBill', 100, 10, 'center');
	doc.text('Bill from :', 150, 30);
	doc.text(shop.name, 150, 40);
	doc.text(shop.address, 150, 50);
	doc.text(shop.pincode, 150, 60);
	doc.text(shop.phone, 150, 70);
	doc.text('Bill to :', 15, 30);
	doc.text(customer.label, 15, 40);
	doc.text(customer.id, 15, 50);
	// we define the name of our PDF file.
	doc.save(`QB_${dateStr}.pdf`);
};

export default PdfGenerator;
