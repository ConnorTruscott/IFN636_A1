import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const EventForm = ({ events, setEvents, editingEvent, setEditingEvent }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ name: '', description: '', date: '', skill: '' });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        name: editingEvent.name,
        description: editingEvent.description,
        date: editingEvent.date,
        skill: editingEvent.skill
      });
    } else {
      setFormData({ name: '', description: '', date: '', skill: '' });
    }
  }, [editingEvent]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        const response = await axiosInstance.put(`/api/events/${editingEvent._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvents(events.map((event) => (event._id === response.data._id ? response.data : event)));
      } else {
        const response = await axiosInstance.post('/api/events', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvents([...events, response.data]);
      }
      setEditingEvent(null);
      setFormData({ name: '', description: '', date: '', skill: '' });
    } catch (error) {
      alert('Failed to save event.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingEvent ? 'Edit Event' : 'Create an Event'}</h1>
      <input
        type="text"
        placeholder="Event Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Description of Event"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 active:bg-blue-800">
        {editingEvent ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;
