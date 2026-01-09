import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export function EventRotator({ events }) {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!events || events.length <= 1) return;

    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % events.length);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [events]);

  if (!events || events.length === 0) {
    return (
      <View style={styles3.card}>
        <Text style={styles3.empty}>No upcoming events</Text>
      </View>
    );
  }

  const event = events[index];

  return (
    <Animated.View style={[styles3.card, { opacity: fadeAnim }]}>
      <Text style={styles3.eventTitle}>{event.title}</Text>
      <Text style={styles3.eventDate}>
        {new Date(event.date).toDateString()}
      </Text>
    </Animated.View>
  );
}

const styles3 = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ffffffff",
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "100%",
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#E5E7EB",
    fontFamily: "VT323",
  },
  eventDate: {
    marginTop: 6,
    fontSize: 14,
    fontFamily: "VT323",
    color: "#94A3B8",
  },
});
