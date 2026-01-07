import Orb from '@/components/orb';
import { AppColors } from '@/constants/colors';
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
        <Text style={styles.title}>Welcome {'User'}!</Text>
      </View>

      {/* Device Preview */}
      <View style={styles.previewCard}>
        <Orb size={200} imageSource={require('../../assets/images/orb.png')} />
      </View>

      {/* Today at a Glance */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today at a Glance</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={18} color={AppColors.primaryDark} />
            <Text style={styles.actionText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="calendar" size={18} color={AppColors.primaryDark} />
            <Text style={styles.actionText}>Add Event</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button onPress={handleLogout} style={styles.actionButton}><Text style={styles.actionText}>Logout</Text></Button>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: AppColors.textPrimary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statusText: {
    marginLeft: 6,
    color: AppColors.success,
    fontWeight: '500',
  },
  previewCard: {
    backgroundColor: AppColors.surface,
    borderRadius: 18,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 260,
  },
  previewTitle: {
    color: AppColors.primary,
    fontWeight: '600',
    marginBottom: 12,
  },
  previewScreen: {
    backgroundColor: AppColors.background,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  previewContent: {
    color: AppColors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  previewSub: {
    marginTop: 6,
    color: AppColors.textSecondary,
    fontSize: 13,
  },
  primaryButton: {
    backgroundColor: AppColors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: AppColors.primaryDark,
    fontWeight: '700',
  },
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: AppColors.textPrimary,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardBody: {
    color: AppColors.textPrimary,
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: AppColors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 6,
    color: AppColors.textPrimary,
    fontWeight: '600',
  },
});
