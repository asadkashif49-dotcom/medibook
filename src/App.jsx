import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppointmentForm from './components/AppointmentForm';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import BookPage from './pages/BookPage';
import BookingsPage from './pages/BookingsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { doctorsSeed } from './data/doctors';
import { loadStoredState, saveStoredState } from './utils/storage';

const initialForm = {
  patientName: '',
  age: '',
  phone: '',
  email: '',
  doctorId: doctorsSeed[0].id,
  date: '',
  time: '',
  reason: ''
};

function createAppointmentId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `apt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getDefaultDate() {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString().split('T')[0];
}

export default function App() {
  const [doctors, setDoctors] = useState(() => loadStoredState('medibook-doctors', doctorsSeed));
  const [appointments, setAppointments] = useState(() => loadStoredState('medibook-appointments', []));
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(doctorsSeed[0]);
  const [form, setForm] = useState({ ...initialForm, date: getDefaultDate() });
  const [errors, setErrors] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  function resetForm() {
    setErrors({});
    setSelectedAppointment(null);
    setForm({ ...initialForm, doctorId: selectedDoctor?.id || doctorsSeed[0].id, date: getDefaultDate() });
  }

  useEffect(() => {
    saveStoredState('medibook-doctors', doctors);
  }, [doctors]);

  useEffect(() => {
    saveStoredState('medibook-appointments', appointments);
  }, [appointments]);

  const doctorsList = useMemo(() => doctors, [doctors]);

  function handleFormChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  }

  function validateForm() {
    const nextErrors = {};
    if (!form.patientName.trim()) nextErrors.patientName = 'Patient name is required.';
    if (!form.age || Number(form.age) < 1) nextErrors.age = 'Please enter a valid age.';
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) nextErrors.phone = 'Please enter a valid phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email.';
    if (!form.date) nextErrors.date = 'Please select a date.';
    if (!form.time) nextErrors.time = 'Please select a time slot.';
    if (!form.reason.trim()) nextErrors.reason = 'Please describe the reason for your visit.';
    const selectedDate = new Date(form.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) nextErrors.date = 'Please choose a future date.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleBookDoctor(doctor) {
    setSelectedDoctor(doctor);
    setForm({ ...initialForm, doctorId: doctor.id, date: getDefaultDate() });
    setErrors({});
    setSelectedAppointment(null);
    setShowForm(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    const doctor = doctors.find((entry) => entry.id === form.doctorId) || selectedDoctor;
    const appointment = {
      id: createAppointmentId(),
      patientName: form.patientName.trim(),
      age: form.age,
      phone: form.phone.trim(),
      email: form.email.trim(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      date: form.date,
      time: form.time,
      reason: form.reason.trim(),
      status: 'Upcoming'
    };

    setAppointments((current) => [appointment, ...current]);
    setShowForm(false);
    setSelectedAppointment(appointment);
    resetForm();
    toast.success('Appointment booked successfully!');
  }

  function handleCancel(id) {
    const confirmed = window.confirm('Are you sure you want to cancel this appointment?');
    if (!confirmed) return;
    setAppointments((current) => current.filter((appointment) => appointment.id !== id));
    setSelectedAppointment(null);
    toast.info('Appointment cancelled.');
  }

  function handleEdit(appointment) {
    setSelectedAppointment(appointment);
    setForm({
      patientName: appointment.patientName,
      age: appointment.age,
      phone: appointment.phone,
      email: appointment.email,
      doctorId: appointment.doctorId,
      date: appointment.date,
      time: appointment.time,
      reason: appointment.reason
    });
    setShowForm(true);
  }

  function handleSaveEdit(event) {
    event.preventDefault();
    if (!validateForm()) return;
    setAppointments((current) => current.map((appointment) => appointment.id === selectedAppointment.id ? { ...appointment, ...{ patientName: form.patientName.trim(), age: form.age, phone: form.phone.trim(), email: form.email.trim(), doctorId: form.doctorId, date: form.date, time: form.time, reason: form.reason.trim(), status: 'Upcoming' } } : appointment));
    setShowForm(false);
    resetForm();
    toast.success('Appointment updated successfully.');
  }

  function handleView(appointment) {
    setSelectedAppointment(appointment);
    toast.info(`${appointment.doctorName} on ${appointment.date} at ${appointment.time}`);
  }

  return (
    <Router>
      <div className="page-shell px-3 py-4">
        <div className="container py-2">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<DoctorsPage doctors={doctorsList} onSelectDoctor={handleBookDoctor} />} />
            <Route path="/book" element={<BookPage form={form} doctors={doctors} errors={errors} selectedDoctor={selectedDoctor} onChange={handleFormChange} onSubmit={selectedAppointment ? handleSaveEdit : handleSubmit} onClose={resetForm} onSelectDoctor={handleBookDoctor} />} />
            <Route path="/bookings" element={<BookingsPage appointments={appointments} onEditAppointment={handleEdit} onCancelAppointment={handleCancel} onViewAppointment={handleView} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </div>
      <ToastContainer position="top-end" autoClose={2500} />
      {showForm && (
        <AppointmentForm
          form={form}
          doctors={doctors}
          errors={errors}
          onChange={handleFormChange}
          onSubmit={selectedAppointment ? handleSaveEdit : handleSubmit}
          onClose={() => setShowForm(false)}
          selectedDoctor={selectedDoctor}
        />
      )}
    </Router>
  );
}
