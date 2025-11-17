import React from 'react';
import { Link } from 'react-router-dom';
import { load } from '../utils/localstoragehelper';

export default function Home(){
  const teachers = load('teachers', []);
  return (
    <div className="row g-4">
      <div className="col-12 hero card-school p-4">
        <h2>Welcome to BrightFuture School</h2>
        <p className="small-muted">A warm place to learn and grow. Explore our teachers, student applications, and admin dashboard.</p>
        <Link to="/teachers" className="btn btn-accent">See Teachers</Link>
        <Link to="/students" className="btn btn-outline-secondary ms-2">See Students</Link>
      </div>

      <div className="col-md-8">
        <div className="card card-school p-3">
          <h5>About Our School</h5>
          <p className="small-muted">BrightFuture provides a caring environment and quality education for primary and secondary students.</p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card card-school p-3">
          <h6>Featured Teachers</h6>
          {teachers.length === 0 && <p className="small-muted">No teachers added yet.</p>}
          {teachers.slice(0,3).map(t => (
            <div key={t.id} className="d-flex align-items-center my-2">
              <div className="me-3 rounded-circle bg-muted" style={{width:48, height:48, background:'#eaf2fb'}}/>
              <div>
                <div style={{fontWeight:700}}>{t.name}</div>
                <div className="small-muted">{t.subject}</div>
              </div>
            </div>
          ))}
          <Link to="/teachers" className="small text-decoration-none">View all teachers →</Link>
        </div>
      </div>
    </div>
  );
}
