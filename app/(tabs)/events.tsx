import { AppColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// TO-DO PAGE UI ONLY
// UI-first, no navigation, no BLE yet

const MOCK_TASKS = [
  { id: "1", title: "Finish UI design", done: false },
  { id: "2", title: "Define BLE protocol", done: false },
  { id: "3", title: "Test ESP32 display", done: true },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <TodoScreen />
    </SafeAreaView>
  );
}

function TodoScreen() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Calendar Events</Text>
      </View>
      {/* Add Task FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/eventModal")}
      >
        <Ionicons name="calendar" size={28} color="#020617" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: AppColors.textPrimary,
  },
  subtitle: {
    marginTop: 4,
    color: AppColors.textSecondary,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  taskDone: {
    opacity: 0.6,
  },
  taskText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: AppColors.textPrimary,
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    color: AppColors.textSecondary,
  },
  fab: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "auto",
    width: "100%",
    height: 60,
    borderRadius: 10,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: AppColors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});
