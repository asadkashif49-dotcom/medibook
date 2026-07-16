import { useState } from 'react';

export default function AppointmentCard({ appointment, onEdit, onCancel, onView }) {
  const [showDetails, setShowDetails] = useState(false);
  const statusClass = appointment.status === 'Upcoming' ? 'bg-success-subtle text-success' : appointment.status === 'Completed' ? 'bg-primary-subtle text-primary' : 'bg-danger-subtle text-danger';

  const handleViewToggle = () => {
    setShowDetails((current) => !current);
    onView?.(appointment);
  };

  return (
    <div className="card border-0 h-100 rounded-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
          <div>
            <h5 className="card-title mb-1 fw-bold">{appointment.doctorName}</h5>
            <p className="text-muted small mb-0">{appointment.patientName}</p>
          </div>
          <span className={`badge rounded-pill ${statusClass}`}>{appointment.status}</span>
        </div>

        <div className="d-grid gap-2 mb-3">
          <div className="info-chip rounded-3 p-2 small"><strong>Date:</strong> {appointment.date}</div>
          <div className="info-chip rounded-3 p-2 small"><strong>Time:</strong> {appointment.time}</div>
          <div className="info-chip rounded-3 p-2 small"><strong>Reason:</strong> {appointment.reason}</div>
        </div>

        {showDetails && (
          <div className="rounded-3 p-3 mb-3" style={{ background: 'rgba(212, 160, 23, 0.08)' }}>
            <div className="small text-muted mb-1">Patient details</div>
            <div><strong>Email:</strong> {appointment.email}</div>
            <div><strong>Phone:</strong> {appointment.phone}</div>
            <div><strong>Age:</strong> {appointment.age}</div>
          </div>
        )}

        <div className="d-flex gap-2 flex-wrap">
          <button type="button" className="btn btn-outline-primary btn-sm rounded-pill" onClick={handleViewToggle}>
            {showDetails ? 'Hide' : 'View'}
          </button>
          <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill" onClick={() => onEdit(appointment)}>Reschedule</button>
          <button type="button" className="btn btn-outline-danger btn-sm rounded-pill" onClick={() => onCancel(appointment.id)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
