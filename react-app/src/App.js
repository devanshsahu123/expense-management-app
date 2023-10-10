import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogSignLayOut from './components/LoginSignup/LogSignLayOut.js';
import LayOut from './components/LayOut.js';
import Transaction from './components/Transaction/Home.js';
import AddTransaction from './components/AddTransaction/AddTransaction.js';
import FilterTransaction from './components/FilterTransaction/FilterTransaction.js';

function App() {
  return (<>
      <BrowserRouter>
      <Routes>
        <Route path='/login-signup' element={<LogSignLayOut />} />
        <Route path='/' element={<LayOut/>}>
           <Route path='transaction' element={<Transaction/>}/>
           <Route path='add-transaction' element={<AddTransaction/>}/>
           <Route path='transaction-filter' element={<FilterTransaction/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;
