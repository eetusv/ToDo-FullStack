import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/profile', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          navigate('/login');
        }
      });
  }, [navigate]);

  const fetchTodos = async () => {
    try {
      const res = await fetch('http://localhost:3001/todos', {
        credentials: 'include',
      });
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      alert('Failed to fetch todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        setTitle('');
        setDescription('');
        fetchTodos();
      } else {
        alert('Error creating todo');
      }
    } catch (err) {
      alert('Error creating todo');
      console.error('Error creating todo:', err);
    }
  };

  const startEditing = (todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  const cancelEditing = () => {
    setEditingTodo(null);
    setTitle('');
    setDescription('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/todos/${editingTodo._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        setEditingTodo(null);
        setTitle('');
        setDescription('');
        fetchTodos();
      } else {
        alert('Error updating todo');
      }
    } catch (err) {
      alert('Error updating todo');
      console.error('Error updating todo:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;

    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        fetchTodos();
      } else {
        alert('Error deleting todo');
      }
    } catch (err) {
      alert('Error deleting todo');
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="container my-4 p-4 bg-light rounded shadow-sm">
      <h2 className="text-secondary mb-4">{editingTodo ? 'Edit Task' : 'New Task'}</h2>
      <form onSubmit={editingTodo ? handleUpdate : handleCreate}>
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <br />
        <button type="submit" className="btn btn-primary me-2 btn-lg w-25">{editingTodo ? 'Save' : 'Add'}</button>
        {editingTodo && <button type="button" className="btn btn-secondary btn-lg w-25" onClick={cancelEditing}>Cancel</button>}
      </form>

      <h3 className="mt-5 mb-3 text-secondary">Your Tasks</h3>
      {todos.length === 0 && <p className="text-secondary">No tasks found.</p>}
      <ul className="list-group">
        {todos.map(todo => (
          <li key={todo._id} className="list-group-item d-flex flex-column">
            <strong className="text-primary">{todo.title}</strong><br />
            <em className="text-muted text-secondary">{todo.description}</em><br />
            <div className="mt-2 row">
              <button className="col btn btn-sm btn-outline-secondary me-2" onClick={() => startEditing(todo)}>Edit</button>
              <button className="col btn btn-sm btn-outline-danger" onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
