import React from 'react';

const Blog = ({title}) => {
    return (
        <div className="flex flex-col items-center justify-center  p-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <div className="flex items-center space-x-2 mb-4">
                    <span className="animate-pulse">🚧</span>
                    <p className="text-xl">Under Development</p>
                    <span className="animate-pulse">🚧</span>
                </div>
                <p className="text-gray-600">
                    This section is currently being built. Check back soon!
                </p>
            </div>
        </div>
    );
};

export default Blog;