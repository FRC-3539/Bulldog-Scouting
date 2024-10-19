import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const calculateAverages = (matches) => {
  const totalMatches = matches.length;
  const averages = {
    pointsAttributed: 0,
  };

  matches.forEach(match => {
    averages.pointsAttributed += calculateMatchPoints(match);
  });

  averages.pointsAttributed = (averages.pointsAttributed / totalMatches).toFixed(2);

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

const TeamRankings = ({ data, onTeamSelect }) => {
  const teams = data.matches.reduce((acc, match) => {
    const teamNumber = match.teamNumber;
    if (!acc[teamNumber]) {
      acc[teamNumber] = [];
    }
    acc[teamNumber].push(match);
    return acc;
  }, {});

  const teamAverages = Object.keys(teams).map(teamNumber => {
    const matches = teams[teamNumber];
    const averages = calculateAverages(matches);
    return { teamNumber, pointsAttributed: averages.pointsAttributed };
  });

  const sortedTeams = teamAverages.sort((a, b) => b.pointsAttributed - a.pointsAttributed);

  const chartData = {
    labels: sortedTeams.map(team => team.teamNumber),
    datasets: [
      {
        label: 'Average Points Attributed',
        data: sortedTeams.map(team => team.pointsAttributed),
        backgroundColor: 'rgba(75, 192, 192, 0.9)', // 90% opacity
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
        beginAtZero: true,
        grid: {
          color: '#333333'
        },
        title: {
          display: true,
          text: 'Average Points Attributed'
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true,
    aspectRatio: 2, // Make the chart a little smaller
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const teamNumber = sortedTeams[index].teamNumber;
        onTeamSelect(teamNumber);
      }
    },
    onHover: (event, elements) => {
      event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
    }
  };

  return (
    <div>
      <h2>Team Rankings by Average Points Attributed</h2>
      <div style={{ height: '300px' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Number</th>
            <th>Average Points Attributed</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => (
            <tr key={team.teamNumber}>
              <td>{index + 1}</td>
              <td>{team.teamNumber}</td>
              <td>{team.pointsAttributed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamRankings;