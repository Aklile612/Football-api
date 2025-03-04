import React, { useEffect, useState } from "react";
import { getDateRange } from "./date";

const WeeklyMatches = () => {
  const { today, future } = getDateRange();
  
  const API_URL = `/v4/competitions/PL/matches?dateFrom=${today}&dateTo=${future}`;
  const API_KEY = "4dfb0510f92844e48e79acee2a2127ba";

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchWeeklyMatches = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            "X-Auth-Token": API_KEY,
            "Accept": "application/json"
          },
        });
        console.log(response.status);
        

        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }
         // Directly parse JSON without calling .text()
         const data = await response.json();  
        console.log("Parsed JSON Response:", data); 


        

        if (data.matches) {
          setMatches(data.matches); // Store the match data in the state
        } else {
          console.log("No matches found for the given date range");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWeeklyMatches(); // Call the function to fetch the matches when the component mounts
  }, [today, future]); // This will re-run if `today` or `future` change

  return(
    <div >
      <h3>Weekly Premier League Matches</h3><br/>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match, index) => (
            <li className="week" key={index}>
                <div className="all">
                    <div className="teams">
                        <img src={match.homeTeam.crest} alt="home team flag" /><p>{match.homeTeam.tla}</p> 
                    </div>
                    <div className="teams"><p>vs</p></div>
                    <div className="teams">
                       <img src={match.awayTeam.crest} alt="away team flag"/><p>{match.awayTeam.tla}</p>
                    </div> 
                    
                </div>
                <div className="dates">
                <p> Date:{new Date(match.utcDate).toLocaleDateString()}</p>
                <p>Time:{new Date(match.utcDate).toLocaleTimeString()}</p>
                </div>
            </li>
            
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  )
};

export default WeeklyMatches;
