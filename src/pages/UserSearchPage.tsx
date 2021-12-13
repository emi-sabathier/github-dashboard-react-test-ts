import React, {ChangeEvent, useState} from 'react';
import {CircularProgress} from "@material-ui/core";
import Header from '../components/Header/Header';
import {useNavigate} from 'react-router-dom';
import {useStore} from "../store";
import {BASE_URL, GetDataSource, RepositorySpecs, UserListType, UserType} from '../services/FetchData';
import {LOADING, USER_INFOS, USER_REPOS_LIST} from "../store/actions";

function UserSearchPage() {
    const navigate = useNavigate();
    const {state, dispatch, setErrorTxt, setOpenSnackbar} = useStore();
    const [inputUsername, setInputUsername] = useState<string>('');
    const [userList, setUserList] = useState<UserType[]>([]); // [{...},{...}]

    const getUsernamesList = async (): Promise<void> => {
        if (inputUsername.length >= 2) {
            try {
                const response: UserListType = await GetDataSource.getData(`${BASE_URL}/search/users?q=${inputUsername}`);
                setUserList(response.items);
            } catch (err: any) {
                setErrorTxt(err['errorType']);
                setOpenSnackbar(true);
            }
        }
    }

    const getUserInfos = async (): Promise<void> => {
        try {
            const response = await GetDataSource.getData(`${BASE_URL}/users/${inputUsername}`);
            await getReposList(response.repos_url);
            dispatch({type: USER_INFOS, payload: response});
            dispatch({type: LOADING, payload: false});
            navigate('/reposlist')
        } catch (err: any) {
            setErrorTxt(err['errorType']);
            setOpenSnackbar(true);
        }
    }

    const getReposList = async (url: string): Promise<void> => {
        try {
            const response: RepositorySpecs = await GetDataSource.getData(url);
            dispatch({type: USER_REPOS_LIST, payload: response});
            dispatch({type: LOADING, payload: false});
        } catch (err: any) {
            setErrorTxt(err['errorType']);
            setOpenSnackbar(true);
        }
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        setInputUsername(e.target.value);
        await getUsernamesList();
    }


    const handleSubmit = async (): Promise<void> => {
        if (inputUsername === '') {
            setOpenSnackbar(true);
            setErrorTxt('Le champ est vide');
        } else {
            await getUserInfos();
        }
    }

    const handleUserNameSelection = (selection: string): void => {
        setInputUsername(selection);
        setUserList([]);
    }

    return (
        <div className="flex-1 flex-column">
            <Header/>
            <div className="flex justify-center mx-5 mt-10 mb-2">
                <input type="text"
                       placeholder="Placeholder"
                       value={inputUsername}
                       onChange={handleChange}
                       className="mr-5 border-r border-l border-t border-gray-400 px-3 py-3 placeholder-gray-400 text-gray-600 relative border-b bg-white bg-white text-sm border-gray-400 outline-none focus:outline-none focus:ring w-2/3"/>
                <button onClick={handleSubmit}
                        className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button">
                    Search
                </button>
                {state.loading ? <CircularProgress/> : null}
            </div>
            {userList.length > 0 ?
                <div className="flex justify-center">
                    <div
                        className="mx-5 border-t border-r border-l border-b border-gray-400 divide-y divide-gray-400 w-2/3">
                        {userList.map((item: UserType, index: number) => (
                            <p className="font-semibold px-3 py-1" key={index}>
                                <a href="#" onClick={() => handleUserNameSelection(item.login)}>{item.login}</a>
                            </p>
                        ))}
                    </div>
                </div> : null}
        </div>
    );
}

export default UserSearchPage;