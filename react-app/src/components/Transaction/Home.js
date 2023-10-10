import React, { useState } from 'react'
import RecentTransaction from './RecentTransaction';
import axios from 'axios';


const Transaction = () => {

  

  return (<>
    <div style={{ width: "100%", height: "100%",  }}>
      <div style={{ display:"flex",alignItems:'center',flexDirection:"column"}}>
        {/* <h3>Home Page</h3> */}
        <RecentTransaction />
      </div>
    </div>
  </>)
}

export default Transaction