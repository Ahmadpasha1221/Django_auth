import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/login";
import Nav from "./components/nav";
import Home from "./components/home";
import Register from "./components/register";
import Brands from "./components/Brands";

function Main({ name, setName }) {
    const location = useLocation();
    const hideNav = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            {!hideNav && <Nav name={name} setName={setName} />}
            <main className="form-signin">
                <Routes>
                    <Route path="/" element={<Home name={name} />} />
                    <Route path="/login" element={<Login setName={setName} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/brands" element={<Brands />} />
                </Routes>
            </main>
        </>
    );
}

function App() {
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('jwt');
            if (token) {
                const response = await fetch('http://localhost:8000/api/user', {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    credentials: 'include',
                });

                if (response.ok) {
                    const content = await response.json();
                    setName(content.name);
                } else {
                    setName('');
                }
            } else {
                setName('');
            }
        };

        fetchUser();
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <div className="App">
            <Router>
                <Main name={name} setName={setName} />
            </Router>
        </div>
    );
}

export default App;
