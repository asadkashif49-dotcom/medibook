export default function AppointmentHistory({ appointments, onCancel }) {
  return (
    <section className="card-section p-4 rounded-4 shadow-sm">
      <p className="text-primary fw-semibold text-uppercase small mb-1">Your records</p>
      <h3 className="h4 mb-3">Booking history</h3>
      <div className="d-grid gap-3">
        {appointments.length === 0 && <div className="empty-state p-3 rounded-4 text-center text-muted">No appointments booked yet. Your records will appear here.</div>}
        {appointments.map((appointment) => (
          <article key={appointment.id} className="history-item p-3 rounded-4 border d-flex justify-content-between align-items-center gap-3">
            <div>
              <h4 className="h6 mb-1">{appointment.patientName}</h4>
              <p className="mb-1 text-muted">{appointment.doctorName}</p>
              <p className="mb-1 text-muted">{appointment.date} at {appointment.time}</p>
              {appointment.notes && <p className="mb-0 text-muted">Notes: {appointment.notes}</p>}
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-success-subtle text-success">Confirmed</span>
              <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => onCancel(appointment.id)}>Cancel</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
