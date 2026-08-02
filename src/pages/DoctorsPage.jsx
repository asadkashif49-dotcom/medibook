import { useMemo, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import SearchFilterBar from '../components/SearchFilterBar';

export default function DoctorsPage({ doctors, onSelectDoctor }) {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [sortBy, setSortBy] = useState('Top Rated');

  const visibleDoctors = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = doctors.filter((doctor) => {
      const matchesQuery = doctor.name.toLowerCase().includes(query) || doctor.specialty.toLowerCase().includes(query);
      const matchesSpecialty = specialty === 'All' || doctor.specialty === specialty;
      const matchesAvailability = availability === 'All' || doctor.availability === availability;
      return matchesQuery && matchesSpecialty && matchesAvailability;
    });

    const sorted = [...filtered];

    if (sortBy === 'Top Rated') {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'Price Low to High') {
      sorted.sort((a, b) => a.fee - b.fee);
    }
    if (sortBy === 'Experience High to Low') {
      sorted.sort((a, b) => Number.parseInt(b.experience, 10) - Number.parseInt(a.experience, 10));
    }

    return sorted;
  }, [doctors, search, specialty, availability, sortBy]);

  const specialties = useMemo(() => ['All', ...new Set(doctors.map((doctor) => doctor.specialty))], [doctors]);
  const availabilityOptions = ['All', 'Available Today', 'This Week'];
  const sortOptions = ['Top Rated', 'Price Low to High', 'Experience High to Low'];

  return (
    <div>
      <div className="section-card p-4 rounded-4 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-lg-7">
            <h2 className="h3 fw-bold mb-2 section-title">Find your doctor</h2>
            <p className="text-muted mb-0">Search by name, specialty, availability, or patient rating to find the right clinician faster.</p>
          </div>
          <div className="col-lg-5">
            <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
              <div className="stat-pill"><strong>{doctors.length}+</strong><span>Doctors</span></div>
              <div className="stat-pill"><strong>{specialties.length - 1}</strong><span>Departments</span></div>
            </div>
          </div>
        </div>
      </div>
      <SearchFilterBar
        search={search}
        specialty={specialty}
        availability={availability}
        sortBy={sortBy}
        onSearchChange={setSearch}
        onSpecialtyChange={setSpecialty}
        onAvailabilityChange={setAvailability}
        onSortChange={setSortBy}
        specialties={specialties}
        availabilityOptions={availabilityOptions}
        sortOptions={sortOptions}
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
