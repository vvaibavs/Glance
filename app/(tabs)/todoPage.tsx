import { AppColors } from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
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
  const { user } = useAuth();
  const getTodos = async () => {
    try {
      const res = await fetch(`http://10.0.0.62:3000/todos/${user}`);
      setTodos(await res.json());
      console.log(todos[1]["text"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>To-Do</Text>
      </View>

      {/* Task List */}
      <FlatList
        data={todos}
        renderItem={({ item }) => <TaskItem task={item} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* Add Task FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/modal")}
      >
        <Ionicons name="add" size={28} color="#020617" />
      </TouchableOpacity>
    </View>
  );
}

function TaskItem({ task }) {
  return (
    <TouchableOpacity style={[styles.taskCard, task.done && styles.taskDone]}>
      <Ionicons
        name={task.done ? "checkmark-circle" : "ellipse-outline"}
        size={22}
        color={task.done ? AppColors.success : AppColors.textSecondary}
      />
      <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
        {task.text}
      </Text>
      {/* <Ionicons name="chevron-forward" size={18} color={AppColors.border} /> */}
    </TouchableOpacity>
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
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: AppColors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});
