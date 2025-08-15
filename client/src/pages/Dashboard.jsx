import { useEffect, useState } from 'react';
import api from '../api/client';

export default function Dashboard() {
  const [form, setForm] = useState({ title: '', body: '' });
  const [posts, setPosts] = useState([]);
  const load = () => api.get('/posts').then(r => setPosts(r.data.posts || []));
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await api.post('/posts', form);
    setForm({ title: '', body: '' });
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <form onSubmit={create} className="space-y-3 max-w-md">
        <input className="w-full border p-2 rounded" placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        <textarea className="w-full border p-2 rounded" placeholder="Body" rows="4" value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} />
        <button className="px-4 py-2 rounded bg-gray-900 text-white">Create Post</button>
      </form>
      <ul className="space-y-3">
        {posts.map(p => (
          <li key={p.id} className="p-4 rounded border bg-white">
            <h3 className="font-medium">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}