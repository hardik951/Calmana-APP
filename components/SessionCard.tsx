import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { DashboardCard } from './DashboardCard';
import { Button } from './Button';

interface SessionCardProps {
  onNavigate: (view: string) => void;
}

export function SessionCard({ onNavigate }: SessionCardProps) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <DashboardCard
        title="Mental Health Assessment"
        subtitle="Begin your mental wellness journey with comprehensive assessment and personalized guidance"
        icon="heart"
        backgroundColor="#F0F8F0"
        iconColor="#4F7C52"
      >
        <Text style={styles.sessionDescription}>
          Take a scientifically-backed evaluation to understand your mental well-being and get personalized recommendations for your journey.
        </Text>
        
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <FontAwesome name="clock-o" size={16} color="#4F7C52" />
            <Text style={styles.featureText}>5-7 minutes assessment</Text>
          </View>
          <View style={styles.featureItem}>
            <FontAwesome name="shield" size={16} color="#4F7C52" />
            <Text style={styles.featureText}>Private & secure</Text>
          </View>
          <View style={styles.featureItem}>
            <FontAwesome name="bar-chart" size={16} color="#4F7C52" />
            <Text style={styles.featureText}>Detailed results & insights</Text>
          </View>
        </View>

        <Button
          title="Start Session"
          onPress={() => onNavigate('diagnosis')}
          variant="primary"
          size="large"
          icon={<FontAwesome name="play" size={16} color="#FFFFFF" />}
          style={styles.startButton}
        />

        {/* Python Integration Interface */}
        <View style={styles.pythonIntegration}>
          <Text style={styles.integrationTitle}>AI-Powered Analysis</Text>
          <Text style={styles.integrationText}>
            This assessment connects to our advanced Python AI system for:
          </Text>
          <View style={styles.integrationFeatures}>
            <View style={styles.integrationFeature}>
              <FontAwesome name="bolt" size={16} color="#4F7C52" />
              <Text style={styles.integrationFeatureText}>Machine Learning Analysis</Text>
            </View>
            <View style={styles.integrationFeature}>
              <FontAwesome name="line-chart" size={16} color="#4F7C52" />
              <Text style={styles.integrationFeatureText}>Pattern Recognition</Text>
            </View>
            <View style={styles.integrationFeature}>
              <FontAwesome name="user-md" size={16} color="#4F7C52" />
              <Text style={styles.integrationFeatureText}>Professional Insights</Text>
            </View>
          </View>
        </View>
      </DashboardCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sessionDescription: {
    fontSize: 16,
    color: '#4F7C52',
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
  },
  startButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  pythonIntegration: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  integrationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  integrationText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 20,
  },
  integrationFeatures: {
    gap: 12,
  },
  integrationFeature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  integrationFeatureText: {
    fontSize: 14,
    color: '#475569',
    marginLeft: 12,
    fontWeight: '500',
  },
});

