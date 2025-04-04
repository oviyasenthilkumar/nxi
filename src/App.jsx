

import Association from './Components/AssociationsEditor'
import Process from './Components/Process'
import Entity from './Components/Entity'
import Detailing from './Components/DetailingEditor'
import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import NestedTable from './Components/NestedTable';



const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<NestedTable />} />
          <Route path="/association" element={<Association />} />
          <Route path="/detailing" element={<Detailing />} />
          <Route path="/process" element={<Process />} /> 
          <Route path="/entity" element={<Entity />} />
         
        </Routes>
      </>
    </Router>
  );
};

export default App
