import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TeamForm = ({ teams, setTeams, editingTeam, setEditingTeam }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: '', members: '', skill: '' });

  useEffect(() => {
    if (editingTeam) {
      setFormData({
        name: editingTeam.name,
        members: editingTeam.members,
        skill: editingTeam.skill,
      });
    } else {
      setFormData({ name: '', members: '', skill: '' });
    }
  }, [editingTeam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTeam) {
        const response = await axiosInstance.put(`/api/teams/${editingTeam._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTeams(teams.map((team) => (team._id === response.data._id ? response.data : team)));
      } else {
        const response = await axiosInstance.post('/api/teams', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTeams([...teams, response.data]);
      }
      setEditingTeam(null);
      setFormData({ name: '', members: '', skill: '' });
    } catch (error) {
      alert('Failed to save team.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingTeam ? 'Team Management: Edit Operation' : 'Team Creation: Create Operation'}</h1>
      <input
        type="text"
        placeholder="Team Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Members"
        value={formData.members}
        onChange={(e) => setFormData({ ...formData, members: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        value={formData.skill}
        onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingTeam ? 'Update Button' : 'Create Button'}
      </button>
    </form>
  );
};

export default TeamForm;
