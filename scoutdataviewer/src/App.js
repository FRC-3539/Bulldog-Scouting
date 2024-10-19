import React, { useState, useRef } from 'react';
import FileUpload from './components/FileUpload';
import TeamStats from './components/TeamStats';
import TeamRankings from './components/TeamRankings';
import Picklist from './components/Picklist'; // Import the Picklist component

const App = () => {
  const [data, setData] = useState({ matches: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');
  const [missingTeamQueue, setMissingTeamQueue] = useState([]);
  const [picklist, setPicklist] = useState([]);
  const teamNumberInputRef = useRef(null);

  const handleFileUpload = (jsons) => {
    const mergedData = jsons.reduce((acc, json) => {
      acc.matches = acc.matches.concat(json.matches);
      return acc;
    }, { matches: [] });
    setData(mergedData);
    checkForMissingTeamNumbers(mergedData.matches);
  };

  const checkForMissingTeamNumbers = (matches) => {
    const missingTeams = matches.filter(match => !match.teamNumber);
    if (missingTeams.length > 0) {
      setMissingTeamQueue(missingTeams);
    }
  };

  const handleTeamNumberSubmit = (teamNumber) => {
    if (!teamNumber) return;
    setData(prevData => {
      const updatedMatches = prevData.matches.map(match => {
        if (match.station === missingTeamQueue[0].station && match.match === missingTeamQueue[0].match) {
          return { ...match, teamNumber };
        }
        return match;
      });
      return { ...prevData, matches: updatedMatches };
    });
    setMissingTeamQueue(prevQueue => prevQueue.slice(1));
    if (teamNumberInputRef.current) {
      teamNumberInputRef.current.value = '';
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTeamSelect = (teamNumber) => {
    if (activeTab === 'picklist') {
      addToPicklist(teamNumber);
    } else {
      setSelectedTeam(teamNumber);
      setActiveTab('stats');
    }
  };

  const filteredTeams = data.matches
    .map(match => match.teamNumber)
    .filter((teamNumber, index, self) => self.indexOf(teamNumber) === index)
    .filter(teamNumber => {
      const searchTerms = searchTerm.split(',').map(term => term.trim());
      return searchTerms.some(term => teamNumber.includes(term));
    });

  const filteredMatches = selectedTeam
    ? data.matches.filter((match) => match.teamNumber === selectedTeam)
    : [];

  const moveTeamUp = (index) => {
    if (index === 0) return;
    const updatedPicklist = [...picklist];
    [updatedPicklist[index - 1], updatedPicklist[index]] = [updatedPicklist[index], updatedPicklist[index - 1]];
    setPicklist(updatedPicklist);
  };

  const moveTeamDown = (index) => {
    if (index === picklist.length - 1) return;
    const updatedPicklist = [...picklist];
    [updatedPicklist[index + 1], updatedPicklist[index]] = [updatedPicklist[index], updatedPicklist[index + 1]];
    setPicklist(updatedPicklist);
  };

  const deleteTeam = (index) => {
    const updatedPicklist = [...picklist];
    updatedPicklist.splice(index, 1);
    setPicklist(updatedPicklist);
  };

  const clearPicklist = () => {
    setPicklist([]);
  };

  const addToPicklist = (teamNumber) => {
    if (!picklist.includes(teamNumber)) {
      setPicklist([...picklist, teamNumber]);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Bulldog Scouting</h1>
        <FileUpload onFileUpload={handleFileUpload} />
      </div>
      {missingTeamQueue.length > 0 && (
        <div className="modal">
          <div className="modal-content">
            <h2>Missing Team Number</h2>
            <p>Station: {missingTeamQueue[0].station}</p>
            <p>Match Number: {missingTeamQueue[0].match}</p>
            <input
              type="text"
              placeholder="Enter Team Number"
              ref={teamNumberInputRef}
            />
            <button className="apply-button" onClick={() => handleTeamNumberSubmit(teamNumberInputRef.current.value)}>Apply</button>
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
              <button onClick={() => setActiveTab('picklist')} className={activeTab === 'picklist' ? 'active' : ''}>Picklist</button>
            </div>
            {activeTab === 'stats' && selectedTeam && (
              <TeamStats data={{ matches: filteredMatches }} />
            )}
            {activeTab === 'rankings' && (
              <TeamRankings data={data} onTeamSelect={handleTeamSelect} />
            )}
            {activeTab === 'picklist' && (
              <Picklist
                picklist={picklist}
                moveTeamUp={moveTeamUp}
                moveTeamDown={moveTeamDown}
                deleteTeam={deleteTeam}
                clearPicklist={clearPicklist}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;