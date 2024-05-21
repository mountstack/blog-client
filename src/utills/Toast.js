import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastMessageNotify() {
    // Type - [Success | Failure | Error | Warning]

    return ( 
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
            theme="colored" 
        /> 
    ) 
} 

export default ToastMessageNotify; 