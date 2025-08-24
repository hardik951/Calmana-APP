import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Import components
import { WelcomeSection } from '../../components/WelcomeSection';
import { MoodTracker } from '../../components/MoodTracker';
import { AIAssistant } from '../../components/AIAssistant';
import { SessionCard } from '../../components/SessionCard';

interface PatientDashboardProps {
  onNavigate: (view: string) => void;
  onLogout?: () => void;
}

export function PatientDashboard({ onNavigate, onLogout }: PatientDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const [email, setEmail] = useState('');

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const renderSidebarItem = (icon: string, title: string, key: string) => (
    <TouchableOpacity
      style={[
        styles.sidebarItem,
        activeSidebarItem === key && styles.sidebarItemActive
      ]}
      onPress={() => setActiveSidebarItem(key)}
    >
      <FontAwesome
        name={icon as any}
        size={20}
        color={activeSidebarItem === key ? '#FFFFFF' : '#4F7C52'}
      />
      <Text style={[
        styles.sidebarItemText,
        activeSidebarItem === key && styles.sidebarItemTextActive
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderMainContent = () => {
    switch (activeSidebarItem) {
      case 'dashboard':
        return (
          <ScrollView 
            style={styles.mainScrollView} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Welcome Section with Enhanced Graphics */}
            <View style={styles.welcomeContainer}>
              <View style={styles.welcomeBackground}>
                <View style={styles.welcomeCircles}>
                  <View style={[styles.circle, styles.circle1]} />
                  <View style={[styles.circle, styles.circle2]} />
                  <View style={[styles.circle, styles.circle3]} />
                </View>
                <WelcomeSection onNavigate={onNavigate} />
              </View>
            </View>

            {/* Mood Tracker with Graphics */}
            <View style={styles.moodContainer}>
              <View style={styles.sectionHeader}>
                <FontAwesome name="heart" size={24} color="#4F7C52" />
                <Text style={styles.sectionTitle}>Your Wellness Journey</Text>
              </View>
              <MoodTracker onNavigate={onNavigate} />
            </View>
            
            {/* AI Assistant Preview with Enhanced Graphics */}
            <View style={styles.aiPreviewSection}>
              <View style={styles.aiPreviewHeader}>
                <View style={styles.aiHeaderContent}>
                  <View style={styles.aiIconContainer}>
                    <FontAwesome name="cog" size={24} color="#4F7C52" />
                    <View style={styles.aiPulse} />
                  </View>
                  <Text style={styles.aiPreviewTitle}>AI Wellness Assistant</Text>
                </View>
                <TouchableOpacity 
                  style={styles.viewAllButton}
                  onPress={() => setActiveSidebarItem('ai-assistant')}
                >
                  <Text style={styles.viewAllButtonText}>View Full Assistant</Text>
                  <FontAwesome name="arrow-right" size={14} color="#4F7C52" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.aiPreviewCard}>
                <View style={styles.aiPreviewContent}>
                  <View style={styles.aiGraphics}>
                    <FontAwesome name="cog" size={32} color="#4F7C52" />
                    <FontAwesome name="microphone" size={20} color="#10B981" style={styles.aiMicIcon} />
                    <FontAwesome name="comments" size={18} color="#3B82F6" style={styles.aiChatIcon} />
                  </View>
                  <Text style={styles.aiPreviewText}>
                    Your AI companion is ready to help with mental wellness, voice control, and personalized support.
                  </Text>
                  <TouchableOpacity 
                    style={styles.aiPreviewButton}
                    onPress={() => setActiveSidebarItem('ai-assistant')}
                  >
                    <FontAwesome name="microphone" size={16} color="#FFFFFF" />
                    <Text style={styles.aiPreviewButtonText}>Chat with AI</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            {/* Session Card with Graphics */}
            <View style={styles.sessionContainer}>
              <View style={styles.sectionHeader}>
                <FontAwesome name="stethoscope" size={24} color="#4F7C52" />
                <Text style={styles.sectionTitle}>Mental Health Assessment</Text>
              </View>
              <SessionCard onNavigate={onNavigate} />
            </View>

            {/* Wellness Stats */}
            <View style={styles.statsContainer}>
              <Text style={styles.statsTitle}>Your Wellness Stats</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <FontAwesome name="calendar-check-o" size={24} color="#10B981" />
                  <Text style={styles.statNumber}>7</Text>
                  <Text style={styles.statLabel}>Days Active</Text>
                </View>
                <View style={styles.statCard}>
                  <FontAwesome name="smile-o" size={24} color="#F59E0B" />
                  <Text style={styles.statNumber}>85%</Text>
                  <Text style={styles.statLabel}>Mood Score</Text>
                </View>
                <View style={styles.statCard}>
                  <FontAwesome name="clock-o" size={24} color="#3B82F6" />
                  <Text style={styles.statNumber}>12</Text>
                  <Text style={styles.statLabel}>Sessions</Text>
                </View>
                <View style={styles.statCard}>
                  <FontAwesome name="star" size={24} color="#8B5CF6" />
                  <Text style={styles.statNumber}>4.8</Text>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        );

      case 'ai-assistant':
        return <AIAssistant onNavigate={onNavigate} />;

      case 'chatrooms':
        return (
          <View style={styles.contentPadding}>
            <View style={styles.placeholderCard}>
              <FontAwesome name="comments" size={48} color="#9CA3AF" />
              <Text style={styles.placeholderTitle}>Chatrooms</Text>
              <Text style={styles.placeholderText}>Chatrooms feature coming soon...</Text>
            </View>
          </View>
        );

      case 'direct-messages':
        return (
          <View style={styles.contentPadding}>
            <View style={styles.placeholderCard}>
              <FontAwesome name="envelope" size={48} color="#9CA3AF" />
              <Text style={styles.placeholderTitle}>Direct Messages</Text>
              <Text style={styles.placeholderText}>Direct messaging feature coming soon...</Text>
            </View>
          </View>
        );

      case 'community':
        return (
          <View style={styles.contentPadding}>
            <View style={styles.placeholderCard}>
              <FontAwesome name="users" size={48} color="#9CA3AF" />
              <Text style={styles.placeholderTitle}>Community Snapshot</Text>
              <Text style={styles.placeholderText}>Community features coming soon...</Text>
            </View>
          </View>
        );

      case 'notifications':
        return (
          <View style={styles.contentPadding}>
            <View style={styles.placeholderCard}>
              <FontAwesome name="bell" size={48} color="#9CA3AF" />
              <Text style={styles.placeholderTitle}>Notifications</Text>
              <View style={styles.notificationList}>
                <View style={styles.notificationItem}>
                  <Text style={styles.notificationText}>Session with Dr. Smith at 3 PM today</Text>
                </View>
                <View style={styles.notificationItem}>
                  <Text style={styles.notificationText}>Daily mood check reminder</Text>
                </View>
                <View style={styles.notificationItem}>
                  <Text style={styles.notificationText}>New meditation session available</Text>
                </View>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.sidebarToggle}
            onPress={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FontAwesome name="stethoscope" size={24} color="#4F7C52" />
          </TouchableOpacity>
          <View style={styles.logoContainer}>
            <FontAwesome name="stethoscope" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.logoText}>Calmana</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="bell" size={24} color="#4F7C52" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <FontAwesome name="power-off" size={24} color="#4F7C52" />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainContainer}>
        {/* Sidebar */}
        {isSidebarOpen && (
          <View style={styles.sidebar}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.sidebarContent}>
                {/* Main Navigation */}
                {renderSidebarItem('home', 'DASHBOARD', 'dashboard')}
                {renderSidebarItem('cog', 'AI ASSISTANT', 'ai-assistant')}
                {renderSidebarItem('comments', 'CHATROOMS', 'chatrooms')}
                {renderSidebarItem('envelope', 'DIRECT MESSAGES', 'direct-messages')}
                {renderSidebarItem('users', 'COMMUNITY SNAPSHOT', 'community')}
                {renderSidebarItem('bell', 'NOTIFICATIONS', 'notifications')}
                
                {/* Subscribe Section */}
                <View style={styles.subscribeSection}>
                  <Text style={styles.subscribeTitle}>Subscribe</Text>
                  <TextInput
                    style={styles.subscribeInput}
                    placeholder="Your email"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <TouchableOpacity style={styles.subscribeButton}>
                    <Text style={styles.subscribeButtonText}>Subscribe</Text>
                  </TouchableOpacity>
                </View>

                {/* Emergency SOS */}
                <View style={styles.sosSection}>
                  <TouchableOpacity style={styles.sosButton}>
                    <FontAwesome name="phone" size={16} color="#FFFFFF" />
                    <Text style={styles.sosButtonText}>SOS</Text>
                  </TouchableOpacity>
                </View>

                {/* Calmana Mantra */}
                <View style={styles.mantraCard}>
                  <View style={styles.mantraHeader}>
                    <FontAwesome name="user" size={20} color="#F59E0B" />
                    <Text style={styles.mantraTitle}>Calmana Mantra</Text>
                  </View>
                  <Text style={styles.mantraText}>
                    "Peace begins with a single breath."
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        )}

        {/* Main Content */}
        <View style={styles.mainContent}>
          {renderMainContent()}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default PatientDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8F0',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sidebarToggle: {
    padding: 8,
    marginRight: 12,
  },
  logoContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#4F7C52',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4F7C52',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginRight: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    backgroundColor: '#4F7C52',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  sidebarContent: {
    padding: 20,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  sidebarItemActive: {
    backgroundColor: '#4F7C52',
  },
  sidebarItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4F7C52',
    marginLeft: 12,
  },
  sidebarItemTextActive: {
    color: '#FFFFFF',
  },
  subscribeSection: {
    marginTop: 24,
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  subscribeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  subscribeInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 14,
  },
  subscribeButton: {
    backgroundColor: '#4F7C52',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  sosSection: {
    marginBottom: 24,
  },
  sosButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sosButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  mantraCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  mantraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mantraTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 8,
  },
  mantraText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#F0F8F0',
  },
  mainScrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  contentPadding: {
    padding: 20,
    flex: 1,
  },
  // Enhanced Graphics Styles
  welcomeContainer: {
    marginBottom: 24,
  },
  welcomeBackground: {
    position: 'relative',
    overflow: 'hidden',
  },
  welcomeCircles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  circle: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.1,
  },
  circle1: {
    width: 100,
    height: 100,
    backgroundColor: '#4F7C52',
    top: -20,
    right: -20,
  },
  circle2: {
    width: 60,
    height: 60,
    backgroundColor: '#10B981',
    bottom: 20,
    left: -10,
  },
  circle3: {
    width: 40,
    height: 40,
    backgroundColor: '#F59E0B',
    top: 50,
    right: 50,
  },
  moodContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  aiPreviewSection: {
    marginBottom: 24,
  },
  aiPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  aiHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  aiPulse: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 15,
    backgroundColor: '#4F7C52',
    opacity: 0.3,
    zIndex: -1,
  },
  aiPreviewTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F0F8F0',
    borderRadius: 20,
  },
  viewAllButtonText: {
    fontSize: 14,
    color: '#4F7C52',
    fontWeight: '600',
    marginRight: 8,
  },
  aiPreviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  aiPreviewContent: {
    alignItems: 'center',
  },
  aiGraphics: {
    position: 'relative',
    marginBottom: 16,
  },
  aiMicIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  aiChatIcon: {
    position: 'absolute',
    bottom: -8,
    left: -8,
  },
  aiPreviewText: {
    fontSize: 16,
    color: '#4F7C52',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  aiPreviewButton: {
    backgroundColor: '#4F7C52',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  aiPreviewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  sessionContainer: {
    marginBottom: 24,
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  placeholderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  notificationList: {
    width: '100%',
    marginTop: 16,
  },
  notificationItem: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  notificationText: {
    fontSize: 14,
    color: '#374151',
  },
});

