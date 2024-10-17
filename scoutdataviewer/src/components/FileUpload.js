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
    <div>
      <input type="file" accept=".json" multiple onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;