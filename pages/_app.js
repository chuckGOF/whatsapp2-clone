import "../styles/globals.css";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";
import Login from "./login";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
	const [myUser, setMyUser] = useState(null)
	const [user, loading] = useAuthState(auth);

	// useEffect(() => {
	// 	onAuthStateChanged(auth, (usr) => {
	// 		if (usr) {
	// 			console.log(usr)
	// 			setMyUser(usr);
	// 		}
	// 	});
	// }, []);

	useEffect(() => {
		if (user) {
			const docRef = doc(db, "users", user.uid);
			setDoc(
				docRef,
				{
					email: user.email,
					lastSeen: serverTimestamp(),
					photoUrl: user.photoURL,
				},
				{ merge: true }
			);
		}
	}, [user]);

	// if (!myUser) return <Login />
	// if (loading) return <Loading />;
	if (!user) return <Login />;
	return <Component {...pageProps} />;
}

export default MyApp;
