import AppointmentForm from '../components/AppointmentForm';

export default function BookPage({ form, doctors, errors, selectedDoctor, onChange, onSubmit, onClose, onSelectDoctor }) {
  return (
    <div className="row g-4">
      <div className="col-lg-4">
        <div className="section-card rounded-4 overflow-hidden h-100">
          <div className="card-body p-4">
            <p className="text-warning fw-semibold text-uppercase small mb-2">Book a visit</p>
            <h2 className="h3 fw-bold mb-3 section-title">Reserve care in a few calm steps.</h2>
            <p className="text-muted mb-4">Choose a doctor, enter your details, and confirm your preferred date and time.</p>
            <div className="d-grid gap-2">
              {doctors.slice(0, 3).map((doctor) => (
                <button key={doctor.id} className={`btn quick-action text-start ${selectedDoctor?.id === doctor.id ? 'active' : ''}`} onClick={() => onSelectDoctor(doctor)}>
                  <div className="fw-semibold">{doctor.name}</div>
                  <div className="small text-muted">{doctor.specialty}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <AppointmentForm
          form={form}
          doctors={doctors}
          errors={errors}
          onChange={onChange}
          onSubmit={onSubmit}
          onClose={onClose}
          selectedDoctor={selectedDoctor}
          mode="page"
        />
      </div>
    </div>
  );
}
