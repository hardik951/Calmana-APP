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
import { FontAwesome } from '@expo/vector-icons'; // Using @expo/vector-icons
import { useLocalSearchParams, useRouter } from 'expo-router'; // Import useRouter and useLocalSearchParams

// Define a type for the userType state
type UserType = 'patient' | 'doctor';

const LoginPage: React.FC = () => { // Correctly named LoginPage
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Initialize userType from navigation params, defaulting to 'patient'
  const initialUserType: UserType = (params.userType as UserType) || 'patient';
  const [userType, setUserType] = useState<UserType>(initialUserType);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Update userType if params change (e.g., navigating back to this screen with a different type)
  useEffect(() => {
    if (params.userType) {
      setUserType(params.userType as UserType);
    }
  }, [params.userType]);

  const handleLogin = () => {
    setMessage('');
    // Client-side validation for empty fields
    if (email === '' || password === '') {
      setMessage('Please enter both email and password.');
      return;
    }

    Alert.alert(
      'Login Attempt',
      `Logging in as ${userType} with email: ${email}`,
      [{ text: 'OK' }]
    );
    console.log(`User Type: ${userType}, Email: ${email}, Password: ${password}`);

    setTimeout(() => {
      setMessage(`Login successful for ${userType}!`);
      // After successful login, you might want to redirect to the home tab or another secure area
      // For example: router.replace('/home'); or router.replace('/(tabs)');
    }, 1500);
  };

  const handleGoToSignup = () => {
    router.push('/screens/SignupPage'); // Navigate to SignupPage
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          {/* Calmana Logo and Title */}
          <View style={styles.header}>
            <FontAwesome name="stethoscope" size={48} color="#10B981" style={styles.logoIcon} />
            <Text style={styles.title}>Calmana</Text>
            <Text style={styles.subtitle}>Login to Calmana</Text>
          </View>

          {/* User Type Selection */}
          <View style={styles.userTypeSelection}>
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'patient' ? styles.userTypeButtonActive : styles.userTypeButtonInactive,
              ]}
              onPress={() => setUserType('patient')}
            >
              <FontAwesome
                name="user" // Patient icon
                size={20}
                color={userType === 'patient' ? '#374151' : '#6B7280'}
                style={styles.buttonIcon}
              />
              <Text
                style={[
                  styles.userTypeButtonText,
                  userType === 'patient' ? styles.userTypeButtonTextActive : styles.userTypeButtonTextInactive,
                ]}
              >
                Patient
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === 'doctor' ? styles.userTypeButtonActiveGreen : styles.userTypeButtonInactive,
              ]}
              onPress={() => setUserType('doctor')}
            >
              <FontAwesome
                name="user-md" // Doctor icon
                size={20}
                color={userType === 'doctor' ? '#FFFFFF' : '#6B7280'}
                style={styles.buttonIcon}
              />
              <Text
                style={[
                  styles.userTypeButtonText,
                  userType === 'doctor' ? styles.userTypeButtonTextActiveWhite : styles.userTypeButtonTextInactive,
                ]}
              >
                Doctor
              </Text>
            </TouchableOpacity>
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={18} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={18} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>

          {message && (
            <Text style={styles.errorMessage}>{message}</Text>
          )}

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <FontAwesome name="sign-in" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Footer Links */}
          <View style={styles.footerLinks}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.linkText} onPress={handleGoToSignup}>
                Sign Up
              </Text>
            </Text>
            <TouchableOpacity onPress={() => Alert.alert('Navigate', 'Go to Forgot Password screen')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ECFDF5', // Light green background
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
    padding: 25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoIcon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#374151',
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 15,
  },
  userTypeSelection: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6', // Light gray background
    borderRadius: 10,
    padding: 4,
    marginBottom: 25,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    // Note: React Native's StyleSheet does not support `transitionDuration` directly.
    // For animations, you'd use Animated API or LayoutAnimation.
  },
  userTypeButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  userTypeButtonActiveGreen: {
    backgroundColor: '#10B981', // Green-600
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  userTypeButtonInactive: {
    backgroundColor: 'transparent',
  },
  userTypeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  userTypeButtonTextActive: {
    color: '#374151', // Gray-800
  },
  userTypeButtonTextActiveWhite: {
    color: '#FFFFFF',
  },
  userTypeButtonTextInactive: {
    color: '#6B7280', // Gray-600
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D1D5DB', // Gray-300
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F9FAFB', // Light gray for input background
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#374151',
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 14,
    color: '#EF4444', // Red-500
    fontWeight: '500',
    marginBottom: 20,
  },
  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10B981', // Green-600
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  footerLinks: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#4B5563', // Gray-600
    marginBottom: 10,
  },
  linkText: {
    color: '#10B981', // Green-600
    fontWeight: '600',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#6B7280', // Gray-500
  },
  buttonIcon: {
    marginRight: 5,
  },
});

export default LoginPage; // Exporting LoginPage
