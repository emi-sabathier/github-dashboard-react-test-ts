import React from 'react';
import {
    Link
} from "react-router-dom";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import {useStore} from "../store";
import Header from "../components/Header/Header";
import {Avatar} from "@material-ui/core";
import {RepositorySpecs} from "../services/FetchData";

function UserReposListPage() {
    const {state} = useStore();
    const userInfos = state.userInfos;
    const userReposList = state.userReposList;

    return (
        <div className="flex-1 flex-column">
            <Header/>
            <div className="flex my-5 justify-center items-center">
                <div className="rounded-full flex justify-center py-3 px-5 bg-gray-300">
                    <Avatar alt={`${userInfos.name}`} src={`${userInfos.avatar_url}`}/>
                    <p className="self-center font-semibold ml-3">{userInfos.name}</p>
                </div>
            </div>
            {userReposList.map((item: RepositorySpecs) => (
                <div className="flex ml-5 my-2" key={item.id}>
                    <div className="flex-none">
                        <FolderOpenIcon/>
                    </div>
                    <p className="flex-grow text-center font-semibold">
                        <Link to={`/repodetails/${item.id}`}>{item.name}</Link>
                    </p>
                </div>
            ))}
        </div>
    );
}

export default UserReposListPage;