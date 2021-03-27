import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebsae/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAir0lXFbr_KaWz-4FtpONc4sZ2_4KwWU4',
	authDomain: 'quickbilll.firebaseapp.com',
	databaseURL: 'https://quickbilll-default-rtdb.firebaseio.com',
	projectId: 'quickbilll',
	storageBucket: 'quickbilll.appspot.com',
	messagingSenderId: '418200082304',
	appId: '1:418200082304:web:d7c4186b10f8192ebc9365',
	measurementId: 'G-NR91MX4P9V',
};

firebase.initializeApp(firebaseConfig);

const db = firebaseConfig.firestore();
export default db;
