import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TeamList = ({ teams, setTeams, setEditingTeam }) => {
  const { user } = useAuth();

  const handleDelete = async (teamId) => {
    try {
      await axiosInstance.delete(`/api/teams/${teamId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTeams(teams.filter((team) => team._id !== teamId));
    } catch (error) {
      alert('Failed to delete team.');
    }
  };

  
  return (
    <div>
      {teams.map((team) => (
        <div key={team._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{team.title}</h2>
          <p>{team.description}</p>
          <p className="text-sm text-gray-500">Team: {team.name}</p>
          <p className='text-sm text-gray-500'> Members: {team.members}</p>
          <p className='text-sm text-gray-500'>Skill Level: {team.skill}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingTeam(team)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(team._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamList;
