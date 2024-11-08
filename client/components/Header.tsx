import React from 'react';
import Link from 'next/link';

const Header = ({ currentUser }) => {
    console.log("Current User:", currentUser);
    const links = [
        !currentUser && { label: "Sign Up", href: '/auth/signUp' },
        !currentUser && { label: "Sign In", href: '/auth/signIn' },
        currentUser && { label: "Sign Out", href: '/auth/signOut' },
    ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
        return (
            <li key={href} className='nav-item'>
                <Link href={href} className="nav-link">
                    {label}
                </Link>
            </li>
        );
    });

    return (
        <nav className='navbar navbar-light bg-light'>
            <Link href="/" className="navbar-brand">
                GitTix
            </Link>
            <div className='d-flex justify-content-end'>
                <ul className='nav d-flex align-items-center'>
                    {links}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
