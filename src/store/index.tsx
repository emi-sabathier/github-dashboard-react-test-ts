import React, {useReducer, createContext, useContext, useState, Dispatch } from 'react';
import {LOADING, USER_INFOS, USER_REPOS_LIST} from "./actions";
import {RepositorySpecs, UserType} from "../services/FetchData";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";

type InitialStateType = {
    userInfos: object,
    userReposList: RepositorySpecs[];
    loading: boolean,
}

const initialState: InitialStateType = {
    userInfos: {},
    userReposList: [],
    loading: false,
}

type CtxType = {
    state: InitialStateType,
    dispatch: Dispatch<ActionType>,
    setOpenSnackbar: (value: boolean) => void,
    setErrorTxt: (value: string) => void,
}

type ChildrenType = {
    children: JSX.Element;
}

type ActionType =
    | { type: 'LOADING', payload: boolean }
    | { type: 'USER_INFOS', payload: UserType }
    | { type: 'USER_REPOS_LIST', payload: RepositorySpecs }

function reducer(state: InitialStateType, action: ActionType): any {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case USER_INFOS:
            return {
                ...state,
                userInfos: action.payload
            }
        case USER_REPOS_LIST:
            return {
                ...state,
                userReposList: action.payload
            }
        default:
            return state;
    }
}

const StoreContext = createContext<any | null>(null); // any à revoir
// const StoreContext = React.createContext<CtxType | null>(null);

export const StoreProvider = ({children}: ChildrenType) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [errorTxt, setErrorTxt] = useState<string>('');

    const handleClose = (): void => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <StoreContext.Provider value={{state, dispatch, setOpenSnackbar, setErrorTxt}}>
                {children}
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
            </StoreContext.Provider>
        </>
    )
}
export const useStore = () => useContext(StoreContext);
