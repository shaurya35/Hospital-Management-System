"use client"
import React, { useState } from 'react';
import Markdown from 'react-markdown';

const Chatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (userInput.trim() !== '') {
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'send', text: userInput },
            ]);
            setLoading(true);
            setError('');

            try {
                const res = await fetch('/api/chat-bot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question: userInput }),
                });

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await res.json();
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { type: 'receive', text: data.response },
                ]);
            } catch (error) {
                console.error('Error fetching response:', error);
                setError('An error occurred while fetching the response.');
            } finally {
                setLoading(false);
            }

            setUserInput('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-xl mx-auto bg-gray-100 p-4">
            <div className="bg-blue-600 text-white py-3 px-6 rounded-t-lg shadow-md">
                <h1 className="text-xl font-semibold">AI Chatbot</h1>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-md border border-gray-300">
                {messages.map((message, idx) => (
                    <div key={idx} className={`p-3 rounded-lg ${message.type === 'send' ? 'bg-blue-100 text-blue-800 self-end' : 'bg-gray-100 text-gray-800'}`}>
                        {message.type === 'send' ? message.text : <Markdown>{message.text}</Markdown>}
                    </div>
                ))}
                {loading && (
                    <div className="p-3 rounded-lg bg-gray-200 text-gray-600">
                        Loading...
                    </div>
                )}
                {error && (
                    <div className="p-3 rounded-lg bg-red-100 text-red-800">
                        {error}
                    </div>
                )}
            </div>
            <div className="flex items-center mt-4 border-t border-gray-300 pt-4">
                <textarea
                    name="userInput"
                    placeholder="Ask me anything..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                    className={`ml-3 px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 ${userInput.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleSubmit}
                    disabled={userInput.trim() === ''}
                >
                    &rarr;
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
