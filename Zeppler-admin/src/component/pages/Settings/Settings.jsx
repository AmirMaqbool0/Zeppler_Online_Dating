import React, { useState } from 'react';
import './style.css';
import DashboardHeader from '../../DashboardHeader/DashboardHeader';
import { Lock } from 'lucide-react';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { app } from '../../../firebase';

const Settings = () => {
    const [currPassword, setCurrPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handlePasswordChange = () => {
        setErrorMessage('');
        if (newPassword !== confirmNewPassword) {
            setErrorMessage('New password and confirm password do not match');
            return;
        }

        const auth = getAuth(app);
        const user = auth.currentUser;

        const credential = EmailAuthProvider.credential(user.email, currPassword);
        reauthenticateWithCredential(user, credential)
            .then(() => {
               
                updatePassword(user, newPassword)
                    .then(() => {
                        setCurrPassword('');
                        setNewPassword('');
                        setConfirmNewPassword('');
                    })
                    .catch((error) => {
                   
                        setErrorMessage('Error updating password: ' + error.message);
                    });
            })
            .catch((error) => {

                setErrorMessage('Error reauthenticating: ' + error.message);
            });
    };

    return (
        <div className='settings-container'>
            <DashboardHeader />
            <div className="settings-content">
                <div className="setting-content-heading">
                    <span>Settings</span>
                </div>
                <div className="settings-password-box">
                    <div className="settings-passwords-text">
                        <span>Change Password</span>
                    </div>
                    <div className="settings-password-inputs">
                        <div className="settings-password-input">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder='Current Password'
                                value={currPassword}
                                onChange={(e) => setCurrPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="settings-password-inputs">
                        <div className="settings-password-input">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder='New Password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="settings-password-inputs">
                        <div className="settings-password-input">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder='Confirm New Password'
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="settings-btn">
                            <button onClick={handlePasswordChange}>Update Password</button>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default Settings;
