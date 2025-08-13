import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TeamForm from '../components/TeamForm';
import TeamList from '../components/TeamList';
import { useAuth } from '../context/AuthContext';

const Teams = () => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axiosInstance.get('/api/teams', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTeams(response.data);
      } catch (error) {
        alert('Failed to fetch teams.');
      }
    };

    fetchTeams();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <TeamForm
        teams={teams}
        setTeams={setTeams}
        editingTeam={editingTeam}
        setEditingTeam={setEditingTeam}
      />
      <TeamList teams={teams} setTeams={setTeams} setEditingTeam={setEditingTeam} />
    </div>
  );
};

export default Teams;
