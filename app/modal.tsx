import { Link, router } from "expo-router";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AppColors } from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export default function ModalScreen() {
  const [todo, setTodo] = useState<string>("");
  const { user } = useAuth();
  const handleAddTodo = async () => {
    console.log("adding todo:", todo);
    try {
      const res = await fetch(`http://10.0.0.62:3000/todos/${user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: todo }),
      });
    } catch (error) {
      console.log(error);
    }
    router.replace("/todoPage");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Add a New Task
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Enter your todo..."
        placeholderTextColor="#64748B"
        value={todo}
        onChangeText={setTodo}
        multiline
        maxLength={200}
      />

      <TouchableOpacity
        style={[styles.button, !todo.trim() && styles.buttonDisabled]}
        onPress={handleAddTodo}
        disabled={!todo.trim()}
      >
        <ThemedText style={styles.buttonText}>Add Task</ThemedText>
      </TouchableOpacity>

      <Link href="/" dismissTo style={styles.backLink}>
        <ThemedText type="link" style={styles.linkText}>
          ← Back to home
        </ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
    gap: 20,
  },
  title: {
    marginBottom: 8,
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  input: {
    backgroundColor: AppColors.surface,
    color: AppColors.textPrimary,
    padding: 16,
    borderRadius: 16,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: AppColors.border,
    minHeight: 100,
    maxHeight: 150,
    fontFamily: "System",
    width: "100%",
  },
  button: {
    backgroundColor: AppColors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: AppColors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: AppColors.textMuted,
    opacity: 0.6,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  backLink: {
    marginTop: 16,
    paddingVertical: 12,
  },
  linkText: {
    fontSize: 14,
  },
});
