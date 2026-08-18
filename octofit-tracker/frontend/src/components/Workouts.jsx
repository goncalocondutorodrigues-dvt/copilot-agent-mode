import { useEffect, useState } from 'react';
import { fetchApiData } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        const data = await fetchApiData('/api/workouts/');
        setWorkouts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workouts');
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading workouts...</p></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const getDifficultyBadge = (difficulty) => {
    const badgeClass = {
      easy: 'bg-success',
      medium: 'bg-warning',
      hard: 'bg-danger',
    }[difficulty] || 'bg-secondary';

    return <span className={`badge ${badgeClass}`}>{difficulty}</span>;
  };

  return (
    <div className="container mt-5">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Duration (min)</th>
                <th>Difficulty</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id}>
                  <td>{workout.name}</td>
                  <td>{workout.description}</td>
                  <td>{workout.duration}</td>
                  <td>{getDifficultyBadge(workout.difficulty)}</td>
                  <td>{new Date(workout.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
