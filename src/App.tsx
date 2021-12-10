import React from 'react';
import {Route, Routes} from 'react-router-dom';
import UserSearchPage from "./pages/UserSearchPage";
import UserReposListPage from "./pages/UserReposListPage";

function App() {
  return (
      <Routes>
        <Route path='/' element={<UserSearchPage />} />
        <Route path='/reposlist' element={<UserReposListPage />} />
      </Routes>
  );
}

export default App;
