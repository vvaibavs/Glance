import { AppColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const profile = () => {
  return (
    <View style={styles.container}>
      <Text>profile</Text>
      <View style={styles.card}>
        <Ionicons name="person-circle-outline" size={48} color="#38BDF8" />
      </View>
    </View>
  );
};

export default profile;

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
});
