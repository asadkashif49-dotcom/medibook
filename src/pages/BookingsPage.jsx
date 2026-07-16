import { useState } from 'react';
import AppointmentCard from '../components/AppointmentCard';

export default function BookingsPage({ appointments, onEditAppointment, onCancelAppointment, onViewAppointment }) {
  return (
    <div>
      <div className="section-card p-4 rounded-4 mb-4">
        <h2 className="h3 fw-bold mb-2 section-title">My Bookings</h2>
        <p className="text-muted mb-0">View, reschedule, or cancel your appointments anytime.</p>
      </div>
      {appointments.length === 0 ? (
        <div className="empty-state rounded-4 p-5 text-center">
          <h4 className="fw-bold mb-2">No appointments yet</h4>
          <p className="text-muted mb-0">Your scheduling history will appear here once you book a visit.</p>
        </div>
      ) : (
        <div className="row g-4">
          {appointments.map((appointment) => (
            <div className="col-md-6 col-lg-4" key={appointment.id}>
              <AppointmentCard appointment={appointment} onEdit={onEditAppointment} onCancel={onCancelAppointment} onView={onViewAppointment} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
