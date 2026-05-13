import { useState } from "react";
import "./App.css";

const API_URL = "http://192.168.50.160:8000";

function App() {
  const [lastCommand, setLastCommand] = useState({ linear: 0, angular: 0 });
  const [status, setStatus] = useState("Ready");

  async function sendCommand(linear, angular) {
    const command = { linear, angular };

    try {
      const response = await fetch(`${API_URL}/teleop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
      });

      if (!response.ok) {
        throw new Error("Backend rejected command");
      }

      setLastCommand(command);
      setStatus(`Command sent: linear=${linear}, angular=${angular}`);
    } catch (error) {
      console.error(error);
      setStatus("Backend connection failed");
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Pathfinder</h1>
        <p>Local Teleoperation Interface</p>
      </header>

      <section className="status-card">
        <p className="status-label">Status</p>
        <p className="status-text">{status}</p>
      </section>

      <section className="control-pad">
        <button className="control-button forward" onClick={() => sendCommand(1, 0)}>
          ↑
        </button>

        <div className="middle-row">
          <button className="control-button left" onClick={() => sendCommand(0, 1)}>
            ←
          </button>

          <button className="control-button stop" onClick={() => sendCommand(0, 0)}>
            STOP
          </button>

          <button className="control-button right" onClick={() => sendCommand(0, -1)}>
            →
          </button>
        </div>

        <button className="control-button reverse" onClick={() => sendCommand(-1, 0)}>
          ↓
        </button>
      </section>

      <section className="telemetry-card">
        <h2>Last Command</h2>
        <div className="telemetry-row">
          <span>Linear</span>
          <strong>{lastCommand.linear}</strong>
        </div>
        <div className="telemetry-row">
          <span>Angular</span>
          <strong>{lastCommand.angular}</strong>
        </div>
      </section>
    </div>
  );
}

export default App;