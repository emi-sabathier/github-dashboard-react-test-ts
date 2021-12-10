import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';

export default function Header() {
    return(
        <header className="flex flex-row justify-center items-center bg-blue-400 py-2">
            <MenuIcon className="ml-5 text-white" />
            <p className="flex-1 text-center text-white font-semibold text-xl self-center">Github Dashboard Sample</p>
        </header>
    )
}
