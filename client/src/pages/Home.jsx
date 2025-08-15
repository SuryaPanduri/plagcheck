import { useEffect, useState } from 'react';
import api from '../api/client';

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { api.get('/posts').then(r => setPosts(r.data.posts || [])); }, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Public Posts</h1>
      <ul className="space-y-3">
        {posts.map(p => (
          <li key={p.id} className="p-4 rounded border bg-white">
            <h3 className="font-medium">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.body}</p>
            <p className="text-xs text-gray-400 mt-1">by {p.author?.name || 'Unknown'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}