import React from 'react';

export default function Footer(){
  return (
    <footer className="footer mt-5">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6 mb-2">
            <h5 className="text-white">BrightFuture School</h5>
            <p className="small-muted">123 School Road, Lahore • +92 42 555 4444 • info@brightfuture.edu</p>
          </div>
          <div className="col-md-6">
            <p className="small-muted">© {new Date().getFullYear()} BrightFuture School. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
