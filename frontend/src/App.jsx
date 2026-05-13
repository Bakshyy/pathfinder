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
        throw new Error("Failed to send command");
      }

      setLastCommand(command);
      setStatus(`Sent: linear=${linear}, angular=${angular}`);
    } catch (error) {
      console.error(error);
      setStatus("Backend connection failed");
    }
  }

  return (
    <div className="app">
      <h1>Pathfinder Teleop</h1>
      <p className="status">{status}</p>

      <div className="control-pad">
        <button className="btn forward" onClick={() => sendCommand(1, 0)}>
          ↑
        </button>

        <div className="middle-row">
          <button className="btn left" onClick={() => sendCommand(0, 1)}>
            ←
          </button>

          <button className="btn stop" onClick={() => sendCommand(0, 0)}>
            STOP
          </button>

          <button className="btn right" onClick={() => sendCommand(0, -1)}>
            →
          </button>
        </div>

        <button className="btn reverse" onClick={() => sendCommand(-1, 0)}>
          ↓
        </button>
      </div>

      <div className="telemetry-card">
        <h2>Last Command</h2>
        <p>Linear: {lastCommand.linear}</p>
        <p>Angular: {lastCommand.angular}</p>
      </div>
    </div>
  );
}

export default App;