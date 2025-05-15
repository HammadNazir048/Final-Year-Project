'use client';
import React, { useState } from 'react';
import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import mammoth from 'mammoth';
import InputPanel from './InputPanel';  

function App() {
    const [sentence, setSentence] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [message, setMessage] = useState('');

    // Function to extract text from PDF or Word file
    const extractTextFromFile = async (file) => {
        const fileType = file.type;
        let extractedText = '';

        if (fileType === 'application/pdf') {
            const pdfData = await file.arrayBuffer();
            const pdfDoc = await pdfjsLib.getDocument(pdfData).promise;

            for (let i = 1; i <= pdfDoc.numPages; i++) {
                const page = await pdfDoc.getPage(i);
                const textContent = await page.getTextContent();
                extractedText += textContent.items.map(item => item.str).join(' ') + '\n';
            }
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                   fileType === 'application/msword') {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            extractedText = result.value;
        }

        return extractedText;
    };

    const handleProcess = async (extractedText) => {
        try {
            setSentence(extractedText);  // Set the extracted text from InputPanel

            // Step 1: Extract keywords
            const extractResponse = await axios.post('http://127.0.0.1:5000/extract_keywords', { sentence: extractedText });
            const extractedKeywords = extractResponse.data.keywords;
            setKeywords(extractedKeywords);

            const downloadResponse = await axios.post('http://127.0.0.1:5000/download_images', {
                keywords: extractedKeywords,
                num_images: 10,
            });
            setMessage(downloadResponse.data.message);
        } catch (error) {
            console.error('Error during processing:', error);
        }
    };

    const handleFileUpload = async (file) => {
        const extractedText = await extractTextFromFile(file);
        handleProcess(extractedText);  // Pass the extracted text to handleProcess
    };

    return (
        <div className='w-full'>
            <InputPanel onSubmit={handleProcess} onFileUpload={handleFileUpload} /> 
            <div>
                {/* <h3>Keywords:</h3>
                <ul>
                    {keywords.map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                    ))}
                </ul> */}
            </div>
            <p>{message}</p>
        </div>
    );
}

export default App;
