export default function SearchFilterBar({
  search,
  specialty,
  availability,
  sortBy,
  onSearchChange,
  onSpecialtyChange,
  onAvailabilityChange,
  onSortChange,
  specialties,
  availabilityOptions,
  sortOptions
}) {
  return (
    <div className="section-card rounded-4 p-3 p-lg-4 mb-4">
      <div className="row g-3 align-items-end">
        <div className="col-md-4">
          <label className="form-label small text-muted">Search</label>
          <input className="form-control" placeholder="Doctor name or specialty" value={search} onChange={(event) => onSearchChange(event.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label small text-muted">Specialty</label>
          <select className="form-select" value={specialty} onChange={(event) => onSpecialtyChange(event.target.value)}>
            <option value="All">All specialties</option>
            {specialties.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label small text-muted">Availability</label>
          <select className="form-select" value={availability} onChange={(event) => onAvailabilityChange(event.target.value)}>
            <option value="All">All availability</option>
            {availabilityOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label small text-muted">Sort by</label>
          <select className="form-select" value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
            {sortOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
