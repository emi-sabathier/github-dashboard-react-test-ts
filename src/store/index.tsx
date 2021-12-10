import React, {useReducer, createContext, useContext, FC} from 'react';
import {LOADING, USER_INFOS, USER_REPOS_LIST} from "./actions";
import {RepositorySpecs, UserType} from "../services/FetchData";

type InitialStateType = {
    userInfos: object,
    userReposList: RepositorySpecs[];
    loading: boolean,
}

type ActionType =
    | { type: 'LOADING', payload: boolean}
    | { type: 'USER_INFOS', payload: UserType}
    | { type: 'USER_REPOS_LIST', payload: RepositorySpecs}

const initialState: InitialStateType = {
    userInfos: {},
    userReposList: [],
    loading: false,
}

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
const StoreContext = createContext<any | undefined>(undefined);

export const StoreProvider: FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}
export const useStore = () => useContext(StoreContext);
