import DoctorCard from './DoctorCard';

export default function DoctorList({ doctors, search, specialty, onSearchChange, onSpecialtyChange, onSelect }) {
  return (
    <section className="card-section p-4 rounded-4 shadow-sm mb-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
        <div>
          <p className="text-primary fw-semibold text-uppercase small mb-1">Find a doctor</p>
          <h3 className="h4 mb-0">Available specialists</h3>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <input className="form-control" placeholder="Search by name" value={search} onChange={(event) => onSearchChange(event.target.value)} />
          <select className="form-select" value={specialty} onChange={(event) => onSpecialtyChange(event.target.value)}>
            <option value="All">All specialties</option>
            {doctors.map((doctor) => (
              <option key={doctor.specialty} value={doctor.specialty}>{doctor.specialty}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="d-grid gap-3">
        {doctors.length === 0 && <div className="empty-state p-3 rounded-4 text-center text-muted">No specialists match your current filters.</div>}
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
