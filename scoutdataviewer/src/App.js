import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import TeamStats from './components/TeamStats';

const App = () => {
  const [data, setData] = useState({ matches: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleFileUpload = (jsons) => {
    const mergedData = jsons.reduce((acc, json) => {
      acc.matches = acc.matches.concat(json.matches);
      return acc;
    }, { matches: [] });
    setData(mergedData);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTeamSelect = (teamNumber) => {
    setSelectedTeam(teamNumber);
  };

  const filteredTeams = data.matches
    .map(match => match.teamNumber)
    .filter((teamNumber, index, self) => self.indexOf(teamNumber) === index)
    .filter(teamNumber => teamNumber.includes(searchTerm));

  const filteredMatches = selectedTeam
    ? data.matches.filter((match) => match.teamNumber === selectedTeam)
    : [];

  return (
    <div className="app-container">
      <div className="header">
        <h1>JSON Stats Viewer</h1>
        <FileUpload onFileUpload={handleFileUpload} />
      </div>
      {data.matches.length > 0 && (
        <div className="content">
          <div className="sidebar">
            <input
              type="text"
              placeholder="Search by Team Number"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <ul>
              {filteredTeams
                .sort((a, b) => a - b)
                .map((teamNumber, index) => (
                  <li key={index} onClick={() => handleTeamSelect(teamNumber)}>
                    {teamNumber}
                  </li>
                ))}
            </ul>
          </div>
          <div className="main-content">
            {selectedTeam && (
              <>
                <TeamStats data={{ matches: filteredMatches }} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;