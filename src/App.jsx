// src/App.jsx
import { useEffect, useState } from "react";
import "./index.css";

const GOOGLE_SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbzv_-yXd9VSqsZTahTC82J3VNPY86fsoWVyHbw2BOb2gXigEEDWb30rKtI3LKLCQqS3EA/exec";

function App() {
  const [teams, setTeams] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch(GOOGLE_SHEET_API_URL)
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data.standings].sort((a, b) => {
          const winDiff = b.wins - a.wins;
          return winDiff !== 0 ? winDiff : b.pointDiff - a.pointDiff;
        });
        setTeams(sorted);
        setSchedule(data.schedule || []);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="app">
      <header className="header">
        <img
          src="/logo.png"
          alt="AVC Logo"
          style={{ height: "220px", width: "auto", display: "block", margin: "0 auto" }}
        />
      </header>

      <main className="main">
        {/* Standings Block */}
        <div className="cream-block">
          <img
            src="/header.png"
            alt="AVC 2025 Summer Sand League Standings banner"
            className="header-image"
          />
 <p style={{ color: "var(--color-lagoon)" }}>
           Hang on, it takes a sec. </p>
 <p style={{ color: "var(--color-lagoon)" }}>Look squished? Rotate your phone. 🔁
          </p>
          <table className="standings-table" style={{ width: "100%", tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Rank</th>
                <th style={{ width: "40%", textAlign: "left" }}>Team</th>
                <th style={{ width: "15%" }}>Wins</th>
                <th style={{ width: "15%" }}>Losses</th>
                <th style={{ width: "20%" }}>Point Differential</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => {
                const name = team.name;
                const logoSrc = `/logos/${name.toLowerCase().replace(/\s+/g, "-")}.png`;
                return (
                  <tr key={name}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img
                          src={logoSrc}
                          alt={`${name} logo`}
                          style={{ height: "45px", width: "45px", objectFit: "contain" }}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        {name}
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>{team.wins}</td>
                    <td style={{ textAlign: "center" }}>{team.losses}</td>
                    <td style={{ textAlign: "center" }}>{team.pointDiff}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Upcoming Schedule Block */}
        <div className="cream-block">
          <img
            src="/upcoming.png"
            alt="Upcoming Game Schedule"
            className="header-image"
          />
          <p style={{ color: "var(--color-lagoon)" }}>
            Each team will play two sets against two different teams for a total of <b>four sets</b> each week. There will be no third set during pool play. Games will be played to 21.
          </p>
          <p style={{ color: "var(--color-lagoon)" }}>
            Games will either be played back-to-back, or you'll have to sit for one game between. You'll never have to sit for more than one game.
          </p>
          {schedule.length > 0 ? (
            <table className="schedule-table" style={{ width: "100%", tableLayout: "fixed" }}>
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Date</th>
                  <th style={{ width: "15%" }}>Time</th>
                  <th style={{ width: "25%", textAlign: "left" }}>Team 1</th>
                  <th style={{ width: "25%", textAlign: "left" }}>Team 2</th>
                  <th style={{ width: "15%" }}>Location</th>
                </tr>
              </thead>
              <tbody>
  {schedule.map((game, idx) => (
    <tr key={idx}>
      <td>{game.date}</td>
      <td>{game.time}</td>
      <td style={{ textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={`/logos/${game.team1.toLowerCase().replace(/\s+/g, "-")}.png`}
            alt={`${game.team1} logo`}
            style={{ height: "35px", width: "35px", objectFit: "contain" }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          {game.team1}
        </div>
      </td>
      <td style={{ textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={`/logos/${game.team2.toLowerCase().replace(/\s+/g, "-")}.png`}
            alt={`${game.team2} logo`}
            style={{ height: "35px", width: "35px", objectFit: "contain" }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          {game.team2}
        </div>
      </td>
      <td>{game.location}</td>
    </tr>
  ))}
</tbody>
            </table>
          ) : (
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              Stay tuned for the schedule updates!
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
