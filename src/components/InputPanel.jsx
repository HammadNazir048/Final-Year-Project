'use client';
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import mammoth from 'mammoth';

const InputPanel = ({ onSubmit }) => {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = async (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);

        if (uploadedFile) {
            const fileType = uploadedFile.type;
            let extractedText = '';

            if (fileType === 'application/pdf') {
                const pdfData = await uploadedFile.arrayBuffer();
                const pdfDoc = await pdfjsLib.getDocument(pdfData).promise;

                for (let i = 1; i <= pdfDoc.numPages; i++) {
                    const page = await pdfDoc.getPage(i);
                    const textContent = await page.getTextContent();
                    extractedText += textContent.items.map(item => item.str).join(' ') + '\n';
                }
            } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                       fileType === 'application/msword') {
                const arrayBuffer = await uploadedFile.arrayBuffer();
                const result = await mammoth.extractRawText({ arrayBuffer });
                extractedText = result.value;
            }

            setText(extractedText);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(text, file);
        setText('');
        setFile(null);
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg shadow-lg w-full sm:w-11/12 md:w-3/4 xl:w-4/5 2xl:w-full mx-auto space-x-2">
        <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your Script here..."
            rows={3}
            className="flex-1 p-2 bg-gray-900 text-white border border-gray-600 rounded resize-none focus:outline-none focus:ring focus:ring-gray-500"
        />
        <label htmlFor="file-upload" className="cursor-pointer bg-white rounded border border-rounded">
            <span className='bg-white'>Upload File</span>
            <span className="bg-white rounded">📎</span>
            <input 
                id="file-upload" 
                type="file" 
                onChange={handleFileChange} 
                className="hidden" 
            />
        </label>
        <button type="submit" className=" bg-white rounded border border-rounded" >Find
        </button>
    </form>    
        </>
    );
};

export default InputPanel;

