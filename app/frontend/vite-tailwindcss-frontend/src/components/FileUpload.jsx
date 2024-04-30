import React from 'react';

const FileUpload = () => {
    return(
        <div className = "mx-auto max-w-xs">
            <label htmlFor="example1" className="mb-1 block text-sm font-medium text-gray-700">Upload file</label>
            <input id="example1" type="file" 
            className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary-500 file:py-2.5 file:px-4 file:text-sm 
            file:font-semibold file:text-black 
            hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60" />
        </div>

    );
   
}

export default FileUpload