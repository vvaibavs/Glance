import { Ionicons } from '@expo/vector-icons';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// TO-DO PAGE UI ONLY
// UI-first, no navigation, no BLE yet

const MOCK_TASKS = [
  { id: '1', title: 'Finish UI design', done: false },
  { id: '2', title: 'Define BLE protocol', done: false },
  { id: '3', title: 'Test ESP32 display', done: true },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <TodoScreen />
    </SafeAreaView>
  );
}

function TodoScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>To-Do</Text>
        <Text style={styles.subtitle}>Tasks synced to ESP32</Text>
      </View>

      {/* Task List */}
      <FlatList
        data={MOCK_TASKS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* Add Task FAB */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="#020617" />
      </TouchableOpacity>
    </View>
  );
}

function TaskItem({ task }) {
  return (
    <View style={[styles.taskCard, task.done && styles.taskDone]}>
      <Ionicons
        name={task.done ? 'checkmark-circle' : 'ellipse-outline'}
        size={22}
        color={task.done ? '#22C55E' : '#94A3B8'}
      />
      <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
        {task.title}
      </Text>
      <Ionicons name="chevron-forward" size={18} color="#475569" />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#020617',
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
    fontWeight: '700',
    color: '#E5E7EB',
  },
  subtitle: {
    marginTop: 4,
    color: '#94A3B8',
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
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
    color: '#E5E7EB',
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#38BDF8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});
