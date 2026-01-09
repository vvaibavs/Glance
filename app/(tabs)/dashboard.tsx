import { EventRotator } from "@/components/eventRotater";
import Orb from "@/components/orb";
import { PomodoroTimer } from "@/components/pomodoroTimer";
import { AppColors } from "@/constants/colors";
import { einkTheme } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useOrientation } from "@/hooks/useOrientation";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const orientation = useOrientation();
  return (
    <SafeAreaView style={styles.safe}>
      {orientation === "landscape" ? (
        <LandscapeDashboard />
      ) : (
        <DashboardScreen />
      )}
    </SafeAreaView>
  );
}

function DashboardScreen() {
  const { user, loading, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  console.log(user);
  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };
  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => setProfileOpen(false)}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome {"User"}!</Text>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => setProfileOpen((prev) => !prev)}
          >
            <Ionicons name="person-outline" size={20} color="#E5E7EB" />
          </TouchableOpacity>
          {profileOpen && (
            <View style={styles.dropdown}>
              <Text style={styles.email}>user@email.com</Text>

              <View style={styles.divider} />
              <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={16} color="#F87171" />
                <Text style={styles.logoutText}>Log out</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Device Preview */}
        <View style={styles.center}>
          <Orb
            size={200}
            imageSource={require("../../assets/images/orb.png")}
          />
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
              <Ionicons
                name="calendar"
                size={18}
                color={AppColors.primaryDark}
              />
              <Text style={styles.actionText}>Add Event</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Button onPress={handleLogout} style={styles.actionButton}><Text style={styles.actionText}>Logout</Text></Button> */}
      </View>
    </TouchableWithoutFeedback>
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
    fontWeight: "700",
    color: AppColors.textPrimary,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  statusText: {
    marginLeft: 6,
    color: AppColors.success,
    fontWeight: "500",
  },
  previewCard: {
    backgroundColor: AppColors.surface,
    borderRadius: 100,
    padding: 24,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 200,
    maxWidth: 200,
  },
  center: {
    borderRadius: 100,
    padding: 24,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 200,
    maxWidth: 200,
  },
  previewTitle: {
    color: AppColors.primary,
    fontWeight: "600",
    marginBottom: 12,
  },
  previewScreen: {
    backgroundColor: AppColors.background,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 12,
  },
  previewContent: {
    color: AppColors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
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
    alignItems: "center",
  },
  primaryButtonText: {
    color: AppColors.primaryDark,
    fontWeight: "700",
  },
  card: {
    backgroundColor: AppColors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: AppColors.textPrimary,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardBody: {
    color: AppColors.textPrimary,
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: AppColors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    width: "48%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 6,
    color: AppColors.textPrimary,
    fontWeight: "600",
  },
  profileButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E293B",
    zIndex: 20,
  },

  dropdown: {
    position: "absolute",
    top: 64,
    right: 16,
    width: 220,
    backgroundColor: AppColors.background,
    borderRadius: 16,
    padding: 16,
    zIndex: 20,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  email: {
    color: "#E5E7EB",
    fontWeight: "600",
    marginBottom: 8,
  },

  divider: {
    height: 1,
    backgroundColor: "#1E293B",
    marginVertical: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  status: {
    color: "#22C55E",
    fontSize: 13,
  },

  logout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },

  logoutText: {
    color: "#F87171",
    fontWeight: "600",
  },
});

function LandscapeDashboard() {
  const { user, loading, logout } = useAuth();
  const [events, setEvents] = useState<string[]>();
  const getTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [todos, setTodos] = useState<string[]>();
  const getTodos = async () => {
    try {
      const res = await fetch(`http://10.0.0.62:3000/todos/${user}`);
      setTodos(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  const handleTodoToggle = async (index: number) => {
    try {
      const res = await fetch(
        `http://10.0.0.62:3000/todos/${user}/${todos[index]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !todos[index].completed }),
        }
      );
      setTodos(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const getEvents = async () => {
    try {
      const res = await fetch(`http://10.0.0.62:3000/calendar/${user}`);
      setEvents(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const [time, setTime] = useState(getTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, 60 * 1000); // update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles2.time}>{time}</Text>

      <Text style={styles2.sectionTitle}>TODAY</Text>
      <Text
        style={{
          fontFamily: "VT323",
          fontSize: 24,
          color: einkTheme.foreground,
          marginBottom: 16,
        }}
      >
        Hello User
      </Text>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={{ flex: 1, maxWidth: "30%", marginRight: 72 }}>
          <Text style={styles2.sectionTitle}>EVENTS</Text>
          <EventRotator events={events} />
        </View>
        <View style={{ flex: 1, maxWidth: "30%" }}>
          <Text style={styles2.sectionTitle}>TASKS</Text>
          <ScrollView style={{ flex: 1 }}>
            {todos?.map((todo, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleTodoToggle(index);
                }}
              >
                <Text
                  key={index}
                  style={{
                    fontFamily: "VT323",
                    fontSize: 24,
                    color: einkTheme.foreground,
                    marginBottom: 16,
                    textDecorationLine: todo.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {todo.text}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <View style={{ flex: 1 }}>
            <PomodoroTimer />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    padding: 32,
    justifyContent: "center",
  },
  time: {
    fontSize: 56,
    fontWeight: "600",
    fontFamily: "VT323",
    color: einkTheme.foreground,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: einkTheme.border,
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 12,
    color: einkTheme.secondary,
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
    color: einkTheme.foreground,
  },
});
