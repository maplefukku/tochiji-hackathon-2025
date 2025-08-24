import React from 'react'
import { View, StyleSheet, ViewStyle, Platform } from 'react-native'
import { Colors, Spacing, BorderRadius } from '../constants/theme'

interface GlassCardProps {
  children: React.ReactNode
  intensity?: 'light' | 'medium' | 'strong'
  borderWidth?: number
  style?: ViewStyle
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  intensity = 'medium',
  borderWidth = 1,
  style,
}) => {
  const getOpacity = () => {
    switch (intensity) {
      case 'light':
        return 0.1
      case 'strong':
        return 0.3
      default:
        return 0.2
    }
  }

  return (
    <View style={[styles.container, style]}>
      {/* 背景レイヤー */}
      <View
        style={[
          styles.background,
          {
            backgroundColor: Colors.background.primary,
            opacity: getOpacity(),
          },
        ]}
      />

      {/* ボーダーレイヤー */}
      <View
        style={[
          styles.border,
          {
            borderWidth,
            borderColor: `${Colors.border.light}40`, // 40% opacity
          },
        ]}
      />

      {/* グラデーションエフェクト */}
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />

      {/* コンテンツ */}
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.text.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: BorderRadius.lg,
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: BorderRadius.lg,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: Colors.background.primary,
    opacity: 0.05,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: Colors.text.primary,
    opacity: 0.02,
  },
  content: {
    padding: Spacing.md,
  },
})
