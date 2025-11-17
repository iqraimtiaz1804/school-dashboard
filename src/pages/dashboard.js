import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import TeachersPage from './teacherspage';
import StudentsPage from './studentspage';
import { load,save } from '../utils/localstoragehelper';
import { logout } from '../utils/auth';
import { initialTeachers, initialStudents } from '../data/dummydata';

export default function Dashboard(){
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTeachers(load('teachers', []));
    setStudents(load('students', []));
  }, []);

  const acceptedCount = students.filter(s=>s.status === 'accepted').length;
  const appliedCount = students.filter(s=>s.status === 'applied').length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="row g-4">
      <div className="col-12 card card-school p-3 d-flex justify-content-between align-items-center">
        <div>
          <h4>Admin Dashboard</h4>
          <p className="small-muted">Overview and management controls for teachers and student applications.</p>
        </div>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={()=>navigate('/')}>View Site</button>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card card-school p-3 text-center">
          <div className="small-muted">Teachers</div>
          <div className="kpi">{teachers.length}</div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card card-school p-3 text-center">
          <div className="small-muted">Applied Students</div>
          <div className="kpi">{appliedCount}</div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card card-school p-3 text-center">
          <div className="small-muted">Accepted Students</div>
          <div className="kpi">{acceptedCount}</div>
        </div>
      </div>

      <div className="col-12 card card-school p-3">
        <h5>Quick Links</h5>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-primary" to="teachers">Manage Teachers</Link>
          <Link className="btn btn-outline-primary" to="students">Manage Students</Link>
        </div>

        <div className="mt-3">
          <Routes>
            <Route path="/" element={<p className="small-muted">Use the buttons above to open teacher or student management views within dashboard.</p>} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="students" element={<StudentsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
