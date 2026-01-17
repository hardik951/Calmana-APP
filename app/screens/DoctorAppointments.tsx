import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface DoctorAppointmentsProps {
  onBack?: () => void;
}

export default function DoctorAppointments({ onBack }: DoctorAppointmentsProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <FontAwesome name="arrow-left" size={18} color="#256D4A" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Doctor Appointments</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {[1,2,3,4,5].map((i) => (
          <View key={i} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Patient #{i} — Follow-up</Text>
              <Text style={styles.cardSub}>Today • 10:{30 + i} AM • Video</Text>
            </View>
            <TouchableOpacity style={styles.joinBtn}>
              <FontAwesome name="video-camera" size={14} color="#256D4A" />
              <Text style={styles.joinText}>Join</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F5ED',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F6FBF8',
    borderBottomWidth: 1,
    borderBottomColor: '#E4ECE7',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: { color: '#256D4A', fontWeight: '700' },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#256D4A',
  },
  scroll: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  cardTitle: { fontWeight: '700', color: '#0C3D26', marginBottom: 4 },
  cardSub: { color: '#256D4A' },
  joinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E9F5ED',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  joinText: { color: '#256D4A', fontWeight: '700' },
});



