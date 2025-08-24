import React from 'react';
import { useNavigation } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';

const Landing = () => {
  const navigation = useNavigation();

  // Since portals are not ready, show alert on button press
  const handleDoctorPortal = () => Alert.alert('Coming Soon', 'Doctor Portal screen is not available yet.');
  const handlePatientPortal = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header & Title */}
      <View style={styles.header}>
        <Text style={styles.logo}>🩺</Text>
        <Text style={styles.brand}>Calmana</Text>
      </View>

      <Text style={styles.title}>Mental Health Platform</Text>
      <Text style={styles.subtitle}>
        Connecting patients with mental health professionals through our comprehensive platform
      </Text>

      {/* Portal Buttons */}
      <View style={styles.portals}>
        <TouchableOpacity style={styles.doctorBtn} onPress={handleDoctorPortal}>
          <Text style={styles.doctorBtnText}>🩺 Doctor Portal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.patientBtn} onPress={handlePatientPortal}>
          <Text style={styles.patientBtnText}>👤 Patient Portal</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.portalSubtext}>
        <Text style={styles.portalSubtextItem}>For healthcare providers</Text>
        <Text style={styles.portalSubtextItem}>For patients</Text>
      </View>

      {/* Features Section */}
      <View style={styles.features}>
        <View style={styles.featureBox}>
          <Text style={styles.featureIcon}>📅</Text>
          <Text style={styles.featureTitle}>Easy Scheduling</Text>
          <Text style={styles.featureDesc}>Book and manage appointments seamlessly</Text>
        </View>
        <View style={styles.featureBox}>
          <Text style={styles.featureIcon}>💬</Text>
          <Text style={styles.featureTitle}>Secure Messaging</Text>
          <Text style={styles.featureDesc}>Communicate safely with your healthcare team</Text>
        </View>
        <View style={styles.featureBox}>
          <Text style={styles.featureIcon}>👥</Text>
          <Text style={styles.featureTitle}>Personal Care</Text>
          <Text style={styles.featureDesc}>Tailored mental health support for everyone</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const PRIMARY_GREEN = '#3DA87C'; // a lighter and softer green
const LIGHTER_GREEN_BG = '#E6F4EA'; // very light green background

const BORDER_RADIUS = 14;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHTER_GREEN_BG,
    padding: 24,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  logo: {
    fontSize: 36,
    marginRight: 12,
    color: PRIMARY_GREEN,
  },
  brand: {
    fontSize: 36,
    fontWeight: '700',
    color: PRIMARY_GREEN,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F3A2F',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: '#4C6B57',
    marginBottom: 36,
    textAlign: 'center',
    lineHeight: 22,
  },
  portals: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  doctorBtn: {
    backgroundColor: PRIMARY_GREEN,
    borderRadius: BORDER_RADIUS,
    paddingVertical: 14,
    paddingHorizontal: 34,
    marginRight: 10,
    shadowColor: '#2b7a54',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
  doctorBtnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
  },
  patientBtn: {
    backgroundColor: 'white',
    borderColor: PRIMARY_GREEN,
    borderWidth: 1.6,
    borderRadius: BORDER_RADIUS,
    paddingVertical: 14,
    paddingHorizontal: 34,
    marginLeft: 10,
  },
  patientBtnText: {
    color: PRIMARY_GREEN,
    fontWeight: '700',
    fontSize: 17,
  },
  portalSubtext: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 36,
  },
  portalSubtextItem: {
    color: '#6C805F',
    fontSize: 14,
    marginHorizontal: 24,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  featureBox: {
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
    padding: 22,
    alignItems: 'center',
    width: '31%',
    minHeight: 140,
    shadowColor: "#2B7A54",
    shadowOpacity: 0.07,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 7 },
  },
  featureIcon: {
    fontSize: 34,
    color: PRIMARY_GREEN,
    marginBottom: 14,
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A3526',
    marginBottom: 6,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 14,
    color: '#4C6B57',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Landing;
