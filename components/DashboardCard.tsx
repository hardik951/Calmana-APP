import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon: string;
  iconColor?: string;
  backgroundColor?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

export function DashboardCard({ 
  title, 
  subtitle, 
  icon, 
  iconColor = "#4F7C52",
  backgroundColor = "#FFFFFF",
  onPress,
  children 
}: DashboardCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor }]} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <FontAwesome name={icon as any} size={20} color={iconColor} />
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
      </View>
      {children && <View style={styles.cardContent}>{children}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 32,
  },
  cardContent: {
    // Content styling
  },
});




