import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import "./assets/scss/main.scss"
import Header from './view/layouts/header';
import Community from './view/pages/community';
import SingleUser from './view/pages/singleUser';
import Users from './view/pages/users';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/users/list" />} />
          <Route path="/users" element={<Navigate replace to="/users/list" />} />
          <Route path='community' element={<Community />} />
          <Route path="/users">
            <Route path="list" element={<Users />} />
            <Route path=":username" element={<SingleUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
