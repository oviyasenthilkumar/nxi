
import  Entity  from './Components/Entity'
import Association from './Components/association'
import Process from './Components/Process'

import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import NestedTable from './Components/NestedTable';



const App = () => {
  return (
    <Router>
      <>
      


        <Routes>
          <Route path="/entities" element={<Entity />} />
          <Route path="/association" element={<Association />} />
          <Route path="/process" element={<Process />} />
          <Route path="/" element={<Entity />} />
          <Route path='/ui' element={<NestedTable/>}/>
        </Routes>
      </>
    </Router>
  );
};




export default App
