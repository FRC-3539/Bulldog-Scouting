import React from 'react';

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const readers = files.map(file => {
      const reader = new FileReader();
      reader.readAsText(file);
      return reader;
    });

    Promise.all(readers.map(reader => new Promise(resolve => {
      reader.onload = (e) => resolve(JSON.parse(e.target.result));
    }))).then(jsons => {
      onFileUpload(jsons);
    });
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        id="file-input"
        accept=".json"
        multiple
        onChange={handleFileChange}
      />
      <label htmlFor="file-input" className="file-upload-button">
        Choose Files
      </label>
    </div>
  );
};

export default FileUpload;