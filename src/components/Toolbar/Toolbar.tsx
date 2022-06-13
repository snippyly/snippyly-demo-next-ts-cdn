/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSnippylyClient } from '../../context/snippylyContext';
import { Users } from '../../users';

function Toolbar({ setView }: { setView: Function }) {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const users = Users;

    const { client } = useSnippylyClient();

    useEffect(() => {
        // If user is logged in then set it to selected user state
        if (localStorage.getItem('user')) {
            setSelectedUser(JSON.parse(localStorage.getItem('user')!));
        }
    }, [])

    useEffect(() => {
        if (selectedUser && client) {
            identifySnippyly();
        }
    }, [selectedUser && client])

    const identifySnippyly = async () => {
        if (client) {
            client.identify(selectedUser).then((res) => {
                // User login successful
            }).catch((err) => {
                // User login failure
            });
        }
    }

    const signOut = () => {
        localStorage.removeItem('user');
        window.location.reload();
    }

    const signIn = (user: any): void => {
        // Add custom logic here to login user
        // Once user is available call identifySnippyly
        localStorage.setItem('user', JSON.stringify(user));
        setSelectedUser(user);
    }

    const navigateTo = (path: string, target: string = '_self') => {
        window.open(path, target);
    }

    return (
        <div className='header'>
            <snippyly-presence></snippyly-presence>
            <div className='menu-container'>
                <span className='menu' onClick={() => navigateTo('/')}>Home</span>
                <span className='menu' onClick={() => setView('stream-view')}>Stream View</span>
                <span className='menu' onClick={() => navigateTo('https://snippyly-demo-next-ts-cdn-wdp.web.app/', '_blank')}>Document Params</span>
            </div>
            <div>
                {
                    selectedUser ?
                        <div>
                            <span>Hi, {selectedUser?.name}</span>
                            <button className='custom-btn' onClick={() => signOut()}>Sign Out</button>
                        </div>
                        :
                        <div>
                            <span>Sign In with:</span>
                            {
                                users.map((user) => {
                                    return (
                                        <button key={user.userId} className='custom-btn' onClick={() => signIn(user)}>{user?.name}</button>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Toolbar;