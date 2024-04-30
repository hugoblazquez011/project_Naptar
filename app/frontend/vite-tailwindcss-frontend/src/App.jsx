import React from 'react'
import styles from './style';

import { BrowserRouter as Router,Route,Routes, Link } from 'react-router-dom';



import {Home, WhyNaptar,Blog,TryOut,RegisterSide,Naptar,ForgotPswd} from './components/index';
// import {Home, WhyNaptar,Blog,TryOut} from './components/index';
// import RegisterSide from './components/index';




export const App = () => 
   (
    
    <Router>
      <Routes>
        <Route path = '/' element= {<Home></Home>}></Route>

        <Route path = '/whyNaptar' element= {<WhyNaptar></WhyNaptar>}></Route>
        <Route path = '/blog' element= {<Blog></Blog>}></Route>
        <Route path = '/tryOut' element= {<TryOut></TryOut>}></Route>
        <Route path = '/register' element= {<RegisterSide></RegisterSide>}></Route>
        <Route path = '/forgotPswd' element= {<ForgotPswd></ForgotPswd>}></Route>
        <Route path = '/naptar' element= {<Naptar></Naptar>}></Route>
      </Routes>

     
    </Router>
     
   
  );

  export default App

