import jsPDF from 'jspdf';
import 'jspdf-autotable';

// define a generatePDF function that accepts an argument
const PdfGenerator = (items) => {
	// initialize jsPDF
	const doc = new jsPDF();
	// define the columns we want and their titles
	const tableColumn = ['#', 'Item', 'Price', 'Quantity', 'Category'];
	// define an empty array of rows
	const tableRows = [];
	// for each items pass all its data into an array

	items.forEach((item) => {
		const itemData = ['#', item.Name, item.Price, item.Quantity, item.Category];
		// push each item info into a row
		tableRows.push(itemData);
	});

	// startY is basically margin-top
	doc.autoTable(tableColumn, tableRows, { startY: 80 });
	const date = Date().split(' ');
	// we use a date string to generate our filename.
	const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
	// ticket title. and margin-top + margin-left
	doc.text('Quickbill', 100, 10, 'center');
	doc.text('Bill from :', 150, 30);
	doc.text('LBS super market', 150, 40);
	doc.text('parappanagadi', 150, 50);
	doc.text('673301', 150, 60);
	doc.text('Bill to :', 15, 30);
	doc.text('Sir Rameshan p', 15, 40);
	doc.text('9895264519', 15, 50);
	// we define the name of our PDF file.
	doc.save(`QB_${dateStr}.pdf`);
};

export default PdfGenerator;
