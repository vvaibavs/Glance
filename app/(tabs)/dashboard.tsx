import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@react-navigation/elements';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <DashboardScreen />
    </SafeAreaView>
  );
}

function DashboardScreen() {
    const {user, loading, logout} = useAuth()
    console.log(user)
      const handleLogout = async () => {
    await logout();
    router.replace('/');
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ESP32 Companion</Text>
        <View style={styles.statusRow}>
          <Ionicons name="bluetooth" size={16} color="#22C55E" />
          <Text style={styles.statusText}>Connected</Text>
          <Text></Text>
        </View>
      </View>

      {/* Device Preview */}
      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>Now Displaying</Text>
        <View style={styles.previewScreen}>
          <Text style={styles.previewContent}>TO-DO LIST</Text>
          <Text style={styles.previewSub}>3 tasks remaining</Text>
        </View>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Change Display</Text>
        </TouchableOpacity>
      </View>

      {/* Today at a Glance */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today at a Glance</Text>
        <Text style={styles.cardBody}>• Finish UI design{''}• Team meeting at 4:00 PM</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={18} color="#020617" />
            <Text style={styles.actionText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="calendar" size={18} color="#020617" />
            <Text style={styles.actionText}>Add Event</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button onPress={handleLogout}><Text>Logout</Text></Button>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#E5E7EB',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statusText: {
    marginLeft: 6,
    color: '#22C55E',
    fontWeight: '500',
  },
  previewCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  previewTitle: {
    color: '#38BDF8',
    fontWeight: '600',
    marginBottom: 12,
  },
  previewScreen: {
    backgroundColor: '#020617',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  previewContent: {
    color: '#E5E7EB',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  previewSub: {
    marginTop: 6,
    color: '#94A3B8',
    fontSize: 13,
  },
  primaryButton: {
    backgroundColor: '#38BDF8',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#020617',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#38BDF8',
    fontWeight: '600',
    marginBottom: 8,
  },
  cardBody: {
    color: '#E5E7EB',
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#38BDF8',
    borderRadius: 12,
    paddingVertical: 12,
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 6,
    color: '#020617',
    fontWeight: '600',
  },
});
