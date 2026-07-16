import { useEffect, useMemo, useRef } from 'react';

const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

export default function AppointmentForm({ form, doctors, errors, onChange, onSubmit, onClose, selectedDoctor, mode = 'modal' }) {
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const availableSlots = useMemo(() => timeSlots, []);

  const content = (
    <form onSubmit={onSubmit} className="card border-0 rounded-4 p-4 p-lg-5">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <p className="text-warning fw-semibold text-uppercase small mb-1">Appointment details</p>
          <h3 className="h4 fw-bold mb-1">Book your visit</h3>
          <p className="text-muted mb-0">{selectedDoctor ? `Booking with ${selectedDoctor.name}` : 'Select a doctor to continue'}</p>
        </div>
        {mode === 'modal' && <button type="button" className="btn btn-close btn-close-white" onClick={onClose} />}
      </div>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Patient name</label>
          <input ref={nameRef} className={`form-control form-control-lg ${errors.patientName ? 'is-invalid' : ''}`} value={form.patientName} onChange={(event) => onChange('patientName', event.target.value)} />
          {errors.patientName && <div className="invalid-feedback">{errors.patientName}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Age</label>
          <input type="number" min="1" className={`form-control form-control-lg ${errors.age ? 'is-invalid' : ''}`} value={form.age} onChange={(event) => onChange('age', event.target.value)} />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>
      </div>
      <div className="row g-3 mt-1">
        <div className="col-md-6">
          <label className="form-label">Phone number</label>
          <input className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`} value={form.phone} onChange={(event) => onChange('phone', event.target.value)} />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`} value={form.email} onChange={(event) => onChange('email', event.target.value)} />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
      </div>
      <div className="row g-3 mt-1">
        <div className="col-md-6">
          <label className="form-label">Doctor</label>
          <select className="form-select form-select-lg" value={form.doctorId} onChange={(event) => onChange('doctorId', event.target.value)}>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Date</label>
          <input type="date" min={new Date().toISOString().split('T')[0]} className={`form-control form-control-lg ${errors.date ? 'is-invalid' : ''}`} value={form.date} onChange={(event) => onChange('date', event.target.value)} />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>
      </div>
      <div className="row g-3 mt-1">
        <div className="col-md-6">
          <label className="form-label">Time slot</label>
          <select className={`form-select form-select-lg ${errors.time ? 'is-invalid' : ''}`} value={form.time} onChange={(event) => onChange('time', event.target.value)}>
            <option value="">Select time</option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.time && <div className="invalid-feedback">{errors.time}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Reason for visit</label>
          <textarea className={`form-control ${errors.reason ? 'is-invalid' : ''}`} rows="3" value={form.reason} onChange={(event) => onChange('reason', event.target.value)} />
          {errors.reason && <div className="invalid-feedback">{errors.reason}</div>}
        </div>
      </div>
      <div className="d-flex justify-content-end gap-2 mt-4">
        {mode === 'modal' && <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={onClose}>Cancel</button>}
        <button type="submit" className="btn btn-primary rounded-pill px-4">Confirm Booking</button>
      </div>
    </form>
  );

  if (mode === 'modal') {
    return (
      <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(3, 24, 50, 0.55)' }}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4 border-0 shadow">{content}</div>
        </div>
      </div>
    );
  }

  return content;
}
