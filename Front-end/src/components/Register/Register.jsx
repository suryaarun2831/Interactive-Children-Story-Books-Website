import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUserData } from '../API/Api';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('user');

    const navigate = useNavigate();

    const Login = () => {
        navigate('/');
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = () => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(String(password));
    };

    const validateConfirmPassword = () => {
        return password === confirmPassword;
    };

    const validateName = () => {
        return name.length > 2;
    };

    const register = async (event) => {
        event.preventDefault();
        if (!validateName()) {
            setError('Name must be more than 2 characters.');
        } else if (!validateEmail(email)) {
            setError('Invalid email format.');
        } else if (!validatePassword()) {
            setError('Password must be strong, with at least one uppercase, lowercase, number, and special character.');
        } else if (!validateConfirmPassword()) {
            setError('Passwords do not match.');
        } else {
            setError('');
            const userData = {
                name,
                email,
                password,
                role,
            };
            try {
                const response = await postUserData(userData);
                console.log(response);
                navigate('/');
            } catch (error) {
                console.error('Registration failed:', error);
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={register} className="register-form">
            <div className='register-total-page'>
                <div className='register-content'>
                    <div className='register-image'></div>
                    <div className="register-container">
                        <h2>Register</h2>
                        {error && <p className='error'>{error}</p>}
                        <div className='input-group'>
                            <input
                                type="text"
                                className='text-box-rgs'
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='input-group'>
                            <input
                                type="email"
                                className='text-box-rgs'
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='input-group'>
                            <input
                                type="password"
                                className='text-box-rgs'
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='input-group'>
                            <input
                                type="password"
                                className='text-box-rgs'
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className='role-group'>
                            <input type="radio" id="admin" name="role" value="admin" onChange={(e) => setRole("admin")} />
                            <label htmlFor="admin">Admin</label>
                            <input type="radio" id="user" name="role" value="user" defaultChecked onChange={(e) => setRole("user")} />
                            <label htmlFor="user">User</label>
                        </div>
                        <button type="submit" className='submit-btn'>Create Account</button>
                        <p>Already have an account?
                            <button type="button" onClick={Login} className='reg-btn'>Login</button>
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Register;
