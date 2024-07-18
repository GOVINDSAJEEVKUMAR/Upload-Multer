import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await axios.post('http://localhost:8111/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res.data);
      setUploadedFileUrl(URL.createObjectURL(selectedFile));
      setUploadedFileName(selectedFile.name);
    } catch (error) {
      console.log(error);
    }
  };

  const renderFilePreview = () => {
    if (!uploadedFileUrl) return null;

    const fileType = selectedFile.type;

    if (fileType.startsWith('image/')) {
      return <img src={uploadedFileUrl} alt={uploadedFileName} />;
    } else if (fileType === 'application/pdf') {
      return (
        <div>
          <img src="https://i.pinimg.com/564x/6e/6c/36/6e6c363de5f8c1c3c1331eea85c91a15.jpg" alt="PDF File" /> {/* Replace with actual PDF icon */}
          <p>{uploadedFileName}</p>
        </div>
      );
    } else if (fileType.startsWith('video/')) {
      return <video src={uploadedFileUrl} controls />;
    } else if (fileType.startsWith('audio/')) {
      return (
        <div>
          <img src="https://i.pinimg.com/564x/4e/cc/ee/4ecceeae0d686985caac4876ab475305.jpg" alt="Audio File" /> {/* Replace with actual audio icon */}
          <p>{uploadedFileName}</p>
        </div>
      );
    } else {
      return <p>Unsupported file type</p>;
    }
  };

  return (
    <div>
      <div className='card'>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Upload ! !</button>
      </div>
      {uploadedFileUrl && (
        <div className='uploaded-file'>
          {renderFilePreview()}
          <p>{uploadedFileName}</p>
        </div>
      )}
    </div>
  );
};

export default App;
