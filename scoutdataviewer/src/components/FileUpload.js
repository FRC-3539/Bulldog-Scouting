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
      const updatedJsons = jsons.map(json => {
        json.matches = json.matches.map(match => {
          if (match.noShow) {
            return {
              ...match,
              preloaded: false,
              startArea: "",
              autonNotes: 0,
              autonNoteAttempts: 0,
              leftAutonZone: false,
              usedNoteA: false,
              usedNoteB: false,
              usedNoteC: false,
              usedNoteD: false,
              usedNoteE: false,
              usedNoteF: false,
              usedNoteG: false,
              usedNoteH: false,
              scoreEvent: [],
              foulEvent: [],
              sideClimb: false,
              climbSpeed: "No Climb",
              spotlit: false,
              passUnderChain: false,
              recievedRedCard: false,
              recievedYellowCard: false,
            };
          }
          return match;
        });
        return json;
      });
      onFileUpload(updatedJsons);
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