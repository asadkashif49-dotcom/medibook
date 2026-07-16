import { useMemo, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import SearchFilterBar from '../components/SearchFilterBar';
import { doctorsSeed } from '../data/doctors';

export default function DoctorsPage({ doctors, onSelectDoctor }) {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [availability, setAvailability] = useState('All');

  const visibleDoctors = useMemo(() => {
    const query = search.trim().toLowerCase();
    return doctors.filter((doctor) => {
      const matchesQuery = doctor.name.toLowerCase().includes(query) || doctor.specialty.toLowerCase().includes(query);
      const matchesSpecialty = specialty === 'All' || doctor.specialty === specialty;
      const matchesAvailability = availability === 'All' || doctor.availability === availability;
      return matchesQuery && matchesSpecialty && matchesAvailability;
    });
  }, [doctors, search, specialty, availability]);

  const specialties = useMemo(() => ['All', ...new Set(doctors.map((doctor) => doctor.specialty))], [doctors]);
  const availabilityOptions = ['All', 'Available Today', 'This Week'];

  return (
    <div>
      <div className="section-card p-4 rounded-4 mb-4">
        <h2 className="h3 fw-bold mb-2 section-title">Find your doctor</h2>
        <p className="text-muted mb-0">Search by name, specialty, or availability and book with confidence.</p>
      </div>
      <SearchFilterBar
        search={search}
        specialty={specialty}
        availability={availability}
        onSearchChange={setSearch}
        onSpecialtyChange={setSpecialty}
        onAvailabilityChange={setAvailability}
        specialties={specialties}
        availabilityOptions={availabilityOptions}
      />
      <div className="row g-4">
        {visibleDoctors.map((doctor) => (
          <div className="col-md-6 col-lg-4" key={doctor.id}>
            <DoctorCard doctor={doctor} onSelect={onSelectDoctor} />
          </div>
        ))}
      </div>
      {!visibleDoctors.length && <div className="empty-state rounded-4 p-4 mt-4 text-center">No doctors match your current filters.</div>}
    </div>
  );
}
