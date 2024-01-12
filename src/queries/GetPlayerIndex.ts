import { gql } from "@apollo/client";

const GET_PLAYER_INDEX = gql`
  query GetPlayerIndex {
    playerIndex {
      active
      career {
        fromYear
        toYear
      }
      college
      country
      draft {
        year
        round
        pick
      }
      firstName
      headlineStats {
        points
        rebounds
        assists
        timeFrame
      }
      height
      id
      jerseyNumber
      playerSlug
      lastName
      position
      team {
        id
        slug
        city
        name
        abbreviation
      }
      weight
    }
  }
`;

export default GET_PLAYER_INDEX;
