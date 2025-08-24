import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { DashboardCard } from './DashboardCard';

interface WelcomeSectionProps {
  onNavigate: (view: string) => void;
}

export function WelcomeSection({ onNavigate }: WelcomeSectionProps) {
  return (
    <DashboardCard
      title="Your Calm Space Awaits"
      subtitle="Take a moment to breathe and center yourself"
      icon="heart"
      backgroundColor="#F0F8F0"
      iconColor="#4F7C52"
    >
      <View style={styles.welcomeContent}>
        <View style={styles.welcomeText}>
          <Text style={styles.welcomeDescription}>
            Calmana is here to help you relax, refocus, and renew. Welcome to your personalized mental wellness journey.
          </Text>
        </View>
        <View style={styles.welcomeIcon}>
          <FontAwesome name="heart" size={64} color="#4F7C52" />
        </View>
      </View>
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    flex: 1,
    marginRight: 20,
  },
  welcomeDescription: {
    fontSize: 16,
    color: '#4F7C52',
    lineHeight: 24,
    marginBottom: 20,
  },
  welcomeIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});




