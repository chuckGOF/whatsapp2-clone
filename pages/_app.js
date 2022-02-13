import '../styles/globals.css'
import {useEffect, useState} from 'react'
import {auth, db} from '../firebase'
import {onAuthStateChanged} from 'firebase/auth'
import Login from './login'
import {useAuthState} from 'react-firebase-hooks/auth'
import Loading from '../components/Loading'


function MyApp({ Component, pageProps }) {
  // const [myUser, setMyUser] = useState(null)
  const [user, loading] = useAuthState(auth)

  // useEffect(() => {
  //   onAuthStateChanged(auth, (usr) => {
  //     if (usr) {
  //       setMyUser(usr)
  //     }
  //   })
  // }, [])

  // if (!myUser) return <Login />
  if (true) return <Loading />
  if (!user) return <Login />
  return <Component {...pageProps} />
}

export default MyApp
