import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import TeamStats from './components/TeamStats';
import TeamRankings from './components/TeamRankings';

const App = () => {
  const [data, setData] = useState({ matches: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');
  const [missingTeamInfo, setMissingTeamInfo] = useState(null);

  const handleFileUpload = (jsons) => {
    const mergedData = jsons.reduce((acc, json) => {
      acc.matches = acc.matches.concat(json.matches);
      return acc;
    }, { matches: [] });
    setData(mergedData);
    checkForMissingTeamNumbers(mergedData.matches);
  };

  const checkForMissingTeamNumbers = (matches) => {
    const missingTeamMatch = matches.find(match => !match.teamNumber);
    if (missingTeamMatch) {
      setMissingTeamInfo(missingTeamMatch);
    }
  };

  const handleTeamNumberSubmit = (teamNumber) => {
    setData(prevData => {
      const updatedMatches = prevData.matches.map(match => {
        if (match.station === missingTeamInfo.station && match.match === missingTeamInfo.match) {
          return { ...match, teamNumber };
        }
        return match;
      });
      return { ...prevData, matches: updatedMatches };
    });
    setMissingTeamInfo(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTeamSelect = (teamNumber) => {
    setSelectedTeam(teamNumber);
    setActiveTab('stats');
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
        <h1>Bulldog Scouting</h1>
        <FileUpload onFileUpload={handleFileUpload} />
      </div>
      {missingTeamInfo && (
        <div className="modal">
          <div className="modal-content">
            <h2>Missing Team Number</h2>
            <p>Station: {missingTeamInfo.station}</p>
            <p>Match Number: {missingTeamInfo.match}</p>
            <input
              type="text"
              placeholder="Enter Team Number"
              onBlur={(e) => handleTeamNumberSubmit(e.target.value)}
            />
            <button className="apply-button" onClick={() => handleTeamNumberSubmit(document.querySelector('.modal-content input').value)}>Apply</button>
          </div>
        </div>
      )}
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
            <div className="tabs">
              <button onClick={() => setActiveTab('stats')} className={activeTab === 'stats' ? 'active' : ''}>Team Stats</button>
              <button onClick={() => setActiveTab('rankings')} className={activeTab === 'rankings' ? 'active' : ''}>Team Rankings</button>
            </div>
            {activeTab === 'stats' && selectedTeam && (
              <TeamStats data={{ matches: filteredMatches }} />
            )}
            {activeTab === 'rankings' && (
              <TeamRankings data={data} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;