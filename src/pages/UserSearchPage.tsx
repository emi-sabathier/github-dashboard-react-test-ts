import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import {CircularProgress} from "@material-ui/core";
import Header from '../components/Header/Header';
import {BASE_URL, ErrorSpecs, GetDataSource, RepositorySpecs, UserListType, UserType} from '../services/FetchData';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {useNavigate} from 'react-router-dom';

function UserSearchPage() {
    const navigate = useNavigate();
    const [inputUsername, setInputUsername] = useState<string>('');
    const [userList, setUserList] = useState<UserType[]>([]); // [{...},{...}]
    const [loading, setLoading] = useState<boolean>(true);
    const [errorTxt, setErrorTxt] = useState<string>('');
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

    const getUsernamesList = async (): Promise<any> => {
        if (inputUsername.length >= 2) {
            try {
                const response: UserListType = await GetDataSource.getData(`${BASE_URL}/search/users?q=${inputUsername}`);
                setUserList(response.items);
                setLoading(false);
            } catch (err: any) {
                setErrorTxt(err['errorType']);
                setOpenSnackbar(true);
            }
        }
    }

    const getUserInfos = async () => {
        try {
            const response = await GetDataSource.getData(`${BASE_URL}/users/${inputUsername}`);
            getReposList(response.repos_url);
            navigate('/reposlist')
        } catch (err: any) {
            setErrorTxt(err['errorType']);
            setOpenSnackbar(true);
        }
    }

    const getReposList = async (url: string) => {
        try {
            const response: RepositorySpecs = await GetDataSource.getData(url);
            console.log('res', response);
        } catch (err: any) {
            setErrorTxt(err['errorType']);
            setOpenSnackbar(true);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputUsername(e.target.value);
        getUsernamesList();
    }


    const handleSubmit = async () => {
        if (inputUsername === '') {
            setOpenSnackbar(true);
            setErrorTxt('Le champ est vide');
        } else {
            await getUserInfos();
        }
    }

    const handleUserNameSelection = (selection: string) => {
        setInputUsername(selection);
        setUserList([]);
    }

    const handleClose = () => {
        setOpenSnackbar(false);
    };

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
                {!loading ? <CircularProgress/> : null}
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
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                message={errorTxt}
                action={
                    <>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            Fermer
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </>
                }
            />
        </div>
    );
}

export default UserSearchPage;