const doctors = [
  { id: 'dr-ali', name: 'Dr. Ali Hassan', specialty: 'Cardiology', experience: '12 years', slot: 'Today, 2:00 PM' },
  { id: 'dr-maria', name: 'Dr. Maria Gomez', specialty: 'Neurology', experience: '9 years', slot: 'Tomorrow, 10:30 AM' },
  { id: 'dr-owen', name: 'Dr. Owen Lee', specialty: 'Orthopedics', experience: '14 years', slot: 'Tomorrow, 4:00 PM' },
  { id: 'dr-sana', name: 'Dr. Sana Iqbal', specialty: 'Pediatrics', experience: '8 years', slot: 'Friday, 11:00 AM' }
];

const storageKey = 'medibook-appointments';
let appointments = JSON.parse(localStorage.getItem(storageKey) || '[]');
let selectedDoctorId = doctors[0].id;

const doctorList = document.getElementById('doctor-list');
const doctorCount = document.getElementById('doctor-count');
const appointmentCount = document.getElementById('appointment-count');
const specialtyFilter = document.getElementById('specialty-filter');
const searchInput = document.getElementById('search-input');
const doctorSelect = document.getElementById('doctor-select');
const bookingForm = document.getElementById('booking-form');
const formMessage = document.getElementById('form-message');
const historyList = document.getElementById('history-list');
const appointmentDate = document.getElementById('appointment-date');
const appointmentTime = document.getElementById('appointment-time');

function populateSpecialties() {
  const specialties = ['All', ...new Set(doctors.map((doctor) => doctor.specialty))];
  specialtyFilter.innerHTML = specialties
    .map((specialty) => `<option value="${specialty}">${specialty}</option>`)
    .join('');
}

function populateDoctorSelect() {
  doctorSelect.innerHTML = doctors
    .map((doctor) => `<option value="${doctor.id}" ${doctor.id === selectedDoctorId ? 'selected' : ''}>${doctor.name} • ${doctor.specialty}</option>`)
    .join('');
}

function renderDoctors() {
  const query = searchInput.value.trim().toLowerCase();
  const specialty = specialtyFilter.value;

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesQuery = doctor.name.toLowerCase().includes(query) || doctor.specialty.toLowerCase().includes(query);
    const matchesSpecialty = specialty === 'All' || doctor.specialty === specialty;
    return matchesQuery && matchesSpecialty;
  });

  if (!filteredDoctors.length) {
    doctorList.innerHTML = '<div class="empty-state">No specialists match your current filters.</div>';
    return;
  }

  doctorList.innerHTML = filteredDoctors
    .map((doctor) => {
      const initials = doctor.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
      return `
        <article class="doctor-card">
          <div class="doctor-main">
            <div class="avatar">${initials}</div>
            <div class="doctor-title">
              <h4>${doctor.name}</h4>
              <p>${doctor.specialty}</p>
              <div class="doctor-meta">${doctor.experience} • ${doctor.slot}</div>
            </div>
          </div>
          <button class="book-btn" type="button" data-doctor-id="${doctor.id}">Book now</button>
        </article>
      `;
    })
    .join('');
}

function renderStats() {
  doctorCount.textContent = doctors.length;
  appointmentCount.textContent = appointments.length;
}

function renderHistory() {
  if (!appointments.length) {
    historyList.innerHTML = '<div class="empty-state">No appointments booked yet. Your records will appear here.</div>';
    return;
  }

  historyList.innerHTML = appointments
    .slice()
    .sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`))
    .map((appointment) => `
      <article class="history-item">
        <div>
          <h4>${appointment.patientName}</h4>
          <p>${appointment.doctorName}</p>
          <p>${appointment.date} at ${appointment.time}</p>
          ${appointment.notes ? `<p>Notes: ${appointment.notes}</p>` : ''}
        </div>
        <div class="history-actions">
          <span class="status-pill">Confirmed</span>
          <button class="cancel-btn" type="button" data-id="${appointment.id}">Cancel</button>
        </div>
      </article>
    `)
    .join('');
}

function saveAppointments() {
  localStorage.setItem(storageKey, JSON.stringify(appointments));
}

function setDefaultDate() {
  const today = new Date();
  const offset = new Date(today);
  offset.setDate(today.getDate() + 1);
  appointmentDate.value = offset.toISOString().split('T')[0];
  appointmentTime.value = '09:00';
}

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const appointment = {
    id: crypto.randomUUID(),
    patientName: formData.get('patientName').toString().trim(),
    email: formData.get('email').toString().trim(),
    doctorId: formData.get('doctorId').toString(),
    doctorName: doctors.find((doctor) => doctor.id === formData.get('doctorId').toString())?.name || 'Selected doctor',
    date: formData.get('date').toString(),
    time: formData.get('time').toString(),
    notes: formData.get('notes').toString().trim(),
    status: 'Confirmed'
  };

  if (!appointment.patientName || !appointment.email || !appointment.date || !appointment.time) {
    formMessage.textContent = 'Please complete every required field.';
    return;
  }

  appointments.unshift(appointment);
  saveAppointments();
  renderStats();
  renderHistory();
  bookingForm.reset();
  selectedDoctorId = doctors[0].id;
  populateDoctorSelect();
  setDefaultDate();
  formMessage.textContent = `Appointment confirmed for ${appointment.doctorName}.`;
});

doctorList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-doctor-id]');
  if (!button) return;

  selectedDoctorId = button.getAttribute('data-doctor-id');
  populateDoctorSelect();
  doctorSelect.value = selectedDoctorId;
  searchInput.focus();
});

historyList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-id]');
  if (!button) return;

  appointments = appointments.filter((appointment) => appointment.id !== button.getAttribute('data-id'));
  saveAppointments();
  renderStats();
  renderHistory();
});

searchInput.addEventListener('input', renderDoctors);
specialtyFilter.addEventListener('change', renderDoctors);

doctorSelect.addEventListener('change', (event) => {
  selectedDoctorId = event.target.value;
});

populateSpecialties();
populateDoctorSelect();
setDefaultDate();
renderDoctors();
renderStats();
renderHistory();
