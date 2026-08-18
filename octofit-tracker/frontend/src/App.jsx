import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getBaseApiUrl } from './utils/api';

function App() {
  const apiUrl = getBaseApiUrl();

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              🏋️ Octofit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container mt-5">
                  <div className="row">
                    <div className="col-md-8 mx-auto">
                      <h1 className="mb-4">Welcome to Octofit Tracker</h1>
                      <p className="lead">
                        Track your workouts, compete with friends, and achieve your fitness goals!
                      </p>
                      <div className="alert alert-info mt-4">
                        <strong>API Base URL:</strong>
                        <br />
                        <code>{apiUrl}</code>
                      </div>
                      <div className="row mt-5">
                        <div className="col-md-6 mb-3">
                          <Link to="/activities" className="btn btn-primary btn-lg w-100">
                            📊 Activities
                          </Link>
                        </div>
                        <div className="col-md-6 mb-3">
                          <Link to="/leaderboard" className="btn btn-success btn-lg w-100">
                            🏆 Leaderboard
                          </Link>
                        </div>
                        <div className="col-md-6 mb-3">
                          <Link to="/teams" className="btn btn-warning btn-lg w-100">
                            👥 Teams
                          </Link>
                        </div>
                        <div className="col-md-6 mb-3">
                          <Link to="/users" className="btn btn-info btn-lg w-100">
                            👤 Users
                          </Link>
                        </div>
                        <div className="col-md-6 mb-3">
                          <Link to="/workouts" className="btn btn-danger btn-lg w-100">
                            💪 Workouts
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-light py-4 mt-5">
          <div className="container text-center">
            <p className="mb-0">
              &copy; 2024 Octofit Tracker. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
