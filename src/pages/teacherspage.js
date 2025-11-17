import React, { useEffect, useState } from 'react';
import { load, save } from '../utils/localstoragehelper';
import { initialTeachers } from '../data/dummydata';
import { v4 as uuidv4 } from 'uuid';

export default function TeachersPage(){
  const [teachers, setTeachers] = useState(() => load('teachers', initialTeachers));
  const [form, setForm] = useState({ name:'', subject:'', email:'', phone:'' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { save('teachers', teachers); }, [teachers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editingId){
      setTeachers(prev => prev.map(t => t.id === editingId ? { ...t, ...form } : t));
      setEditingId(null);
    } else {
      setTeachers(prev => [{ id: uuidv4(), ...form }, ...prev]);
    }
    setForm({ name:'', subject:'', email:'', phone:'' });
  };

  const handleEdit = (t) => {
    setEditingId(t.id);
    setForm({ name: t.name, subject: t.subject, email: t.email, phone: t.phone });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if(window.confirm('Delete this teacher?')) setTeachers(prev => prev.filter(x => x.id !== id));
  };

  return (
    <div className="row g-4">
      <div className="col-12 card card-school p-3">
        <h4>{editingId ? 'Edit Teacher' : 'Add Teacher'}</h4>
        <form onSubmit={handleSubmit} className="row g-2 align-items-end">
          <div className="col-md-3">
            <label className="form-label">Name</label>
            <input className="form-control" required value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
          </div>
          <div className="col-md-2">
            <label className="form-label">Subject</label>
            <input className="form-control" required value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
          </div>
          <div className="col-md-2">
            <label className="form-label">Phone</label>
            <input className="form-control" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
          </div>
          <div className="col-md-2">
            <button className="btn btn-accent w-100" type="submit">{editingId ? 'Save' : 'Add'}</button>
          </div>
        </form>
      </div>

      <div className="col-12 card card-school p-3">
        <h5>All Teachers</h5>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr><th>Name</th><th>Subject</th><th>Email</th><th>Phone</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {teachers.map(t => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.subject}</td>
                  <td>{t.email}</td>
                  <td>{t.phone}</td>
                  <td className="table-actions">
                    <button className="btn btn-sm btn-outline-primary" onClick={()=>handleEdit(t)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger ms-2" onClick={()=>handleDelete(t.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {teachers.length === 0 && <tr><td colSpan="5" className="small-muted">No teachers yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
