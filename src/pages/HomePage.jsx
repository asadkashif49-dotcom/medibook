import { Link } from 'react-router-dom';

const featureTiles = [
  {
    title: 'Same-Day Appointments',
    text: 'Reserve urgent slots and premium specialist visits in under a minute.'
  },
  {
    title: 'Hospital-grade Search',
    text: 'Browse 30+ clinicians by specialty, availability, and patient rating.'
  },
  {
    title: 'Unified Care Dashboard',
    text: 'Track upcoming bookings, edit visits, and manage personal health scheduling.'
  }
];

const careHighlights = [
  '24/7 scheduling and patient support',
  'Multi-specialty physicians and specialists',
  'Secure local booking history and updates',
  'Premium UI designed for hospital-style trust'
];

export default function HomePage() {
  return (
    <>
      <section className="hero-shell rounded-5 p-4 p-lg-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-7">
            <div className="hero-copy">
              <p className="text-warning fw-semibold text-uppercase small mb-3">MediBook Hospital Network</p>
              <h1 className="display-5 fw-bold mb-3">Premium care booking for modern hospitals and families.</h1>
              <p className="lead text-muted mb-4">Find trusted doctors, compare specialist care, and schedule visits with a polished experience built to feel like a real medical brand website.</p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                <Link className="btn btn-primary btn-lg rounded-pill px-4 d-inline-flex align-items-center gap-2" to="/doctors">
                  <span className="btn-icon">▶</span>
                  Browse Doctors
                </Link>
                <Link className="btn btn-outline-primary btn-lg rounded-pill px-4 d-inline-flex align-items-center gap-2" to="/bookings">
                  <span className="btn-icon">🗓</span>
                  My Bookings
                </Link>
              </div>
              <div className="d-flex flex-wrap gap-3">
                <div className="stat-pill"><strong>32+</strong><span>Specialists</span></div>
                <div className="stat-pill"><strong>4.9★</strong><span>Patient Rating</span></div>
                <div className="stat-pill"><strong>24/7</strong><span>Emergency Support</span></div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="feature-card rounded-4 p-4 position-relative">
              <span className="feature-badge mb-3">Why patients trust us</span>
              <h4 className="fw-bold mb-3">A premium healthcare booking experience</h4>
              <ul className="mb-3 ps-3 text-white-50">
                {careHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="d-grid gap-2 mt-3">
                <div className="mini-panel">VIP consult support</div>
                <div className="mini-panel">Doctor-led care matching</div>
                <div className="mini-panel">Fast follow-up scheduling</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-card rounded-4 p-4 p-lg-5 mt-4">
        <div className="d-flex justify-content-between flex-wrap align-items-center gap-3 mb-4">
          <div>
            <p className="text-warning fw-semibold text-uppercase small mb-1">Hospital features</p>
            <h2 className="h4 fw-bold mb-0 section-title">Designed for advanced patient care</h2>
          </div>
          <Link className="btn btn-outline-primary rounded-pill" to="/doctors">Explore all specialists</Link>
        </div>
        <div className="row g-3">
          {featureTiles.map((feature) => (
            <div className="col-md-6 col-lg-4" key={feature.title}>
              <div className="p-3 rounded-3 quick-action h-100">
                <strong>{feature.title}</strong>
                <div className="small text-muted mt-1">{feature.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-card rounded-4 p-4 p-lg-5 mt-4">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <p className="text-warning fw-semibold text-uppercase small mb-2">How it works</p>
            <h3 className="h3 fw-bold mb-3 section-title">Seamless booking from search to confirmation</h3>
            <div className="d-grid gap-3">
              <div className="step-tile">
                <strong>1. Discover</strong>
                <div className="small text-muted mt-1">Search by specialty, availability, and top-rated physicians.</div>
              </div>
              <div className="step-tile">
                <strong>2. Select</strong>
                <div className="small text-muted mt-1">Review profiles, fees, and department placement before booking.</div>
              </div>
              <div className="step-tile">
                <strong>3. Confirm</strong>
                <div className="small text-muted mt-1">Save visits locally and update or cancel appointment details anytime.</div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="glass-highlight rounded-4 p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge rounded-pill bg-warning-subtle text-warning-emphasis">Top-tier care</span>
                <span className="text-muted small">Medical excellence</span>
              </div>
              <h4 className="fw-bold mb-2">Trusted care network</h4>
              <p className="text-muted mb-0">From routine consultations to specialized treatment planning, the site now feels like a professional hospital booking portal rather than a basic demo.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
