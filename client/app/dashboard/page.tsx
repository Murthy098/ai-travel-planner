'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [form, setForm] = useState({ destination: '', days: '', budget: 'Medium', interests: '' });
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, days: Number(form.days), interests: form.interests.split(',') }),
      });
      const data = await res.json();
      setTrip(data);
    } catch (err) {
      alert('Error generating trip');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-blue-900 text-white px-8 py-4 flex justify-between">
        <h1 className="text-xl font-bold">✈️ AI Travel Planner</h1>
        <button onClick={() => { localStorage.removeItem('token'); router.push('/'); }} className="text-white border border-white px-4 py-1 rounded">Logout</button>
      </nav>

      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Plan Your Trip</h2>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow mb-8 flex flex-col gap-4">
          <input type="text" placeholder="Destination (e.g. Tokyo, Japan)" className="border p-3 rounded-lg" value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} required />
          <input type="number" placeholder="Number of Days" className="border p-3 rounded-lg" value={form.days} onChange={e => setForm({...form, days: e.target.value})} required />
          <select className="border p-3 rounded-lg" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input type="text" placeholder="Interests (e.g. Food, Culture, Adventure)" className="border p-3 rounded-lg" value={form.interests} onChange={e => setForm({...form, interests: e.target.value})} />
          <button type="submit" className="bg-blue-900 text-white py-3 rounded-lg font-semibold">
            {loading ? 'Generating...' : '🚀 Generate Itinerary'}
          </button>
        </form>

        {trip && (
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Your Trip to {trip.destination}</h3>
            {trip.itinerary?.map((day) => (
              <div key={day.day} className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-blue-800">Day {day.day}</h4>
                {day.activities?.map((a, i) => <p key={i} className="text-gray-700">• {a}</p>)}
              </div>
            ))}
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-bold text-yellow-800">💰 Estimated Budget</h4>
              <p>Flights: ${trip.estimatedBudget?.flights}</p>
              <p>Accommodation: ${trip.estimatedBudget?.accommodation}</p>
              <p>Food: ${trip.estimatedBudget?.food}</p>
              <p>Activities: ${trip.estimatedBudget?.activities}</p>
              <p className="font-bold">Total: ${trip.estimatedBudget?.total}</p>
            </div>
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <h4 className="font-bold text-green-800">🏨 Recommended Hotels</h4>
              {trip.hotels?.map((h, i) => <p key={i}>• {h.name} - {h.type}</p>)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}