import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { Image } from "expo-image"; // Uncomment to use logo

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Logo + Title */}
      {/* 
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
      />
      */}
      <Text style={styles.appName}>Calmana</Text>
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
          <Text style={[styles.buttonText, { color: "white" }]}>Doctor Portal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.patientButton}
          onPress={() => alert("Patient Portal Coming Soon")}
        >
          <Text style={[styles.buttonText, { color: "#256D4A" }]}>Patient Portal</Text>
        </TouchableOpacity>
      </View>

      {/* Feature Cards */}
      <View style={styles.features}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Easy Scheduling</Text>
          <Text style={styles.cardSubtitle}>Book and manage appointments seamlessly</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Secure Messaging</Text>
          <Text style={styles.cardSubtitle}>Communicate safely with your healthcare team</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Care</Text>
          <Text style={styles.cardSubtitle}>Tailored mental health support for everyone</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9F6",
    alignItems: "center",
    padding: 20,
  },
  // logo: {
  //   width: 50,
  //   height: 50,
  //   marginTop: 40,
  //   marginBottom: 10,
  // },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#256D4A",
    marginTop: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  doctorButton: {
    backgroundColor: "#256D4A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  patientButton: {
    backgroundColor: "#E9F3EE",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "500",
    fontSize: 16,
  },
  features: {
    marginTop: 30,
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#555",
  },
});
