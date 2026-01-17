import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Using @expo/vector-icons
import { useRouter } from 'expo-router'; // Import useRouter

type UserType = 'patient' | 'doctor';

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>('patient');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '', // For doctors
  });

  const handleSignup = () => {
    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    if (userType === 'doctor' && !formData.licenseNumber) {
      Alert.alert('Error', 'Doctor registration requires a Medical License Number.');
      return;
    }

    Alert.alert(
      'Signup Attempt',
      `Signing up as ${userType} with email: ${formData.email}`,
      [{ text: 'OK' }]
    );
    console.log('Signup attempt:', { userType, ...formData });

    setTimeout(() => {
      Alert.alert('Success', `Account created for ${userType}! Please log in.`);
      router.replace('/screens/LoginPage'); // Navigate back to login after signup
    }, 1500);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoToLogin = () => {
    router.replace('/screens/LoginPage'); // Navigate back to login
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <FontAwesome name="stethoscope" size={36} color="#10B981" />
            <Text style={styles.title}>Calmana</Text>
            <Text style={styles.subtitle}>Join Calmana</Text>
          </View>

          {/* User Type Toggle */}
          <View style={styles.userTypeSelection}>
            <TouchableOpacity
              onPress={() => setUserType('patient')}
              style={[
                styles.userTypeButton,
                userType === 'patient' ? styles.userTypeButtonActive : styles.userTypeButtonInactive,
              ]}
            >
              <FontAwesome name="user" size={18} color={userType === 'patient' ? '#FFFFFF' : '#6B7280'} style={styles.buttonIcon} />
              <Text style={[styles.userTypeButtonText, userType === 'patient' ? styles.userTypeButtonTextActiveWhite : styles.userTypeButtonTextInactive]}>
                Patient
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUserType('doctor')}
              style={[
                styles.userTypeButton,
                userType === 'doctor' ? styles.userTypeButtonActiveGreen : styles.userTypeButtonInactive,
              ]}
            >
              <FontAwesome name="stethoscope" size={18} color={userType === 'doctor' ? '#FFFFFF' : '#6B7280'} style={styles.buttonIcon} />
              <Text style={[styles.userTypeButtonText, userType === 'doctor' ? styles.userTypeButtonTextActiveWhite : styles.userTypeButtonTextInactive]}>
                Doctor
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <View style={styles.nameInputs}>
              <View style={styles.inputGroupHalf}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  placeholder="First name"
                  value={formData.firstName}
                  onChangeText={(value) => updateFormData('firstName', value)}
                  style={styles.input}
                  // removed required
                />
              </View>
              <View style={styles.inputGroupHalf}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  placeholder="Last name"
                  value={formData.lastName}
                  onChangeText={(value) => updateFormData('lastName', value)}
                  style={styles.input}
                  // removed required
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <FontAwesome name="envelope" size={18} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(value) => updateFormData('email', value)}
                  style={styles.inputWithIcon}
                  // removed required
                />
              </View>
            </View>

            {userType === 'doctor' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Medical License Number</Text>
                <View style={styles.inputContainer}>
                  <FontAwesome name="stethoscope" size={18} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Enter license number"
                    value={formData.licenseNumber}
                    onChangeText={(value) => updateFormData('licenseNumber', value)}
                    style={styles.inputWithIcon}
                    // removed required
                  />
                </View>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={18} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  placeholder="Create password"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(value) => updateFormData('password', value)}
                  style={styles.inputWithIcon}
                  // removed required
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={18} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  placeholder="Confirm password"
                  secureTextEntry
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateFormData('confirmPassword', value)}
                  style={styles.inputWithIcon}
                  // removed required
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSignup}
              style={styles.signupButton}
            >
              <FontAwesome name="user-plus" size={18} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.signupButtonText}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.loginLinkContainer}>
              <TouchableOpacity onPress={handleGoToLogin}>
                <Text style={styles.loginLinkText}>Already have an account? Login</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.termsText}>
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ECFDF5' },
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 15, shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.08, shadowRadius: 10,
    elevation: 5, width: '100%', maxWidth: 400, padding: 25,
  },
  header: { alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F3A2F' }, // Darker green for title
  subtitle: { fontSize: 18, color: '#4C6B57', marginTop: 5 }, // Subtler green for subtitle
  userTypeSelection: {
    flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 10,
    padding: 4, marginBottom: 25,
  },
  userTypeButton: {
    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingVertical: 12, paddingHorizontal: 15, borderRadius: 8,
  },
  userTypeButtonActive: {
    backgroundColor: '#10B981', // Green-600 for active patient
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 3,
  },
  userTypeButtonActiveGreen: {
    backgroundColor: '#10B981', // Green-600 for active doctor
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 3,
  },
  userTypeButtonInactive: { backgroundColor: 'transparent' },
  userTypeButtonText: { fontSize: 16, fontWeight: '600', marginLeft: 8 },
  userTypeButtonTextActiveWhite: { color: '#FFFFFF' }, // White text for active buttons
  userTypeButtonTextInactive: { color: '#6B7280' }, // Gray text for inactive buttons
  buttonIcon: { marginRight: 8 }, // Added margin for icons in buttons
  formSection: { width: '100%' },
  nameInputs: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  inputGroupHalf: { width: '48%' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', borderColor: '#D1D5DB',
    borderWidth: 1, borderRadius: 10, paddingHorizontal: 10,
    backgroundColor: '#F9FAFB',
  },
  inputWithIcon: { flex: 1, height: 50, fontSize: 16, color: '#374151' },
  inputIcon: { marginRight: 8 },
  input: { height: 50, borderColor: '#D1D5DB', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, fontSize: 16, backgroundColor: '#F9FAFB', color: '#374151' },
  signupButton: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#10B981', paddingVertical: 15, borderRadius: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 5, elevation: 5, marginTop: 10,
  },
  signupButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600', marginLeft: 8 },
  loginLinkContainer: { marginTop: 20, alignItems: 'center' },
  loginLinkText: { color: '#10B981', fontWeight: '600' },
  termsText: { fontSize: 12, color: '#6B7280', textAlign: 'center', marginTop: 15, lineHeight: 18 },
});

export default SignupPage;