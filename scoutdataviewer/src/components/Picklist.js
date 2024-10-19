import React from 'react';

const Picklist = ({ picklist, moveTeamUp, moveTeamDown, deleteTeam, clearPicklist }) => {
  return (
    <div>
      <div className="picklist-header">
        <button className="clear-button" onClick={clearPicklist}>Clear List</button>
      </div>
      {picklist.map((teamNumber, index) => (
        <div key={teamNumber} className="picklist-item">
          <span className="team-number">{teamNumber}</span>
          <div className="picklist-buttons">
            <button onClick={() => deleteTeam(index)}>✕</button>
            <button onClick={() => moveTeamUp(index)}>↑</button>
            <button onClick={() => moveTeamDown(index)}>↓</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Picklist;