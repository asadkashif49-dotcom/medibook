import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <section className="hero-shell rounded-5 p-4 p-lg-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-7">
            <div className="hero-copy">
              <p className="text-warning fw-semibold text-uppercase small mb-3">Healthcare booking, elevated</p>
              <h1 className="display-5 fw-bold mb-3">Book care with clarity, speed, and confidence.</h1>
              <p className="lead text-muted mb-4">Discover trusted specialists, manage appointments in one place, and enjoy a beautifully simple healthcare experience.</p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                <Link className="btn btn-primary btn-lg rounded-pill px-4" to="/doctors">Browse Doctors</Link>
                <Link className="btn btn-outline-primary btn-lg rounded-pill px-4" to="/bookings">View Bookings</Link>
              </div>
              <div className="d-flex flex-wrap gap-3">
                <div className="stat-pill"><strong>500+</strong><span>Doctors</span></div>
                <div className="stat-pill"><strong>4.9★</strong><span>Patient Rating</span></div>
                <div className="stat-pill"><strong>24/7</strong><span>Support</span></div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="feature-card rounded-4 p-4 position-relative">
              <span className="feature-badge mb-3">Premium care</span>
              <h4 className="fw-bold mb-3">Why patients choose MediBook</h4>
              <ul className="mb-0 ps-3 text-white-50">
                <li>Fast doctor discovery</li>
                <li>Validated appointment booking</li>
                <li>Secure local booking history</li>
                <li>Elegant experience on every device</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-card rounded-4 p-4 p-lg-5 mt-4">
        <h2 className="h4 fw-bold mb-3 section-title">Project requirements covered</h2>
        <div className="row g-3">
          <div className="col-md-6 col-lg-4">
            <div className="p-3 rounded-3 quick-action h-100">
              <strong>Responsive design</strong>
              <div className="small text-muted mt-1">Optimized for desktop, tablet, and mobile.</div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="p-3 rounded-3 quick-action h-100">
              <strong>Reusable components</strong>
              <div className="small text-muted mt-1">Built with reusable cards, forms, and layout blocks.</div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="p-3 rounded-3 quick-action h-100">
              <strong>React hooks</strong>
              <div className="small text-muted mt-1">Uses state, effects, memo, and routes for smooth interactions.</div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="p-3 rounded-3 quick-action h-100">
              <strong>Form validation</strong>
              <div className="small text-muted mt-1">Booking details are checked before submission.</div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="p-3 rounded-3 quick-action h-100">
              <strong>CRUD + local storage</strong>
              <div className="small text-muted mt-1">Create, view, update, delete, and persist bookings locally.</div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="p-3 rounded-3 quick-action h-100">
              <strong>Search & filters</strong>
              <div className="small text-muted mt-1">Doctors can be found quickly by name, specialty, and availability.</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
