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
      <h1 className="text-2xl font-bold mb-4">{editingTeam ? 'Edit Team' : 'Create a Team'}</h1>
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
      <div className='mb-4'>
        <p className='mb-2'>Skill Level</p>

        <label className='flex items-center space-x-2'>
          <input
          type = 'radio'
          name='skill'
          value='Beginner'
          checked={formData.skill === 'Beginner'}
          onChange={(e) => setFormData({...formData, skill: e.target.value})}
          />
          Beginner
        </label>

        <label className='flex items-center space-x-2'>
          <input
          type = 'radio'
          name='skill'
          value='Intermediate'
          checked={formData.skill === 'Intermediate'}
          onChange={(e) => setFormData({...formData, skill: e.target.value})}
          />
          Intermediate
        </label>

        <label className='flex items-center space-x-2'>
          <input
          type = 'radio'
          name='skill'
          value='Advanced'
          checked={formData.skill === 'Advanced'}
          onChange={(e) => setFormData({...formData, skill: e.target.value})}
          />
          Advanced
        </label>
        

      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingTeam ? 'Update Team' : 'Create Team'}
      </button>
    </form>
  );
};

export default TeamForm;
