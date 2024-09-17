import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ name, setName }) => {
    const navigate = useNavigate();

    // Check if user is logged in by checking localStorage
    useEffect(() => {
        const user = localStorage.getItem('jwt');
        if (user) {
            setName('User');  // Assuming you're setting a placeholder name for now
        }
    }, [setName]);

    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        console.log('Successfully logged out');
        localStorage.removeItem('jwt');
        setName('');  // Clear the name to update the UI
        navigate('/login');
    };

    const menu = name === '' ? (
        <>
            <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
            </li>
        </>
    ) : (
        <>
            <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={logout} style={{ textDecoration: 'underlined' }}>Logout</button>
            </li>
        </>
    );

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                {/* <Link className="navbar-brand" to="/">Cars</Link> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/brands">Brands</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Model
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/">Sports</a></li>
                                <li><a className="dropdown-item" href="/">Family car</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {menu}
                    </ul>
                    {name && (
                        <form className="d-flex ms-2" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search Brand" aria-label="Search" />
                            <button className="btn btn-outline-danger" type="submit">Search</button>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
