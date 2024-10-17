import React, { useState } from 'react';

const AverageIgnoreKeys = ['match',];

const TeamStats = ({ data }) => {
  const [attributeSearchTerm, setAttributeSearchTerm] = useState('');

  const teams = data.matches.reduce((acc, match) => {
    const teamNumber = match.teamNumber;
    if (!acc[teamNumber]) {
      acc[teamNumber] = [];
    }
    acc[teamNumber].push(match);
    return acc;
  }, {});

  const calculateAverages = (matches) => {
		const totalMatches = matches.length;
		const keys = Object.keys(matches[0]).filter(key => key !== 'teamNumber' && key !== 'match');
		const averages = {}; // Initialize averages as an empty object
	
		matches.forEach(match => {
			keys.forEach(key => {
				if (key === 'scoreEvent') {
					match[key].forEach(event => {
						const pickupTime = new Date(event.pickupTime);
						const scoreTime = new Date(event.scoreTime);
						const timeTaken = (scoreTime - pickupTime) / 1000;
						averages[key] = averages[key] || [];
						averages[key].push(timeTaken);
	
						// Count scores into the speaker
						if (event.scorePlace === 'speaker') {
							averages['scoresIntoSpeaker'] = (averages['scoresIntoSpeaker'] || 0) + 1;
						}
					});
				} else if (key === 'foulEvent') {
					match[key].forEach(event => {
						averages[key] = averages[key] || {};
						averages[key][event.foulType] = averages[key][event.foulType] || { count: 0, matches: [] };
						averages[key][event.foulType].count += 1;
						averages[key][event.foulType].matches.push(match.match);
					});
				} else if (typeof match[key] === 'boolean') {
					averages[key] = (averages[key] || 0) + (match[key] ? 1 : 0);
				} else if (typeof match[key] === 'number') {
					averages[key] = (averages[key] || 0) + match[key];
				} else if (typeof match[key] === 'string') {
					averages[key] = (averages[key] || 0) + parseFloat(match[key]) || 0;
				}
			});
		});
	
		keys.forEach(key => {
			if (key === 'scoreEvent') {
				averages[key] = averages[key].reduce((a, b) => a + b, 0) / averages[key].length;
			} else if (key !== 'foulEvent' && key !== 'matchScoreRed' && key !== 'matchScoreBlue') {
				if (typeof matches[0][key] === 'boolean') {
					averages[key] = ((averages[key] / totalMatches) * 100).toFixed(2) + '%';
				} else {
					averages[key] = (averages[key] / totalMatches).toFixed(2);
				}
			}
		});
	
		if (averages['scoresIntoSpeaker']) {
			averages['scoresIntoSpeaker'] = (averages['scoresIntoSpeaker'] / totalMatches).toFixed(2);
		}
	
		return averages;
	};

  const handleAttributeSearchChange = (event) => {
    setAttributeSearchTerm(event.target.value);
  };
  return (
    <div>
      {Object.keys(teams).map((teamNumber) => {
        const matches = teams[teamNumber];
        const averages = calculateAverages(matches);
        const filteredAttributes = Object.keys(averages).filter(key =>
          key.toLowerCase().includes(attributeSearchTerm.toLowerCase())
        );
        const comments = matches.map(match => ({ comment: match.robotRemarks, matchNumber: match.match })).filter(item => item.comment);

        return (
          <div key={teamNumber}>
            <h2>Team {teamNumber}</h2>
            <div style={{ paddingLeft: '20px' }}>
              <input
                type="text"
                placeholder="Search attributes"
                value={attributeSearchTerm}
                onChange={handleAttributeSearchChange}
              />
              <h3>Average Stats</h3>
              <table>
                <thead>
                  <tr>
                    <th>Attribute</th>
                    <th>Average</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttributes.map((key) => (
                    key !== 'foulEvent' && key !== 'scoreEvent' && key !== 'matchScoreRed' && key !== 'matchScoreBlue' ? (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{averages[key]}</td>
                      </tr>
                    ) : null
                  ))}
                  {averages.scoreEvent && (
                    <tr>
                      <td>Average Cycle Time</td>
                      <td>{averages.scoreEvent.toFixed(2)} seconds</td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="2">
                      <details>
                        <summary>Fouls</summary>
                        <table style={{ width: '100%' }}>
                          <thead>
                            <tr>
                              <th>Foul Type</th>
                              <th>Foul Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {averages.foulEvent && Object.keys(averages.foulEvent).map((foulType) => (
                              <tr key={foulType}>
                                <td style={{ width: '50%' }}>{foulType}</td>
                                <td style={{ width: '50%' }}>
                                  <details>
                                    <summary>{averages.foulEvent[foulType].count} times</summary>
                                    <ul>
                                      {averages.foulEvent[foulType].matches.map((match, idx) => (
                                        <li key={idx}>
                                          <a href={`#match-${match}`} onClick={() => document.getElementById(`match-${match}`).open = true}>
                                            Match {match}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </details>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </details>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <details>
                        <summary>Comments</summary>
                        <ul>
                          {comments.map((item, idx) => (
                            <li key={idx}>
                              {item.comment} - <a href={`#match-${item.matchNumber}`} onClick={() => document.getElementById(`match-${item.matchNumber}`).open = true}>
                                Match {item.matchNumber}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>Match Info</h3>
              {matches.map((match, index) => (
                <details key={index} id={`match-${match.match}`} style={{ marginBottom: '20px' }}>
                  <summary>Match {match.match}</summary>
                  <table>
                    <thead>
                      <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(match).map((key) => (
                        key !== 'scoreEvent' && key !== 'foulEvent' ? (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{match[key].toString()}</td>
                          </tr>
                        ) : null
                      ))}
                      {match.scoreEvent && (
                        <tr>
                          <td colSpan="2">
                            <details>
                              <summary>Score Events</summary>
                              <table>
                                <thead>
                                  <tr>
                                    <th>Pickup Location</th>
                                    <th>Score Place</th>
                                    <th>Time Taken (seconds)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {match.scoreEvent.map((event, idx) => {
                                    const pickupTime = new Date(event.pickupTime);
                                    const scoreTime = new Date(event.scoreTime);
                                    const timeTaken = ((scoreTime - pickupTime) / 1000).toFixed(2);
                                    return (
                                      <tr key={idx}>
                                        <td>{event.pickupLocation}</td>
                                        <td>{event.scorePlace}</td>
                                        <td>{timeTaken}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </details>
                          </td>
                        </tr>
                      )}
                      {match.foulEvent && (
                        <tr>
                          <td colSpan="2">
                            <details>
                              <summary>Foul Events</summary>
                              <table>
                                <thead>
                                  <tr>
                                    <th>Foul Type</th>
                                    <th>Foul Details</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Object.keys(match.foulEvent.reduce((acc, event) => {
                                    acc[event.foulType] = acc[event.foulType] || [];
                                    acc[event.foulType].push(event);
                                    return acc;
                                  }, {})).map((foulType, idx) => (
                                    <tr key={idx}>
                                      <td>{foulType}</td>
                                      <td>
                                        <details>
                                          <summary>Details</summary>
                                          <table>
                                            <thead>
                                              <tr>
                                                <th>Foul Time</th>
                                                <th>Match</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {match.foulEvent.filter(event => event.foulType === foulType).map((event, idx) => (
                                                <tr key={idx}>
                                                  <td>{new Date(event.foulTime).toLocaleString()}</td>
                                                  <td>
                                                    <a href={`#match-${match.match}`} onClick={() => document.getElementById(`match-${match.match}`).open = true}>
                                                      Match {match.match}
                                                    </a>
                                                  </td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </details>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </details>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </details>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamStats;