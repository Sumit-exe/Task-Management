import React, { useState } from 'react';
import './Register.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const Isvalid = () => {
        let isproceed = true;
        let errorMsg = 'Please Enter the value in';

        if (username === null || username === '') {
            isproceed = false;
            errorMsg += ' Username';
        }
        if (password === null || password === '') {
            isproceed = false;
            errorMsg += ' Password';
        }
        if (!isproceed) {
            toast.warning(errorMsg);
        }
        return isproceed;
    }

    const checkUserExists = async () => {
        try {
            const response = await fetch(`https://registeredusers.onrender.com/user/?username=${username}`);
            if (response.status === 200) {
                return true; // User already exists
            } else if (response.status === 404) {
                return false; // User does not exist
            } else {
                toast.error('Failed to check user existence');
                return false;
            }
        } catch (err) {
            toast.error('Failed to check user existence: ' + err.message);
            return false;
        }
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Isvalid()) {
            const userExists = await checkUserExists();

            if (userExists) {
                const registerObject = { username, password };

                fetch("https://registeredusers.onrender.com/user", {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(registerObject)
                }).then((res) => {
                    toast.success('Registered Successfully');
                    navigate('/login');
                }).catch((err) => {
                    toast.error('Failed: ' + err.message);
                });

                setUsername('');
                setPassword('');
            } else {
                toast.error('User already exists. Please choose a different username.');
            }
        }
    }

    return (
        <div className='register'>
            <form action="" onSubmit={handleSubmit}>
                <h1>User Registration</h1>
                <div className='formInputs'>
                    <div className='inputField'>
                        <label htmlFor="">Username: <span>*</span> </label><br />
                        <input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                            placeholder='Enter Username'
                        />
                    </div>
                    <div className='inputField'>
                        <label htmlFor="">Password: <span>*</span> </label><br />
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder='Enter Password'
                        />
                    </div>
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    );
}

export default Register;
