import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import benzlogo from '../images/benzlogo.jpg';
import audi1 from '../images/audi1.jpg';
import lambo1 from '../images/lambo1.jpg';
import './register.css';  // Import the CSS

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post('http://localhost:8000/api/register', {
                email,
                name: username,
                password
            });

            setMessage(response.data.message);

            if (response.status === 201) {
                console.log('Successfully Registered');
                navigate('/login');  // Navigate to the login page after successful registration
            }
        } catch (error) {
            setMessage(error.response?.data?.error || 'Registration failed');
            console.error('Registration Error:', error); 
        }
    };

    return (
        <div id="container">
          <div className="left">
          <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src={audi1} class="d-block w-100" alt="..."/>
        </div>
        <div class="carousel-item">
          <img src={lambo1} class="d-block w-100" alt="..."/>
        </div>
        <div class="carousel-item">
          <img src={benzlogo} class="d-block w-100" alt="..."/>
        </div>
      </div>
    </div>
          </div>
            <div className="right">
                <form onSubmit={handleSubmit}>
                    <h2>Create an Account</h2>
                    <p>Sign up to get started.</p>
                    <div className="form-wrapper">
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {message && (
                            <div className="error show">
                                <p>{message}</p>
                            </div>
                        )}
                        <button type="submit" className="btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
