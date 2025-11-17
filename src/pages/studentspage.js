import React, { useEffect, useState } from 'react';
import { load, save } from '../utils/localstoragehelper';
import { initialStudents } from '../data/dummydata';
import { v4 as uuidv4 } from 'uuid';

export default function StudentsPage(){
  const [students, setStudents] = useState(() => load('students', initialStudents));
  const [form, setForm] = useState({ name:'', class:'', email:'' });
  const [editingId, setEditingId] = useState(null);

  useEffect(()=> save('students', students), [students]);

  const submit = (e) => {
    e.preventDefault();
    if(editingId){
      setStudents(prev => prev.map(s => s.id === editingId ? {...s, ...form} : s));
      setEditingId(null);
    } else {
      setStudents(prev => [{ id: uuidv4(), ...form, status:'applied' }, ...prev]);
    }
    setForm({ name:'', class:'', email:'' });
  };

  const changeStatus = (id, status) => {
    setStudents(prev => prev.map(s => s.id === id ? {...s, status} : s));
  };

  const edit = (s) => {
    setEditingId(s.id);
    setForm({ name: s.name, class: s.class, email: s.email });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = (id) => {
    if(window.confirm('Delete this student?')) setStudents(prev => prev.filter(x => x.id !== id));
  };

  return (
    <div className="row g-4">
      <div className="col-12 card card-school p-3">
        <h4>{editingId ? 'Edit Student' : 'Add Student'}</h4>
        <form onSubmit={submit} className="row g-2 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Name</label>
            <input className="form-control" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          </div>
          <div className="col-md-3">
            <label className="form-label">Class</label>
            <input className="form-control" required value={form.class} onChange={e=>setForm({...form,class:e.target.value})}/>
          </div>
          <div className="col-md-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          </div>
          <div className="col-md-2">
            <button className="btn btn-accent w-100" type="submit">{editingId ? 'Save' : 'Add'}</button>
          </div>
        </form>
      </div>

      <div className="col-12 card card-school p-3">
        <h5>Student Applications</h5>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead><tr><th>Name</th><th>Class</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.class}</td>
                  <td>{s.email}</td>
                  <td style={{textTransform:'capitalize'}}>{s.status}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-success" onClick={()=>changeStatus(s.id,'accepted')}>Accept</button>
                    <button className="btn btn-sm btn-outline-danger ms-1" onClick={()=>changeStatus(s.id,'rejected')}>Reject</button>
                    <button className="btn btn-sm btn-outline-primary ms-1" onClick={()=>edit(s)}>Edit</button>
                    <button className="btn btn-sm btn-outline-secondary ms-1" onClick={()=>remove(s.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && <tr><td colSpan="5" className="small-muted">No students yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
