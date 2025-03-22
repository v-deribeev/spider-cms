export default {
  match: {
    stadium: 'Stadium: {name}',
    referee: 'Referee: {name}',
    homeTeam: 'Home Team {name}',
    awayTeam: 'Away Team {name}',
    noData: 'No match information available',
    error: 'Failed to load data. Please try again.',
    cards: {
      yellow: '{count} yellow cards',
      red: '{count} red cards',
    },
  },
  table: {
    columns: {
      number: 'No',
      name: 'Name',
      position: 'Position',
      cards: 'Cards',
    },
    positions: {
      G: 'Goalkeeper',
      D: 'Defender',
      M: 'Midfielder',
      A: 'Attacker',
    },
  },
  buttons: {
    addYellowCard: 'Add yellow card',
    addRedCard: 'Add red card',
    reset: 'Reset cards',
  },
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    noData: 'No data available',
    tba: 'TBA',
  },
}
