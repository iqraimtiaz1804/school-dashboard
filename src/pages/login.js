import React, { useState } from 'react';
import { login, isLoggedIn } from '../utils/auth';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (isLoggedIn()) return <Navigate to="/dashboard" replace />;

  const submit = (e) => {
    e.preventDefault();
    const ok = login(form);
    if(ok) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use admin@school.com / admin123');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card card-school p-4">
          <h4>Admin Login</h4>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-accent">Login</button>
            <p className="mt-2 small-muted">Admin credentials: admin@school.com / admin123</p>
          </form>
        </div>
      </div>
    </div>
  );
}
