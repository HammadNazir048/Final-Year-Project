'use client';

const Delete = () => {
    const handleDeleteImages = async () => {
        const response = await fetch('/api/delete-images', {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('All downloaded images have been deleted.');
        } else {
            alert('Failed to delete images.');
        }
    };

    return (
        <button
            type="button"
            onClick={handleDeleteImages}
            className="bg-white text-black px-4 py-2 rounded border hover:bg-gray-600"
        >
            New Chat
        </button>
    );
};

export default Delete;
