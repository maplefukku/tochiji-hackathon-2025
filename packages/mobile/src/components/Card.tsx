import React from 'react'
import { View, TouchableOpacity, StyleSheet, ViewStyle, TouchableOpacityProps } from 'react-native'
import { Colors, Spacing, BorderRadius, Shadows } from '../constants/theme'

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode
  variant?: 'elevated' | 'outlined' | 'filled'
  padding?: 'none' | 'small' | 'medium' | 'large'
  style?: ViewStyle
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = 'medium',
  style,
  onPress,
  ...props
}) => {
  const cardStyles = [
    styles.base,
    styles[variant],
    padding !== 'none' && styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    style,
  ]

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyles} onPress={onPress} activeOpacity={0.7} {...props}>
        {children}
      </TouchableOpacity>
    )
  }

  return (
    <View style={cardStyles} {...props}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
  },

  // Variants
  elevated: {
    ...Shadows.md,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  filled: {
    backgroundColor: Colors.background.secondary,
  },

  // Padding
  paddingSmall: {
    padding: Spacing.sm,
  },
  paddingMedium: {
    padding: Spacing.md,
  },
  paddingLarge: {
    padding: Spacing.lg,
  },
})
