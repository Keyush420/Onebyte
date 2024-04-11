import React, { useState } from 'react';
import axios from 'axios';

const UpdateTable = ({ productId, onUpdate, onDelete }) => {
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/products/${productId}`, {
                name: newName,
                price: newPrice,
                imageUrl: newImageUrl
            });
            onUpdate();
            setNewName('');
            setNewPrice('');
            setNewImageUrl('');
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/products/${productId}`);
            onDelete();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="New Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <input type="number" placeholder="New Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                <input type="text" placeholder="New Image URL" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} />
                <button type="submit">Update Product</button>
            </form>
            <button onClick={handleDelete}>Delete Product</button>
        </div>
    );
};

export default UpdateTable;
