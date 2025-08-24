import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { DashboardCard } from './DashboardCard';
import { Button } from './Button';

interface MoodTrackerProps {
  onNavigate: (view: string) => void;
}

export function MoodTracker({ onNavigate }: MoodTrackerProps) {
  const [currentMood, setCurrentMood] = useState<'happy' | 'neutral' | 'sad'>('happy');

  const moodData = [
    { date: 'Mon', mood: 'happy', value: 8 },
    { date: 'Tue', mood: 'neutral', value: 6 },
    { date: 'Wed', mood: 'sad', value: 4 },
    { date: 'Thu', mood: 'happy', value: 7 },
    { date: 'Fri', mood: 'neutral', value: 5 },
    { date: 'Sat', mood: 'happy', value: 9 },
    { date: 'Sun', mood: 'happy', value: 8 },
  ];

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return 'smile-o';
      case 'neutral': return 'meh-o';
      case 'sad': return 'frown-o';
      default: return 'meh-o';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return '#10B981';
      case 'neutral': return '#F59E0B';
      case 'sad': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <DashboardCard
      title="Mood Tracker"
      subtitle="Track your daily emotional well-being"
      icon="smile-o"
      backgroundColor="#FEF3C7"
      iconColor="#F59E0B"
    >
      {/* Current Mood Selection */}
      <View style={styles.moodSelection}>
        <Text style={styles.moodTitle}>How are you feeling today?</Text>
        <View style={styles.moodButtons}>
          {(['sad', 'neutral', 'happy'] as const).map((mood) => (
            <TouchableOpacity
              key={mood}
              style={[
                styles.moodButton,
                currentMood === mood && styles.moodButtonActive
              ]}
              onPress={() => setCurrentMood(mood)}
            >
              <FontAwesome 
                name={getMoodIcon(mood)} 
                size={24} 
                color={currentMood === mood ? '#FFFFFF' : getMoodColor(mood)} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Mood History */}
      <View style={styles.moodHistory}>
        <Text style={styles.historyTitle}>This Week's Mood</Text>
        <View style={styles.moodChart}>
          {moodData.map((day, index) => (
            <View key={index} style={styles.moodDay}>
              <Text style={styles.dayLabel}>{day.date}</Text>
              <View style={styles.moodBar}>
                <View 
                  style={[
                    styles.moodBarFill,
                    { 
                      height: `${day.value * 10}%`,
                      backgroundColor: getMoodColor(day.mood)
                    }
                  ]} 
                />
              </View>
              <FontAwesome 
                name={getMoodIcon(day.mood)} 
                size={12} 
                color={getMoodColor(day.mood)} 
              />
            </View>
          ))}
        </View>
      </View>

      {/* Add Mood Button */}
      <Button
        title="Add Today's Mood"
        onPress={() => console.log('Add mood')}
        variant="outline"
        size="medium"
        icon={<FontAwesome name="plus" size={16} color="#4F7C52" />}
        style={styles.addMoodButton}
      />
    </DashboardCard>
  );
}

const styles = StyleSheet.create({
  moodSelection: {
    marginBottom: 20,
  },
  moodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  moodButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  moodButtonActive: {
    borderColor: '#4F7C52',
    backgroundColor: '#4F7C52',
  },
  moodHistory: {
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  moodChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
  },
  moodDay: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  moodBar: {
    width: 20,
    height: 60,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    marginBottom: 4,
    justifyContent: 'flex-end',
  },
  moodBarFill: {
    width: '100%',
    backgroundColor: '#4F7C52',
    borderRadius: 10,
    minHeight: 4,
  },
  addMoodButton: {
    alignSelf: 'center',
  },
});


