import React, { useState } from 'react';
import { useAuth } from '../store/auth';

const Comment = ({ postId, addComment }) => {
    const { user, token } = useAuth();
    const [commentText, setCommentText] = useState('');

    const handleInputChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim() === '') {
            alert('Please enter a comment.');
            return;
        }

        addComment(postId, user._id, commentText, token);
        setCommentText('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <textarea
                value={commentText}
                onChange={handleInputChange}
                placeholder="Write your comment..."
                rows="3"
                className="border border-gray-300 rounded-md px-3 py-2 w-full resize-none"
            ></textarea>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition duration-300">
                Add Comment
            </button>
        </form>
    );
};

export default Comment;
