import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const AverageIgnoreKeys = ['station', 'robotRemarks'];

const percentageConfig = {
  noShow: false, // true means high percentage is good
  preloaded: true, // false means high percentage is bad
  usedNoteA: true,
  usedNoteB: true,
  usedNoteC: true,
  usedNoteD: true,
  usedNoteE: true,
  usedNoteF: true,
  usedNoteG: true,
  usedNoteH: true,
  leftAutonZone: true,
  // Add more keys as needed
};

const attributeMapping = {
  noShow: 'No Show',
  preloaded: 'Preloaded',
  // Add more mappings as needed
};

const percentageAttributes = {
  noShow: true,
  averageStartAreaA: true,
  averageStartAreaB: true,
  averageStartAreaC: true,
  averageStartAreaD: true,
  passUnderChain: true,
  preloaded: true,
  recievedRedCard: true,
  recievedYellowCard: true,
  sideClimb: true,
  spotlit: true,
  usedNoteA: true,
  usedNoteB: true,
  usedNoteC: true,
  usedNoteD: true,
  usedNoteE: true,
  usedNoteF: true,
  usedNoteG: true,
  usedNoteH: true,
  leftAutonZone: true,
  // Add more keys as needed
};

const getFillColor = (percentage, isHighGood) => {
  const red = isHighGood ? 255 - (percentage * 2.55) : percentage * 2.55;
  const green = isHighGood ? percentage * 2.55 : 255 - (percentage * 2.55);
  return `rgb(${red}, ${green}, 0)`;
};

const calculateAverages = (matches) => {
  const totalMatches = matches.length;
  const keys = Object.keys(matches[0]).filter(key => key !== 'teamNumber' && key !== 'match');
  const averages = {
    foulEvent: {},
    scoreEvent: [],
    scoringAreas: {},
    pointsAttributed: 0,
  };

  matches.forEach(match => {
    keys.forEach(key => {
      if (AverageIgnoreKeys.includes(key)) return;
      if (key === 'startArea') {
        if (!averages['averageStartArea' + match[key]]) {
          averages['averageStartArea' + match[key]] = 0;
        }
        averages['averageStartArea' + match[key]] += 1;
      }
      else if (key === 'scoreEvent') {
        match[key].forEach(event => {
          const pickupTime = new Date(event.pickupTime);
          const scoreTime = new Date(event.scoreTime);
          const timeTaken = (scoreTime - pickupTime) / 1000;

          // Count scores into each scoring area
          if (!averages.scoringAreas[event.scorePlace]) {
            averages.scoringAreas[event.scorePlace] = { count: 0, cycleTimes: [] };
          }
          averages.scoringAreas[event.scorePlace].count += 1;
          averages.scoringAreas[event.scorePlace].cycleTimes.push(timeTaken);
        });
      } else if (key === 'foulEvent') {
        match[key].forEach(event => {
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
    averages.pointsAttributed += calculateMatchPoints(match);
  });

  Object.keys(averages).forEach(key => {
    if (key === 'cycleTimes' && averages[key].length > 0) {
      averages[key] = averages[key].reduce((a, b) => a + b, 0) / averages[key].length;
    } else if (key !== 'foulEvent' && key !== 'matchScoreRed' && key !== 'matchScoreBlue' && key !== 'scoringAreas') {
      if (percentageAttributes[key]) {
        averages[key] = ((averages[key] / totalMatches) * 100).toFixed(2);
      } else {
        averages[key] = (averages[key] / totalMatches).toFixed(2);
      }
    }
  });

  Object.keys(averages.scoringAreas).forEach(area => {
    averages.scoringAreas[area].averageCount = (averages.scoringAreas[area].count / totalMatches).toFixed(2);
    averages.scoringAreas[area].averageCycleTime = (averages.scoringAreas[area].cycleTimes.reduce((a, b) => a + b, 0) / averages.scoringAreas[area].cycleTimes.length).toFixed(2);
  });

  return averages;
};


const calculateMatchPoints = (match) => {
  let points = 0;

  // Auton scored note
  if (match.autonNotes) {
    points += match.autonNotes * 5;
  }
  if (match.scoreEvent) {
    match.scoreEvent.forEach(event => {
      points += event.points || 0; // Assuming each event has a 'points' attribute

      // Additional points based on score place
      if (event.scorePlace === 'Amped Speaker') {
        points += 5;
      } else if (event.scorePlace === 'Speaker') {
        points += 2;
      } else if (event.scorePlace === 'Amp') {
        points += 1;
      } else if (event.scorePlace === 'Trap') {
        points += 5;
      }
    });
    if (match.climbSpeed !== 'No Climb') {
      if(match.spotlit == 'true') {
        points += 4;
      }
      else {
      points += 3
      }
    }
  }

  return points;
};

const formatAttributeName = (name) => {
  return attributeMapping[name] || name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

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

  const matchesByNumber = data.matches.reduce((acc, match) => {
    if (!acc[match.match]) {
      acc[match.match] = [];
    }
    acc[match.match].push(match.teamNumber);
    return acc;
  }, {});

  const handleAttributeSearchChange = (event) => {
    setAttributeSearchTerm(event.target.value);
  };

  return (
    <div>
      {Object.keys(teams).map((teamNumber) => {
        const matches = teams[teamNumber];
        const averages = calculateAverages(matches);
        const filteredAttributes = Object.keys(averages)
          .filter(key => formatAttributeName(key).toLowerCase().includes(attributeSearchTerm.toLowerCase()))
          .sort(); // Sort attributes alphabetically
        const comments = matches.map(match => ({ comment: match.robotRemarks, matchNumber: match.match })).filter(item => item.comment);

        const chartData = {
          labels: Object.keys(averages.scoringAreas),
          datasets: [
            {
              label: 'Average Scores',
              data: Object.keys(averages.scoringAreas).map(area => averages.scoringAreas[area].averageCount),
              backgroundColor: 'rgba(75, 192, 192, 0.9)', // 90% opacity
              yAxisID: 'y-axis-scores',
            },
            {
              label: 'Average Cycle Time (seconds)',
              data: Object.keys(averages.scoringAreas).map(area => averages.scoringAreas[area].averageCycleTime),
              backgroundColor: 'rgba(153, 102, 255, 0.9)', // 90% opacity
              yAxisID: 'y-axis-cycle-time',
            }
          ]
        };

        const chartOptions = {
          scales: {
            x: {
              grid: {
                color: '#333333'
              }
            },
            y: {
              grid: {
                color: '#333333'
              },
            },
            'y-axis-scores': {
              type: 'linear',
              position: 'left',
              ticks: {
                beginAtZero: true,
              },
              title: {
                display: true,
                text: 'Average Scores',
              },
            },
            'y-axis-cycle-time': {
              type: 'linear',
              position: 'right',
              ticks: {
                beginAtZero: true,
              },
              title: {
                display: true,
                text: 'Average Cycle Time (seconds)',
              },
            },
          },
          maintainAspectRatio: false,
          responsive: true,
          aspectRatio: 2, // Make the chart a little smaller
        };

        return (
          <div key={teamNumber} id={`team-${teamNumber}`}>
            <h2>Team {teamNumber}</h2>
            <div style={{ height: '300px' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
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
              key !== 'foulEvent' && key !== 'scoreEvent' && key !== 'matchScoreRed' && key !== 'matchScoreBlue' && key !== 'scoringAreas' && key !== 'startAreas' ? (
                <tr key={key}>
            <td>{formatAttributeName(key)}</td>
            <td>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {percentageAttributes[key] && (
                  <div style={{
              width: `${Math.max(averages[key], 1)}%`,
              height: '20px',
              backgroundColor: getFillColor(parseFloat(averages[key]), percentageConfig[key]),
              marginRight: '10px'
                  }}></div>
                )}
                {averages[key]}{percentageAttributes[key] ? '%' : ''}
              </div>
            </td>
                </tr>
              ) : null
            ))}
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
                {Object.entries(averages.foulEvent).map(([foulType, details]) => (
                  <tr key={foulType}>
              <td style={{ width: '50%' }}>{foulType}</td>
              <td style={{ width: '50%' }}>
                <details>
                  <summary>{details.count} times</summary>
                  <ul>
                    {details.matches.map((match, idx) => (
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
            <tr>
              <td colSpan="2">
                <details>
            <summary>Scoring Areas</summary>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Scoring Area</th>
                  <th>Average Count</th>
                  <th>Average Cycle Time (seconds)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(averages.scoringAreas).map(([area, details]) => (
                  <tr key={area}>
              <td>{area}</td>
              <td>{details.averageCount}</td>
              <td>{details.averageCycleTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
                </details>
              </td>
            </tr>
          </tbody>
              </table>
              <h3>Match Info</h3>
              {matches
          .sort((a, b) => a.match - b.match) // Sort matches by match number
          .map((match, index) => {
            const otherTeams = matchesByNumber[match.match].filter(team => team !== teamNumber);

            return (
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
              {Object.keys(match)
                .filter(key => formatAttributeName(key).toLowerCase().includes(attributeSearchTerm.toLowerCase()))
                .sort() // Sort attributes alphabetically
                .map((key) => (
                  key !== 'scoreEvent' && key !== 'foulEvent' ? (
              <tr key={key}>
                <td>{formatAttributeName(key)}</td>
                <td>{match[key].toString()}</td>
              </tr>
                  ) : null
                ))}
              <tr>
                <td>Points Scored</td>
                <td>{calculateMatchPoints(match)}</td>
              </tr>
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
            );
          })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamStats;