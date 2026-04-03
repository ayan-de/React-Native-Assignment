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
              {/* Elevated Feedback Button */}
              <View style={styles.buttonWrapper}>
                <View style={styles.feedbackShadow} />
                <Pressable
                  style={styles.readyButton}
                  onPress={() => onReady(question.id)}
                >
                  <Text style={styles.readyLabel}>FEEDBACK</Text>
                </Pressable>
              </View>

              {/* Elevated AI vs AI Button */}
              <View style={styles.buttonWrapper}>
                <View style={styles.practiceShadow} />
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
    gap: 12,
    zIndex: 1,
  },
  questionText: {
    fontSize: 16,
    fontFamily: typography.fonts.inter.bold,
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
    color: homeColors.modalSubtitleText,
    letterSpacing: -0.01,
  },
  buttonsContainer: {
    gap: 14,
    marginTop: 4,
  },
  buttonWrapper: {
    position: "relative",
    paddingBottom: 4,
  },
  feedbackShadow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 4,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: spacing.inputRadius,
  },
  readyButton: {
    backgroundColor: homeColors.white,
    borderRadius: spacing.inputRadius,
    height: 41,
    alignItems: "center",
    justifyContent: "center",
  },
  readyLabel: {
    fontSize: 15,
    fontFamily: typography.fonts.inter.bold,
    color: homeColors.modalReadyText,
    letterSpacing: 0.51,
  },
  practiceShadow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 4,
    bottom: 0,
    backgroundColor: homeColors.modalButtonDarkShadow,
    borderRadius: spacing.inputRadius,
  },
  practiceButton: {
    backgroundColor: homeColors.modalButtonDarkBg,
    borderRadius: spacing.inputRadius,
    height: 41,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxs,
  },
  practiceLabel: {
    fontSize: 15,
    fontFamily: typography.fonts.inter.bold,
    color: homeColors.white,
    letterSpacing: 0.51,
  },
});
