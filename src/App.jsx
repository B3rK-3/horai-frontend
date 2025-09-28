import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import CalendarPage from './pages/CalendarPage'
import AuthGate from './pages/AuthGate'
import ConnectionsPage from './pages/ConnectionsPage'
import AwardsPage from './pages/AwardsPage'
import ChatPage from './pages/ChatPage'
import ChatWidget from './components/ChatWidget'

export default function App() {
  const [userID, setUserID] = useState(null)

  const funcSetUser = (userId) => {
    setUserID(userId);
    localStorage.setItem('userID', userId)
    console.log(userId)
  }
  if (!localStorage.getItem('userID')) return <AuthGate onAuth={funcSetUser} />

  const Protected = ({ children }) => children
  const handleLogout = () => {setUserID(null); localStorage.removeItem('userID')}

  return (
    <div id="app">
      <div id="main-app-container" style={{ display: 'block' }}>
        <Navbar onLogout={handleLogout} />
        <ChatWidget backendBase="https://horai-dun.vercel.app" />
        <div className="container" id="page-content">
          <Routes>
            <Route
              path="/calendar"
              element={
                <Protected>
                  <CalendarPage/>
                </Protected>
              }
            />
            <Route
              path="/connections"
              element={
                <Protected>
                  <ConnectionsPage />
                </Protected>
              }
            />
            <Route
              path="/chat"
              element={
                <Protected>
                  <ChatPage />
                </Protected>
              }
            />
            <Route
              path="/awards"
              element={
                <Protected>
                  <AwardsPage />
                </Protected>
              }
            />
            <Route path="*" element={<Navigate to="/calendar" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
