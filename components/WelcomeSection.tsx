import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { DashboardCard } from './DashboardCard';
import { Button } from './Button';

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
            Calmana is here to help you relax, refocus, and renew. Start a calming session whenever you need a moment of peace.
          </Text>
          <Button
            title="Start Session"
            onPress={() => onNavigate('diagnosis')}
            variant="primary"
            size="large"
            icon={<FontAwesome name="play" size={16} color="#FFFFFF" />}
            style={styles.startButton}
          />
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
  startButton: {
    alignSelf: 'flex-start',
  },
  welcomeIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});


