import '@/styles/globals.css'
import {Provider } from 'react-redux'
import store from '../store/store'
import  {ToastContainer}  from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css"

export default function App({ Component, pageProps }) {
  return( 
      <>
      <Provider store={store} >
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
       />
        <Component {...pageProps} />
      </Provider>
      </>)
}