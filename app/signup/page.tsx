'use client';

import React, { useState } from 'react';
import { authClient } from '../lib/auth-client';
import { redirect } from 'next/navigation';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e: any) {
        e.preventDefault();

        const { data, error } = await authClient.signUp.email(
            {
                name: name.trim(),
                email: email.trim(),
                password: password,
                callbackURL: '/dashboard',
            },
            {
                onRequest: () => {
                    console.log('Loading...');
                },
                onSuccess: () => {
                    redirect('/dashboard');
                },
                onError: (ctx) => {
                    alert(ctx.error.message);
                },
            }
        );

        console.log('data:', data);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm border border-gray-800 rounded-xl p-6 space-y-4"
            >
                <h2 className="text-lg font-medium text-center mb-4">Sign Up</h2>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full bg-transparent border border-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 placeholder-gray-500"
                />

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full bg-transparent border border-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 placeholder-gray-500"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-transparent border border-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500 placeholder-gray-500"
                />

                <button
                    type="submit"
                    className="w-full border border-gray-700 rounded-lg py-2 hover:bg-gray-800 transition-colors"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;