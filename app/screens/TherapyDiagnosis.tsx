import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface TherapyDiagnosisProps {
  onNavigate: (view: string) => void;
}

export const TherapyDiagnosis: React.FC<TherapyDiagnosisProps> = ({ onNavigate }) => {
  const [symptoms, setSymptoms] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleAnalyzeSymptoms = () => {
    if (!symptoms.trim()) {
      Alert.alert('Error', 'Please enter your symptoms before analyzing.');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockDiagnosis = `Based on your symptoms: "${symptoms}", here's a preliminary analysis:

• Primary concern: Stress-related symptoms
• Recommended approach: Mindfulness and relaxation techniques
• Next steps: Schedule a consultation with a therapist
• Self-care tips: Practice deep breathing exercises daily

This is a preliminary assessment. Please consult with a healthcare professional for a complete evaluation.`;
      
      setDiagnosis(mockDiagnosis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleBackToDashboard = () => {
    onNavigate('dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackToDashboard} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={20} color="#10B981" />
            <Text style={styles.backButtonText}>Back to Dashboard</Text>
          </TouchableOpacity>
          <FontAwesome name="brain" size={48} color="#10B981" style={styles.logoIcon} />
          <Text style={styles.title}>Therapy Diagnosis</Text>
          <Text style={styles.subtitle}>AI-Powered Symptom Analysis</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Describe Your Symptoms</Text>
          <Text style={styles.description}>
            Please describe your symptoms, feelings, or concerns in detail. 
            Our AI will analyze your input and provide preliminary insights.
          </Text>
          
          <TextInput
            style={styles.textInput}
            placeholder="Describe your symptoms, feelings, or concerns..."
            value={symptoms}
            onChangeText={setSymptoms}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.analyzeButton, isAnalyzing && styles.analyzeButtonDisabled]}
            onPress={handleAnalyzeSymptoms}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <Text style={styles.analyzeButtonText}>Analyzing...</Text>
            ) : (
              <Text style={styles.analyzeButtonText}>Analyze Symptoms</Text>
            )}
          </TouchableOpacity>
        </View>

        {diagnosis && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Analysis Results</Text>
            <View style={styles.diagnosisContainer}>
              <Text style={styles.diagnosisText}>{diagnosis}</Text>
            </View>
            
            <TouchableOpacity style={styles.scheduleButton}>
              <Text style={styles.scheduleButtonText}>Schedule Consultation</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            This AI-powered analysis is for informational purposes only and should not replace professional medical advice. 
            Always consult with qualified healthcare professionals for proper diagnosis and treatment.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#10B981',
    fontWeight: '500',
  },
  logoIcon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    marginBottom: 20,
    minHeight: 120,
  },
  analyzeButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  analyzeButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  diagnosisContainer: {
    backgroundColor: '#F0F9FF',
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  diagnosisText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  scheduleButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    fontStyle: 'italic',
  },
});


