import { useEffect } from "react";
import { View, Text } from "react-native";
import { getPatientDashboard } from "./api/patient.api";

export default function App() {

  useEffect(() => {
    getPatientDashboard("6967d5c36e7266e0c6c6ef55")
      .then(data => {
        console.log("✅ PATIENT DATA:", data);
      })
      .catch(err => {
        console.log("❌ API ERROR:", err.message);
      });
  }, []);

  return (
    <View style={{ padding: 40 }}>
      <Text>Calmana Backend Connected 🚀</Text>
    </View>
  );
}
