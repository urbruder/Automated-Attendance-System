import React from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="flex justify-between items-center p-6 bg-white shadow-sm">
            <div>
                <FaSearch className="text-xl text-gray-500 cursor-pointer" />
            </div>
            <div>
                <FaUser className="text-xl text-slate-700 cursor-pointer" />
            </div>
        </header>
    );
};

export default Header;