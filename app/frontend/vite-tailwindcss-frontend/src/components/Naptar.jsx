import React, { useState, useContext, useEffect } from "react";
import Month from './Month'

import { getMonth } from "./util";

const Naptar = () => {

  const [currenMonth, setCurrentMonth] = useState(getMonth());
  return (
    <div>
     <Month month={currenMonth} />  
    </div>
  )
}

export default Naptar