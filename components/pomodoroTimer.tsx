import { AppColors } from "@/constants/colors";
import { einkTheme } from "@/constants/theme";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"focus" | "break">("focus");

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 0) {
          const nextMode = mode === "focus" ? "break" : "focus";
          setMode(nextMode);
          return nextMode === "focus" ? FOCUS_TIME : BREAK_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, mode]);

  const toggle = () => setIsRunning(!isRunning);

  const reset = () => {
    setIsRunning(false);
    setMode("FOCUS");
    setSecondsLeft(FOCUS_TIME);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <View style={styles.card}>
      <Text style={styles.mode}>{mode === "focus" ? "FOCUS" : "BREAK"}</Text>

      <Text style={styles.time}>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={toggle} style={styles.button}>
          <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={reset} style={styles.secondary}>
          <Text style={styles.secondaryText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.background,
    borderWidth: 1,
    borderColor: "#ffffffff",
    padding: 20,
    width: 200,
    alignItems: "center",
  },
  mode: {
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 12,
    color: einkTheme.secondary,
  },
  time: {
    fontSize: 46,
    fontWeight: "700",
    fontFamily: "VT323",
    color: "#E5E7EB",
    marginBottom: 12,
  },
  controls: {
    width: "100%",
  },
  button: {
    backgroundColor: "#d1d1d1ff",
    paddingVertical: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: "#020617",
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "VT323",
    fontSize: 20,
  },
  secondary: {
    paddingVertical: 6,
  },
  secondaryText: {
    color: "#94A3B8",
    fontSize: 20,
    fontFamily: "VT323",
    textAlign: "center",
  },
});
