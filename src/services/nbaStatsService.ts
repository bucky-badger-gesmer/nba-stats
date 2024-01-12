import axios from "axios";

const BASE_URL = "https://stats.nba.com";

const getPlayerIndex = async () => {
  try {
    console.log("trying...");
    const response = await axios.get(
      "https://stats.nba.com/stats/playerindex",
      {
        params: {
          College: "",
          Country: "",
          DraftPick: "",
          DraftRound: "",
          DraftYear: "",
          Height: "",
          Historical: "1",
          LeagueID: "00",
          Season: "2023-24",
          SeasonType: "Regular Season",
          TeamID: "0",
          Weight: "",
        },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0",
          Accept: "*/*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          Referer: "https://www.nba.com/",
          Origin: "https://www.nba.com",
          Connection: "keep-alive",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
        },
      }
    );
    console.log("response", response);
  } catch (error) {
    console.log("error", error);
    // Handle error
    console.error(error);
  }
};

export { getPlayerIndex };
