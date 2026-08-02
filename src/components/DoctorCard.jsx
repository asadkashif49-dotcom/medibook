export default function DoctorCard({ doctor, onSelect }) {
  return (
    <div className="card border-0 h-100 hover-card rounded-4 overflow-hidden">
      <div className="position-relative">
        <img src={doctor.image} alt={doctor.name} className="card-img-top doctor-image" style={{ height: '220px' }} />
        <div className="doctor-image-overlay">
          <span className="badge availability-pill">{doctor.availability}</span>
        </div>
      </div>
      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <div>
            <h5 className="card-title mb-1 fw-bold">{doctor.name}</h5>
            <span className="badge specialty-pill">{doctor.specialty}</span>
          </div>
        </div>
        <p className="text-muted small mb-3">{doctor.bio}</p>
        <div className="small text-muted mb-2">📍 {doctor.location}</div>
        <div className="d-flex justify-content-between text-muted small mb-3">
          <span>⭐ {doctor.rating}</span>
          <span>{doctor.experience}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-auto gap-2">
          <div>
            <div className="fw-bold text-white">${doctor.fee}/visit</div>
            <div className="small text-muted">Premium consultation</div>
          </div>
          <button className="btn btn-primary btn-sm rounded-pill px-3" onClick={() => onSelect(doctor)}>Book Now</button>
        </div>
      </div>
    </div>
  );
}
