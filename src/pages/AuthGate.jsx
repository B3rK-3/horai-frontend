import React, { useState } from "react";
import { endpoints } from "../api";

export default function AuthGate({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [status, setStatus] = useState("");
  const [canvasStatus, setCanvasStatus] = useState("");
  const [canvasToken, setCanvasToken] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      const resp = await fetch(endpoints.login(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        onAuth(data.userID);
      } else setStatus("Login failed. Check your credentials.");
    } catch (err) {
      console.error(err);
      setStatus("Network error during login.");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      const resp = await fetch(endpoints.register(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      if (resp.ok) {
        const data = await resp.json();
        console.log(data);
        onAuth(data.userID);
      } else setStatus("Registration failed. The email might already be in use.");
    } catch (err) {
      console.error(err);
      setStatus("Network error during registration.");
    }
  }

  async function saveCanvasToken(e) {
    e.preventDefault();
    if (!canvasToken.trim()) {
      setCanvasStatus("Please enter a token.");
      return;
    }
    try {
      const resp = await fetch(endpoints.login(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ canvasToken }),
      });
      const data = await resp.json().catch(() => ({}));
      if (resp.ok) {
        setCanvasStatus("Canvas Token Saved Successfully!");
        setCanvasToken("");
      } else {
        setCanvasStatus(`Error saving token: ${data.error || "Server error."}`);
      }
    } catch (err) {
      console.error(err);
      setCanvasStatus("Network error during connection.");
    }
  }

  return (
    <div className="auth-container">
      {mode === "login" ? (
        <>
          <h1>Welcome to Horai</h1>
          <p>Let the goddesses of time guide your day.</p>

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required />
            </div>

            <button type="submit" className="btn-primary">Log In</button>
          </form>

          {status && <p className="status-error">{status}</p>}

          <p>
            Don’t have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMode("register");
              }}
            >
              Register here
            </a>
          </p>

          <hr />

          <div className="lms-connect-section">
            <h3>Canvas LMS Token</h3>
            <form onSubmit={saveCanvasToken} className="auth-form">
              <div className="form-group">
                <label htmlFor="canvas-token-input">Canvas API Token</label>
                <input
                  id="canvas-token-input"
                  type="text"
                  value={canvasToken}
                  onChange={(e) => setCanvasToken(e.target.value)}
                  placeholder="Paste your generated Canvas token here"
                />
              </div>
              <button type="submit" className="btn-secondary">
                Save Canvas Token
              </button>
            </form>
            {canvasStatus && (
              <p className="status-message">{canvasStatus}</p>
            )}
          </div>
        </>
      ) : (
        <>
          <h1>Create Your Account</h1>
          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required />
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email</label>
              <input id="reg-email" name="email" type="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <input id="reg-password" name="password" type="password" required />
            </div>

            <button type="submit" className="btn-primary">Register</button>
          </form>

          {status && <p className="status-error">{status}</p>}

          <p>
            Already have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMode("login");
              }}
            >
              Log in here
            </a>
          </p>
        </>
      )}
    </div>
  );
}
