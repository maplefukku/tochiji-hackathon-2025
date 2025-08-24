import React from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { Colors, Spacing, BorderRadius } from '../constants/theme'

interface BadgeProps {
  text: string
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'small' | 'medium' | 'large'
  icon?: string
  style?: ViewStyle
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'primary',
  size = 'medium',
  icon,
  style,
}) => {
  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return Colors.status.success
      case 'warning':
        return Colors.status.warning
      case 'error':
        return Colors.status.error
      case 'info':
        return Colors.status.info
      default:
        return Colors.primary.main
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: Spacing.xs,
          paddingVertical: 2,
          fontSize: 10,
        }
      case 'large':
        return {
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.xs,
          fontSize: 14,
        }
      default:
        return {
          paddingHorizontal: Spacing.sm,
          paddingVertical: 4,
          fontSize: 12,
        }
    }
  }

  const sizeStyles = getSizeStyles()
  const backgroundColor = getVariantColor()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          paddingVertical: sizeStyles.paddingVertical,
        },
        style,
      ]}
    >
      {icon && <Text style={[styles.icon, { fontSize: sizeStyles.fontSize }]}>{icon}</Text>}
      <Text style={[styles.text, { fontSize: sizeStyles.fontSize }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    color: Colors.background.primary,
    fontWeight: '600',
  },
})
