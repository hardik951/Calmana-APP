import React, { useState, useEffect } from 'react';
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
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PatientDashboard } from './PatientDashboard';
import { TherapyDiagnosis } from './TherapyDiagnosis';
import DoctorDashboard from './DoctorDashboard';
import { loginOrSignup } from "../../api/auth.api";

// ---------------- TYPES ----------------
type UserType = 'patient' | 'doctor';

// ---------------- COMPONENT ----------------
const LoginPage: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const initialUserType: UserType = (params.userType as UserType) || 'patient';

  const [userType, setUserType] = useState<UserType>(initialUserType);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>('dashboard');

  // Sync userType when route param changes
  useEffect(() => {
    if (params.userType) {
      setUserType(params.userType as UserType);
    }
  }, [params.userType]);

  // ---------------- LOGIN HANDLER ----------------
  const handleLogin = async () => {
    setMessage('');

    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }

    try {
      const res = await loginOrSignup(email, password, userType);
      console.log("✅ AUTH SUCCESS:", res);

      setMessage(res.message || "Login successful");
      setIsLoggedIn(true);

    } catch (err: any) {
      console.log("❌ AUTH ERROR:", err);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  // ---------------- NAVIGATION ----------------
  const handleGoToSignup = () => {
    router.push('/screens/SignupPage');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setMessage('');
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  // ---------------- DASHBOARD ROUTING ----------------
  if (isLoggedIn && userType === 'patient') {
    switch (currentView) {
      case 'diagnosis':
        return <TherapyDiagnosis onNavigate={handleNavigate} />;
      default:
        return <PatientDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
    }
  }

  if (isLoggedIn && userType === 'doctor') {
    return <DoctorDashboard onLogout={handleLogout} />;
  }

  // ---------------- UI ----------------
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>

          {/* Header */}
          <View style={styles.header}>
            <FontAwesome name="stethoscope" size={48} color="#10B981" />
            <Text style={styles.title}>Calmana</Text>
            <Text style={styles.subtitle}>Login to Calmana</Text>
          </View>

          {/* User Type Selector */}
          <View style={styles.userTypeSelection}>
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'patient'
                  ? styles.userTypeButtonActive
                  : styles.userTypeButtonInactive,
              ]}
              onPress={() => setUserType('patient')}
            >
              <FontAwesome name="user" size={18} />
              <Text style={styles.userTypeText}>Patient</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'doctor'
                  ? styles.userTypeButtonActiveGreen
                  : styles.userTypeButtonInactive,
              ]}
              onPress={() => setUserType('doctor')}
            >
              <FontAwesome name="user-md" size={18} color="white" />
              <Text style={[styles.userTypeText, { color: 'white' }]}>Doctor</Text>
            </TouchableOpacity>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {message !== '' && (
            <Text style={styles.errorMessage}>{message}</Text>
          )}

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <FontAwesome name="sign-in" size={18} color="white" />
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footerLinks}>
            <Text style={styles.footerText}>
              Don’t have an account?{' '}
              <Text style={styles.linkText} onPress={handleGoToSignup}>
                Sign Up
              </Text>
            </Text>

            <TouchableOpacity
              onPress={() => Alert.alert('Coming Soon', 'Forgot password feature coming soon')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECFDF5',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 6,
  },
  userTypeSelection: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  userTypeButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  userTypeButtonActiveGreen: {
    backgroundColor: '#10B981',
  },
  userTypeButtonInactive: {
    backgroundColor: 'transparent',
  },
  userTypeText: {
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
  },
  errorMessage: {
    textAlign: 'center',
    color: '#EF4444',
    marginBottom: 10,
  },
  loginButton: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  footerLinks: {
    marginTop: 22,
    alignItems: 'center',
  },
  footerText: {
    color: '#4B5563',
    marginBottom: 8,
  },
  linkText: {
    color: '#10B981',
    fontWeight: '600',
  },
  forgotPasswordText: {
    color: '#6B7280',
  },
});
