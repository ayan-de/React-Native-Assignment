import { View, Text, Modal, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { homeColors, companyLogos } from "../constants";
import type { QuestionDetailModalProps } from "../types";

export function QuestionDetailModal({
  visible,
  question,
  onClose,
  onReady,
}: QuestionDetailModalProps) {
  if (!question) return null;

  const logo = companyLogos[question.companyLogoKey];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.cardWrapper} onPress={(e) => e.stopPropagation()}>
          <View style={styles.diamond} />

          <View style={styles.card}>
            <Text style={styles.questionText} numberOfLines={2}>
              {question.text}
            </Text>

            <View style={styles.infoRow}>
              <View style={styles.companyInfo}>
                <Text style={styles.askedByText}>
                  Asked by {question.companyName}
                </Text>
                {logo && (
                  <View style={styles.logoCircle}>
                    <Image
                      source={logo}
                      style={styles.logo}
                      contentFit="contain"
                      cachePolicy="memory-disk"
                    />
                  </View>
                )}
              </View>

              <View style={styles.durationInfo}>
                <Ionicons
                  name="stopwatch-outline"
                  size={20}
                  color={homeColors.modalSubtitleText}
                />
                <Text style={styles.durationText}>
                  {question.durationMinutes} mins
                </Text>
              </View>
            </View>

            <View style={styles.buttonsContainer}>
              <Pressable
                style={styles.readyButton}
                onPress={() => onReady(question.id)}
              >
                <Text style={styles.readyLabel}>FEEDBACK</Text>
              </Pressable>

              <Pressable style={styles.practiceButton}>
                <Ionicons
                  name="headset-outline"
                  size={17}
                  color={homeColors.white}
                />
                <Text style={styles.practiceLabel}>AI VS AI (LISTEN)</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: homeColors.modalBackdrop,
    justifyContent: "center",
    alignItems: "center",
  },
  cardWrapper: {
    alignItems: "center",
    width: "88%",
  },
  diamond: {
    width: 20,
    height: 20,
    backgroundColor: homeColors.modalBackground,
    borderRadius: 2,
    transform: [{ rotate: "45deg" }],
    marginBottom: -10,
    zIndex: 2,
  },
  card: {
    width: "100%",
    backgroundColor: homeColors.modalBackground,
    borderRadius: spacing.s,
    padding: spacing.m,
    gap: 10,
    zIndex: 1,
  },
  questionText: {
    fontSize: 16,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "700",
    color: homeColors.modalQuestionText,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  askedByText: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.semiBold,
    fontWeight: "600",
    color: homeColors.modalSubtitleText,
    letterSpacing: -0.01,
  },
  logoCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: homeColors.white,
    borderWidth: 0.7,
    borderColor: homeColors.modalBackground,
    overflow: "hidden",
  },
  logo: {
    width: 22,
    height: 22,
  },
  durationInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  durationText: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.semiBold,
    fontWeight: "600",
    color: homeColors.modalSubtitleText,
    letterSpacing: -0.01,
  },
  buttonsContainer: {
    gap: 10,
  },
  readyButton: {
    backgroundColor: homeColors.white,
    borderRadius: spacing.inputRadius,
    height: 41,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  readyLabel: {
    fontSize: 15,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "700",
    color: homeColors.modalReadyText,
    letterSpacing: 0.51,
  },
  practiceButton: {
    backgroundColor: homeColors.modalButtonDarkBg,
    borderRadius: spacing.inputRadius,
    height: 41,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxs,
    shadowColor: homeColors.modalButtonDarkShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  practiceLabel: {
    fontSize: 15,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "700",
    color: homeColors.white,
    letterSpacing: 0.51,
  },
});
