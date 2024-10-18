import json
import random
from datetime import datetime, timedelta

def generate_random_time(start):
    end = start + timedelta(seconds=random.randint(1, 10))
    return end.isoformat() + 'Z'

def generate_score_events(num_events):
    locations = ["Source Area", "Amp/Speaker Area", "Mid Field", "Source Area Human Fed"]
    places = ["Amped Speaker", "Speaker", "Amp", "Trap", "Pass", "Dropped/Destroyed", "Missed"]
    events = []
    last_time = datetime.utcnow()

    for _ in range(num_events):
        pickup_time = last_time
        score_time = generate_random_time(pickup_time)
        events.append({
            "pickupTime": pickup_time.isoformat() + 'Z',
            "pickupLocation": random.choice(locations),
            "scorePlace": random.choice(places),
            "scoreTime": score_time
        })
        last_time = datetime.fromisoformat(score_time[:-1])

    return events

def generate_foul_events(num_events):
    foul_types = ["More than 5 second pin", "Illegal defense", "Out of bounds"]
    events = []
    last_time = datetime.utcnow()

    for _ in range(num_events):
        foul_time = generate_random_time(last_time)
        events.append({
            "foulTime": foul_time,
            "foulType": random.choice(foul_types)
        })
        last_time = datetime.fromisoformat(foul_time[:-1])

    return events

def generate_match(station, team_number, match_number):
    no_show = random.random() < 0.1
    return {
        "station": station,
        "teamNumber": team_number,
        "noShow": no_show,
        "preloaded": not no_show and random.random() < 0.5,
        "startArea": random.choice(["A", "B", "C"]),
        "match": str(match_number),
        "autonNotes": 0 if no_show else random.randint(0, 10),
        "autonNoteAttempts": 0 if no_show else random.randint(0, 5),
        "leftAutonZone": not no_show and random.random() < 0.5,
        "usedNoteA": not no_show and random.random() < 0.5,
        "usedNoteB": not no_show and random.random() < 0.5,
        "usedNoteC": not no_show and random.random() < 0.5,
        "usedNoteD": not no_show and random.random() < 0.5,
        "usedNoteE": not no_show and random.random() < 0.5,
        "usedNoteF": not no_show and random.random() < 0.5,
        "usedNoteG": not no_show and random.random() < 0.5,
        "usedNoteH": not no_show and random.random() < 0.5,
        "scoreEvent": [] if no_show else generate_score_events(random.randint(0, 20)),
        "foulEvent": [] if no_show else generate_foul_events(random.randint(0, 5)),
        "sideClimb": not no_show and random.random() < 0.5,
        "climbSpeed": "No Climb" if no_show else random.choice(["Slow", "Medium", "Fast"]),
        "spotlit": not no_show and random.random() < 0.5,
        "robotRemarks": "" if no_show else random.choice(["Great job!", "Needs improvement", "Boooo"]),
        "matchScoreRed": "" if no_show else str(random.randint(0, 100)),
        "matchScoreBlue": "" if no_show else str(random.randint(0, 100)),
        "passUnderChain": not no_show and random.random() < 0.5,
        "recievedRedCard": not no_show and random.random() < 0.1,
        "recievedYellowCard": not no_show and random.random() < 0.2
    }

def generate_data(num_matches):
    stations = ["blue1", "blue2", "blue3", "red1", "red2", "red3"]
    teams = [
    "3539", "33", "254", "118", "1678", "2056", "1114", "148", "971", "1671",
    "1986", "330", "111", "71", "469", "987", "1111", "195", "125", "16",
    "27", "67", "217", "233", "359", "610", "1023"
]
    data = {station: {"matches": []} for station in stations}
    num_teams = len(teams)
    matches_per_team = num_matches * len(stations) // num_teams

    # Ensure each team plays the same number of matches
    team_matches = {team: [] for team in teams}
    match_number = 1

    for _ in range(num_matches):
        random.shuffle(teams)
        for i in range(0, num_teams, len(stations)):
            match_teams = teams[i:i + len(stations)]
            for station, team in zip(stations, match_teams):
                team_matches[team].append(match_number)
                data[station]["matches"].append(generate_match(station, team, match_number))
            match_number += 1

    return data

data = generate_data(10)  # Generate 10 matches for each station

# Write each station's data to a separate file
for station, station_data in data.items():
    filename = f'data-10-16-2024_22-14-07-{station}.json'
    with open(filename, 'w') as f:
        json.dump(station_data, f, indent=2)