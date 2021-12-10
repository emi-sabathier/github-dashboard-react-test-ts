import React from 'react';
import {Route, Routes} from 'react-router-dom';
import UserSearchPage from "./pages/UserSearchPage";
import UserReposListPage from "./pages/UserReposListPage";
import RepoDetails from "./pages/RepoDetails";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <Routes>
            <Route path='/' element={<UserSearchPage/>}/>
            <Route path='/reposlist' element={<UserReposListPage/>}/>
            <Route path='/repodetails/:id' element={<RepoDetails/>}/>
            <Route element={<NotFound/>} path="*"/>
        </Routes>
    );
}

export default App;
