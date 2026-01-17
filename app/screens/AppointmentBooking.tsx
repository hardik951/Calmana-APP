import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewCount: number;
  distance: string;
  nextAvailable: string;
  consultationFee: number;
  verified: boolean;
  languages: string[];
  education: string[];
  about: string;
  availability: {
    date: string;
    slots: string[];
  }[];
}

interface AppointmentBookingProps {
  onNavigate: (view: string) => void;
}

export function AppointmentBooking({ onNavigate }: AppointmentBookingProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('near-me');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'video'>('video');

  const mockDoctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      specialty: 'Psychiatrist',
      experience: 12,
      rating: 4.9,
      reviewCount: 156,
      distance: '0.8 km away',
      nextAvailable: 'Today, 2:30 PM',
      consultationFee: 150,
      verified: true,
      languages: ['English', 'Mandarin'],
      education: ['MD from Johns Hopkins', 'Residency at Mayo Clinic'],
      about: 'Specialized in anxiety disorders, depression, and cognitive behavioral therapy.',
      availability: [
        { date: '2024-08-25', slots: ['9:00 AM', '11:30 AM', '2:30 PM', '4:00 PM'] },
        { date: '2024-08-26', slots: ['10:00 AM', '1:00 PM', '3:30 PM'] }
      ]
    },
    {
      id: '2',
      name: 'Dr. Michael Rodriguez',
      specialty: 'Psychologist',
      experience: 8,
      rating: 4.8,
      reviewCount: 89,
      distance: '1.2 km away',
      nextAvailable: 'Tomorrow, 10:00 AM',
      consultationFee: 120,
      verified: true,
      languages: ['English', 'Spanish'],
      education: ['PhD in Clinical Psychology', 'Harvard Medical School'],
      about: 'Expert in trauma therapy, PTSD treatment, and mindfulness-based interventions.',
      availability: [
        { date: '2024-08-26', slots: ['10:00 AM', '2:00 PM', '4:30 PM'] },
        { date: '2024-08-27', slots: ['9:30 AM', '11:00 AM', '3:00 PM'] }
      ]
    }
  ];

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSpecialty = selectedSpecialty === 'all' || 
      doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      Alert.alert(
        'Appointment Booked!',
        `Your appointment with ${selectedDoctor.name} has been scheduled for ${selectedDate} at ${selectedTime}`,
        [{ text: 'OK', onPress: () => setSelectedDoctor(null) }]
      );
    }
  };

  if (selectedDoctor) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedDoctor(null)}>
            <FontAwesome name="arrow-left" size={20} color="#4F7C52" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Appointment</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.doctorCard}>
            <View style={styles.doctorHeader}>
              <View style={styles.doctorAvatar}>
                <Text style={styles.avatarText}>
                  {selectedDoctor.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{selectedDoctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{selectedDoctor.specialty}</Text>
                <Text style={styles.doctorStats}>
                  {selectedDoctor.experience} years exp • {selectedDoctor.rating} ⭐ ({selectedDoctor.reviewCount})
                </Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${selectedDoctor.consultationFee}</Text>
                <Text style={styles.priceLabel}>per session</Text>
              </View>
            </View>
            <Text style={styles.doctorAbout}>{selectedDoctor.about}</Text>
          </View>

          <View style={styles.bookingSection}>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Consultation Type</Text>
              <View style={styles.typeOptions}>
                <TouchableOpacity
                  style={[styles.typeOption, appointmentType === 'video' && styles.typeOptionSelected]}
                  onPress={() => setAppointmentType('video')}
                >
                  <FontAwesome name="video-camera" size={20} color={appointmentType === 'video' ? '#FFFFFF' : '#4F7C52'} />
                  <Text style={[styles.typeText, appointmentType === 'video' && styles.typeTextSelected]}>
                    Video Consultation
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.typeOption, appointmentType === 'in-person' && styles.typeOptionSelected]}
                  onPress={() => setAppointmentType('in-person')}
                >
                  <FontAwesome name="map-marker" size={20} color={appointmentType === 'in-person' ? '#FFFFFF' : '#4F7C52'} />
                  <Text style={[styles.typeText, appointmentType === 'in-person' && styles.typeTextSelected]}>
                    In-Person Visit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Available Time Slots</Text>
              <View style={styles.dateTabs}>
                {selectedDoctor.availability.map((day) => (
                  <TouchableOpacity
                    key={day.date}
                    style={[styles.dateTab, selectedDate === day.date && styles.dateTabSelected]}
                    onPress={() => setSelectedDate(day.date)}
                  >
                    <Text style={[styles.dateTabText, selectedDate === day.date && styles.dateTabTextSelected]}>
                      {day.date === '2024-08-25' ? 'Today' : 'Tomorrow'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {selectedDate && (
                <View style={styles.timeSlots}>
                  {selectedDoctor.availability.find(d => d.date === selectedDate)?.slots.map((slot) => (
                    <TouchableOpacity
                      key={slot}
                      style={[styles.timeSlot, selectedTime === slot && styles.timeSlotSelected]}
                      onPress={() => setSelectedTime(slot)}
                    >
                      <Text style={[styles.timeSlotText, selectedTime === slot && styles.timeSlotTextSelected]}>
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          <View style={styles.bookingCard}>
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingTitle}>Ready to book?</Text>
              <Text style={styles.bookingSubtitle}>
                {selectedDate && selectedTime ? 
                  `${selectedDate === '2024-08-25' ? 'Today' : 'Tomorrow'} at ${selectedTime}` :
                  'Please select a date and time'
                }
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.bookButton, (!selectedDate || !selectedTime) && styles.bookButtonDisabled]}
              onPress={handleBookAppointment}
              disabled={!selectedDate || !selectedTime}
            >
              <FontAwesome name="calendar" size={16} color="#FFFFFF" />
              <Text style={styles.bookButtonText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => onNavigate('dashboard')}>
          <FontAwesome name="arrow-left" size={20} color="#4F7C52" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <FontAwesome name="calendar" size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>Book Appointment</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.searchCard}>
          <View style={styles.searchContainer}>
            <FontAwesome name="search" size={16} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search doctors, specialties, or conditions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          {/* Filter Options */}
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Specialty</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              <TouchableOpacity
                style={[styles.filterChip, selectedSpecialty === 'all' && styles.filterChipSelected]}
                onPress={() => setSelectedSpecialty('all')}
              >
                <FontAwesome name="stethoscope" size={14} color={selectedSpecialty === 'all' ? '#FFFFFF' : '#4F7C52'} />
                <Text style={[styles.filterChipText, selectedSpecialty === 'all' && styles.filterChipTextSelected]}>
                  All Specialists
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterChip, selectedSpecialty === 'psychiatrist' && styles.filterChipSelected]}
                onPress={() => setSelectedSpecialty('psychiatrist')}
              >
                <FontAwesome name="bolt" size={14} color={selectedSpecialty === 'psychiatrist' ? '#FFFFFF' : '#4F7C52'} />
                <Text style={[styles.filterChipText, selectedSpecialty === 'psychiatrist' && styles.filterChipTextSelected]}>
                  Psychiatrist
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterChip, selectedSpecialty === 'psychologist' && styles.filterChipSelected]}
                onPress={() => setSelectedSpecialty('psychologist')}
              >
                <FontAwesome name="heart" size={14} color={selectedSpecialty === 'psychologist' ? '#FFFFFF' : '#4F7C52'} />
                <Text style={[styles.filterChipText, selectedSpecialty === 'psychologist' && styles.filterChipTextSelected]}>
                  Psychologist
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterChip, selectedSpecialty === 'therapist' && styles.filterChipSelected]}
                onPress={() => setSelectedSpecialty('therapist')}
              >
                <FontAwesome name="users" size={14} color={selectedSpecialty === 'therapist' ? '#FFFFFF' : '#4F7C52'} />
                <Text style={[styles.filterChipText, selectedSpecialty === 'therapist' && styles.filterChipTextSelected]}>
                  Therapist
                </Text>
              </TouchableOpacity>
            </ScrollView>
            
            <Text style={styles.filterTitle}>Location</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              <TouchableOpacity
                style={[styles.filterChip, selectedLocation === 'near-me' && styles.filterChipSelected]}
                onPress={() => setSelectedLocation('near-me')}
              >
                <FontAwesome name="map-marker" size={14} color={selectedLocation === 'near-me' ? '#FFFFFF' : '#4F7C52'} />
                <Text style={[styles.filterChipText, selectedLocation === 'near-me' && styles.filterChipTextSelected]}>
                  Near Me
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterChip, selectedLocation === 'within-5km' && styles.filterChipSelected]}
                onPress={() => setSelectedLocation('within-5km')}
              >
                <FontAwesome name="location-arrow" size={14} color={selectedLocation === 'within-5km' ? '#FFFFFF' : '#4F7C52'} />
                <Text style={[styles.filterChipText, selectedLocation === 'within-5km' && styles.filterChipTextSelected]}>
                  Within 5km
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterChip, selectedLocation === 'within-10km' && styles.filterChipSelected]}
                onPress={() => setSelectedLocation('within-10km')}
              >
                <FontAwesome name="location-arrow" size={14} color={selectedLocation === 'within-10km' ? '#FFFFFF' : '#4F7C52'} />
                <Text style={[styles.filterChipText, selectedLocation === 'within-10km' && styles.filterChipTextSelected]}>
                  Within 10km
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.filterChip, selectedLocation === 'online' && styles.filterChipSelected]}
                onPress={() => setSelectedLocation('online')}
              >
                <FontAwesome name="video-camera" size={14} color={selectedLocation === 'online' ? '#FFFFFF' : '#4F7C52'} />
                <Text style={[styles.filterChipText, selectedLocation === 'online' && styles.filterChipTextSelected]}>
                  Online Only
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <FontAwesome name="users" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Available Doctors</Text>
              <Text style={styles.statValue}>{filteredDoctors.length}</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#3B82F6' }]}>
              <FontAwesome name="video-camera" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Video Consultations</Text>
              <Text style={styles.statValue}>Available</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#F59E0B' }]}>
              <FontAwesome name="clock-o" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Same Day</Text>
              <Text style={styles.statValue}>Available</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#8B5CF6' }]}>
              <FontAwesome name="shield" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Insurance</Text>
              <Text style={styles.statValue}>Accepted</Text>
            </View>
          </View>
        </View>

        <View style={styles.doctorsSection}>
          <Text style={styles.doctorsTitle}>
            Mental Health Specialists Near You ({filteredDoctors.length})
          </Text>
          
          {filteredDoctors.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              style={styles.doctorCard}
              onPress={() => setSelectedDoctor(doctor)}
            >
              <View style={styles.doctorHeader}>
                <View style={styles.doctorAvatar}>
                  <Text style={styles.avatarText}>
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                  <Text style={styles.doctorStats}>
                    {doctor.experience} years exp • {doctor.rating} ⭐ ({doctor.reviewCount}) • {doctor.distance}
                  </Text>
                  <Text style={styles.doctorAbout}>{doctor.about}</Text>
                </View>
                <View style={styles.doctorActions}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>${doctor.consultationFee}</Text>
                    <Text style={styles.priceLabel}>per session</Text>
                  </View>
                  <TouchableOpacity style={styles.bookNowButton}>
                    <FontAwesome name="calendar" size={14} color="#FFFFFF" />
                    <Text style={styles.bookNowText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8F0',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#4F7C52',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  searchCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  searchContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 12,
    fontSize: 16,
  },
  filterSection: {
    marginTop: 16,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 12,
  },
  filterScroll: {
    marginBottom: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: '#4F7C52',
    borderColor: '#4F7C52',
  },
  filterChipText: {
    fontSize: 12,
    color: '#4F7C52',
    marginLeft: 4,
    fontWeight: '500',
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#4F7C52',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  doctorsSection: {
    paddingHorizontal: 20,
  },
  doctorsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  doctorHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    backgroundColor: '#4F7C52',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#4F7C52',
    fontWeight: '500',
    marginBottom: 4,
  },
  doctorStats: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  doctorAbout: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  doctorActions: {
    alignItems: 'flex-end',
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F7C52',
  },
  priceLabel: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  bookNowButton: {
    backgroundColor: '#4F7C52',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookNowText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  bookingSection: {
    paddingHorizontal: 20,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  typeOptions: {
    gap: 12,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  typeOptionSelected: {
    backgroundColor: '#4F7C52',
    borderColor: '#4F7C52',
  },
  typeText: {
    fontSize: 16,
    color: '#4F7C52',
    marginLeft: 12,
    fontWeight: '500',
  },
  typeTextSelected: {
    color: '#FFFFFF',
  },
  dateTabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dateTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
  },
  dateTabSelected: {
    borderBottomColor: '#4F7C52',
  },
  dateTabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  dateTabTextSelected: {
    color: '#4F7C52',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
  },
  timeSlotSelected: {
    backgroundColor: '#4F7C52',
    borderColor: '#4F7C52',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#4F7C52',
    fontWeight: '500',
  },
  timeSlotTextSelected: {
    color: '#FFFFFF',
  },
  bookingCard: {
    backgroundColor: '#F0F8F0',
    borderWidth: 1,
    borderColor: '#4F7C52',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F7C52',
    marginBottom: 4,
  },
  bookingSubtitle: {
    fontSize: 14,
    color: '#4F7C52',
  },
  bookButton: {
    backgroundColor: '#4F7C52',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  bookButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default AppointmentBooking;
