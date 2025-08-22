import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        {/* Header: Icon + Title side by side */}
        <View style={styles.header}>
          <FontAwesome name="stethoscope" size={36} color="#256D4A" />
          <Text style={styles.appName}>Calmana</Text>
        </View>

        <Text style={styles.title}>Mental Health Platform</Text>
        <Text style={styles.subtitle}>
          Connecting patients with mental health professionals through our comprehensive platform
        </Text>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.doctorButton}
            onPress={() => alert("Doctor Portal Coming Soon")}
          >
            <FontAwesome name="stethoscope" size={18} color="white" style={{ marginRight: 8 }} />
            <Text style={[styles.buttonText, { color: "white" }]}>Doctor Portal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.userButton}
            onPress={() => alert("User Portal Coming Soon")}
          >
            <FontAwesome name="user" size={18} color="#256D4A" style={{ marginRight: 8 }} />
            <Text style={[styles.buttonText, { color: "#256D4A" }]}>User Portal</Text>
          </TouchableOpacity>
        </View>

        {/* Feature Cards */}
        <View style={styles.features}>
          <View style={styles.card}>
            <FontAwesome name="calendar" size={28} color="#256D4A" style={styles.featureIcon} />
            <Text style={styles.cardTitle}>Easy Scheduling</Text>
            <Text style={styles.cardSubtitle}>Book and manage appointments seamlessly</Text>
          </View>
          <View style={styles.card}>
            <FontAwesome name="commenting" size={28} color="#256D4A" style={styles.featureIcon} />
            <Text style={styles.cardTitle}>Secure Messaging</Text>
            <Text style={styles.cardSubtitle}>Communicate safely with your healthcare team</Text>
          </View>
          <View style={styles.card}>
            <FontAwesome name="user-o" size={28} color="#256D4A" style={styles.featureIcon} />
            <Text style={styles.cardTitle}>Personal Care</Text>
            <Text style={styles.cardSubtitle}>Tailored mental health support for everyone</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F3EE", // light green tint background
    paddingHorizontal: 20,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 80, // top margin to push content down
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#256D4A",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    color: '#223322',
  },
  subtitle: {
    fontSize: 16,
    color: "#566E61",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 24,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 40,
  },
  doctorButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#256D4A",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  userButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E9F3EE",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#256D4A",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 8,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 18,
    marginHorizontal: 4,
    alignItems: "center",
  },
  featureIcon: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
  },
});
