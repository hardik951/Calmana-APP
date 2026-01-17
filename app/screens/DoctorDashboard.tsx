import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface DoctorDashboardProps {
  onLogout?: () => void;
}

type DoctorView = 'overview' | 'appointments' | 'messages' | 'reports' | 'directory' | 'settings';

export default function DoctorDashboard({ onLogout }: DoctorDashboardProps) {
  const [activeView, setActiveView] = useState<DoctorView>('overview');
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FontAwesome name="bars" size={20} color="#256D4A" />
          </TouchableOpacity>
          <FontAwesome name="stethoscope" size={18} color="#256D4A" />
          <Text style={styles.brand}>Calmana</Text>
        </View>
        <View style={styles.topBarRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <FontAwesome name="bell-o" size={20} color="#256D4A" />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>DS</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
            <FontAwesome name="power-off" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainArea}>
        {/* Sidebar */}
        {isSidebarOpen && (
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <View style={styles.appBadge}>
              <FontAwesome name="stethoscope" size={16} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.sidebarBrand}>Calmana</Text>
              <Text style={styles.sidebarSub}>Doctor Portal</Text>
            </View>
          </View>

          <Text style={styles.menuLabel}>MAIN MENU</Text>

          {[
            { key: 'overview', title: 'Dashboard', icon: 'th-large' },
            { key: 'appointments', title: 'Appointments', icon: 'calendar-o', badge: 3 },
            { key: 'messages', title: 'Messages', icon: 'comment-o', badge: 8 },
            { key: 'reports', title: 'Patient Reports', icon: 'file-text-o', badge: 5 },
            { key: 'directory', title: 'Patients Directory', icon: 'users' },
            { key: 'settings', title: 'Settings', icon: 'cog' },
          ].map((item: any) => (
            <TouchableOpacity
              key={item.key}
              style={[styles.menuItem, activeView === item.key && styles.menuItemActive]}
              onPress={() => setActiveView(item.key)}
            >
              <View style={styles.menuItemLeft}>
                <FontAwesome name={item.icon as any} size={18} color={activeView === item.key ? '#0C3D26' : '#256D4A'} />
                <Text style={[styles.menuText, activeView === item.key && styles.menuTextActive]}>{item.title}</Text>
              </View>
              {item.badge ? (
                <View style={styles.badge}><Text style={styles.badgeText}>{item.badge}</Text></View>
              ) : null}
            </TouchableOpacity>
          ))}

          <Text style={styles.menuLabel}>QUICK ACTIONS</Text>
          <TouchableOpacity style={[styles.quickBtn, styles.quickGradient]} onPress={() => router.push('/screens/DoctorAppointments')}>
            <FontAwesome name="heartbeat" size={18} color="#ffffff" />
            <Text style={styles.quickText}>Start Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickBtn, styles.quickGradient]} onPress={() => setActiveView('messages')}>
            <FontAwesome name="comment" size={18} color="#ffffff" />
            <Text style={styles.quickText}>Send Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickBtn, styles.quickGradient]} onPress={() => setActiveView('reports')}>
            <FontAwesome name="file-text-o" size={18} color="#ffffff" />
            <Text style={styles.quickText}>Review Report</Text>
          </TouchableOpacity>

          <View style={styles.sidebarFooter}>
            <View style={styles.profileRow}>
              <View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>DR</Text></View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Dr. Sarah Johnson</Text>
                <Text style={styles.profileRole}>Psychiatrist</Text>
              </View>
              <FontAwesome name="bell-o" size={18} color="#256D4A" />
            </View>
          </View>
        </View>
        )}

        {/* Content */}
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {activeView === 'overview' && (
            <>
              {/* Hero (restored, without Start Session button) */}
              <View style={styles.hero}>
                <View style={styles.heroText}>
                  <Text style={styles.heroTitle}>Calmana — Your Space for Peace</Text>
                  <Text style={styles.heroSubtitle}>Calmana is here to help you relax, refocus, and renew. Start a calming session whenever you need a moment of peace.</Text>
                </View>
                <View style={styles.heroArt}>
                  <FontAwesome name="leaf" size={80} color="#2FA866" />
                </View>
              </View>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderRow}>
                  <FontAwesome name="th-large" size={20} color="#256D4A" />
                  <Text style={styles.sectionTitle}>Dashboard Overview</Text>
                </View>
              </View>

              <View style={styles.kpiRow}>
                {[
                  { label: 'Total Patients', value: '234', icon: 'user-o' },
                  { label: 'Appointments Today', value: '8', icon: 'calendar-o' },
                  { label: 'Unread Messages', value: '15', icon: 'comment-o' },
                  { label: 'Pending Reports', value: '7', icon: 'file-text-o' },
                ].map((kpi, idx) => (
                  <View key={idx} style={styles.kpiCard}>
                    <View style={styles.kpiIconWrap}>
                      <FontAwesome name={kpi.icon as any} size={20} color="#2FA866" />
                    </View>
                    <Text style={styles.kpiLabel}>{kpi.label}</Text>
                    <Text style={styles.kpiValue}>{kpi.value}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.insights}>
                <View style={[styles.insightCard, styles.insightGreen]}>
                  <Text style={styles.insightTitle}>Patient Engagement</Text>
                  <Text style={styles.insightValue}>92%</Text>
                  <Text style={styles.insightSub}>+5% from last week</Text>
                </View>
                <View style={[styles.insightCard, styles.insightOrange]}>
                  <Text style={styles.insightTitle}>Avg Session Time</Text>
                  <Text style={[styles.insightValue, { color: '#F97316' }]}>45min</Text>
                  <Text style={styles.insightSub}>Within target range</Text>
                </View>
                <View style={[styles.insightCard, styles.insightGreen]}>
                  <Text style={styles.insightTitle}>Satisfaction Rate</Text>
                  <Text style={styles.insightValue}>4.8/5</Text>
                  <Text style={styles.insightSub}>Based on 500 reviews</Text>
                </View>
              </View>

              <View style={styles.columns}>
                <View style={styles.columnCard}>
                  <View style={styles.columnHeader}>
                    <FontAwesome name="calendar-o" size={18} color="#256D4A" />
                    <Text style={styles.columnTitle}>Upcoming Appointments</Text>
                  </View>
                  {[
                    { name: 'Emma Wilson', time: '10:30 AM', note: 'Follow-up' },
                    { name: 'Michael Chen', time: '11:45 AM', note: 'Initial Consultation' },
                    { name: 'Sarah Davis', time: '2:15 PM', note: 'Therapy Session' },
                  ].map((a, i) => (
                    <View key={i} style={styles.listItem}>
                      <View>
                        <Text style={styles.listTitle}>{a.name}</Text>
                        <Text style={styles.listSub}>{a.note}</Text>
                      </View>
                      <View style={styles.appointmentRight}>
                        <Text style={styles.time}>{a.time}</Text>
                        <TouchableOpacity style={styles.joinBtn} onPress={() => setActiveView('appointments')}>
                          <FontAwesome name="video-camera" size={14} color="#256D4A" />
                          <Text style={styles.joinText}>Join</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                  <TouchableOpacity style={styles.flatBtn} onPress={() => router.push('/screens/DoctorAppointments')}>
                    <FontAwesome name="calendar" size={14} color="#256D4A" />
                    <Text style={styles.flatBtnText}>View All Appointments</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.columnCard}>
                  <View style={styles.columnHeader}>
                    <FontAwesome name="envelope-o" size={18} color="#256D4A" />
                    <Text style={styles.columnTitle}>Recent Messages</Text>
                  </View>
                  {[
                    { who: 'John Smith', when: '2 min ago' },
                    { who: 'Lisa Johnson', when: '15 min ago' },
                    { who: 'David Brown', when: '1 hr ago' },
                  ].map((m, i) => (
                    <View key={i} style={styles.listItem}>
                      <View style={styles.avatarSmall}><Text style={styles.avatarSmallText}>{m.who.split(' ').map((w: string)=>w[0]).join('')}</Text></View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.listTitle}>{m.who}</Text>
                        <Text style={styles.listSub}>{m.when}</Text>
                      </View>
                    </View>
                  ))}
                  <TouchableOpacity style={styles.flatBtn}>
                    <FontAwesome name="send" size={14} color="#256D4A" />
                    <Text style={styles.flatBtnText}>View All Messages</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.columnCard}>
                  <View style={styles.columnHeader}>
                    <FontAwesome name="file-text-o" size={18} color="#256D4A" />
                    <Text style={styles.columnTitle}>Pending Reports</Text>
                  </View>
                  {[
                    { name: 'Alice Cooper', tag: 'High' },
                    { name: 'Bob Wilson', tag: 'Medium' },
                    { name: 'Carol Martinez', tag: 'Low' },
                  ].map((r, i) => (
                    <View key={i} style={styles.listItem}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.listTitle}>{r.name}</Text>
                        <Text style={styles.listSub}>Awaiting review</Text>
                      </View>
                      <View style={[styles.severityTag, r.tag === 'High' ? styles.tagHigh : r.tag === 'Medium' ? styles.tagMed : styles.tagLow]}>
                        <Text style={styles.tagText}>{r.tag}</Text>
                      </View>
                    </View>
                  ))}
                  <TouchableOpacity style={styles.flatBtn}>
                    <FontAwesome name="check-square-o" size={14} color="#256D4A" />
                    <Text style={styles.flatBtnText}>Review All Reports</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          {activeView === 'appointments' && (
            <View style={styles.pageCard}>
              <Text style={styles.pageTitle}>Appointments</Text>
              <Text style={styles.pageSub}>Go to the detailed appointments page for full controls.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9F5ED',
  },
  mainArea: {
    flex: 1,
    flexDirection: 'row',
  },
  topBar: {
    backgroundColor: '#F6FBF8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4ECE7',
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brand: {
    fontSize: 18,
    fontWeight: '700',
    color: '#256D4A',
    marginLeft: 8,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 8,
    marginRight: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2FA866',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  logoutBtn: {
    backgroundColor: '#256D4A',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: '#F6FBF8',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroText: {
    flex: 1,
    paddingRight: 12,
  },
  heroTitle: {
    fontSize: 22,
    color: '#177245',
    fontWeight: '800',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#215F3B',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  primaryBtn: {
    backgroundColor: '#22C55E',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
  heroArt: {
    padding: 8,
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#256D4A',
    marginLeft: 8,
  },
  secondaryBtn: {
    backgroundColor: '#256D4A',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  secondaryBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    marginLeft: 6,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  kpiIconWrap: {
    width: 34,
    height: 34,
    backgroundColor: '#EAF7F0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  kpiLabel: {
    color: '#256D4A',
    fontWeight: '600',
    marginBottom: 6,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0C3D26',
  },
  insights: {
    backgroundColor: '#F0FAF4',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  insightCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  insightGreen: {
    backgroundColor: '#F3FFF7',
  },
  insightOrange: {
    backgroundColor: '#FFF8F1',
  },
  insightTitle: {
    color: '#256D4A',
    fontWeight: '700',
    marginBottom: 8,
  },
  insightValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0C3D26',
    marginBottom: 4,
  },
  insightSub: {
    color: '#256D4A',
  },
  columns: {
    flexDirection: 'row',
    gap: 10,
  },
  columnCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  columnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#256D4A',
    marginLeft: 6,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FFFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  listTitle: {
    fontWeight: '700',
    color: '#0C3D26',
  },
  listSub: {
    color: '#256D4A',
    marginTop: 2,
  },
  time: {
    fontWeight: '800',
    color: '#0C3D26',
    marginBottom: 6,
  },
  appointmentRight: {
    alignItems: 'flex-end',
  },
  joinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E9F5ED',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  joinText: {
    color: '#256D4A',
    fontWeight: '700',
  },
  flatBtn: {
    marginTop: 6,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#256D4A',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  flatBtnText: {
    color: '#256D4A',
    fontWeight: '700',
  },
  severityTag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  tagHigh: { backgroundColor: '#FEE2E2' },
  tagMed: { backgroundColor: '#FEF3C7' },
  tagLow: { backgroundColor: '#DCFCE7' },
  tagText: { color: '#0C3D26', fontWeight: '700' },
  avatarSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E9F5ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarSmallText: { color: '#256D4A', fontWeight: '700' },
});


