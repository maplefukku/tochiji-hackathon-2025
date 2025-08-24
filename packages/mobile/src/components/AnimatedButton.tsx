import React, { useRef } from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../constants/theme'

interface AnimatedButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  loading?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  animationType?: 'scale' | 'bounce' | 'pulse'
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  animationType = 'scale',
  disabled,
  onPress,
  style,
  ...props
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current
  const pulseValue = useRef(new Animated.Value(1)).current

  // パルスアニメーション（継続的）
  React.useEffect(() => {
    if (animationType === 'pulse' && !disabled) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      )
      pulse.start()
      return () => pulse.stop()
    }
  }, [animationType, disabled, pulseValue])

  const handlePressIn = () => {
    if (animationType === 'scale' || animationType === 'bounce') {
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }).start()
    }
  }

  const handlePressOut = () => {
    if (animationType === 'scale') {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start()
    } else if (animationType === 'bounce') {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }

  const getButtonStyles = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.button]

    // バリアント
    switch (variant) {
      case 'secondary':
        baseStyles.push(styles.secondaryButton)
        break
      case 'ghost':
        baseStyles.push(styles.ghostButton)
        break
      case 'danger':
        baseStyles.push(styles.dangerButton)
        break
      default:
        baseStyles.push(styles.primaryButton)
    }

    // サイズ
    switch (size) {
      case 'small':
        baseStyles.push(styles.smallButton)
        break
      case 'large':
        baseStyles.push(styles.largeButton)
        break
      default:
        baseStyles.push(styles.mediumButton)
    }

    if (fullWidth) {
      baseStyles.push(styles.fullWidth)
    }

    if (disabled) {
      baseStyles.push(styles.disabledButton)
    }

    return baseStyles
  }

  const getTextStyles = (): TextStyle[] => {
    const baseStyles: TextStyle[] = [styles.text]

    switch (variant) {
      case 'secondary':
        baseStyles.push(styles.secondaryText)
        break
      case 'ghost':
        baseStyles.push(styles.ghostText)
        break
      case 'danger':
        baseStyles.push(styles.dangerText)
        break
      default:
        baseStyles.push(styles.primaryText)
    }

    switch (size) {
      case 'small':
        baseStyles.push(styles.smallText)
        break
      case 'large':
        baseStyles.push(styles.largeText)
        break
      default:
        baseStyles.push(styles.mediumText)
    }

    if (disabled) {
      baseStyles.push(styles.disabledText)
    }

    return baseStyles
  }

  const animatedStyle = {
    transform: [{ scale: animationType === 'pulse' ? pulseValue : scaleValue }],
  }

  return (
    <Animated.View style={[animatedStyle, fullWidth && styles.fullWidth]}>
      <TouchableOpacity
        {...props}
        style={[getButtonStyles(), style]}
        disabled={disabled || loading}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {loading ? (
          <Animated.View style={styles.loadingContainer}>
            <Text style={getTextStyles()}>⏳</Text>
          </Animated.View>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <Text style={[getTextStyles(), styles.icon]}>{icon}</Text>
            )}
            <Text style={getTextStyles()}>{title}</Text>
            {icon && iconPosition === 'right' && (
              <Text style={[getTextStyles(), styles.icon]}>{icon}</Text>
            )}
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
    ...Shadows.sm,
  },
  primaryButton: {
    backgroundColor: Colors.primary.main,
  },
  secondaryButton: {
    backgroundColor: Colors.background.primary,
    borderWidth: 1,
    borderColor: Colors.border.medium,
  },
  ghostButton: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  dangerButton: {
    backgroundColor: Colors.status.error,
  },
  disabledButton: {
    backgroundColor: Colors.border.light,
    shadowOpacity: 0,
    elevation: 0,
  },
  smallButton: {
    paddingHorizontal: Spacing.md,
    height: 36,
  },
  mediumButton: {
    paddingHorizontal: Spacing.lg,
    height: 44,
  },
  largeButton: {
    paddingHorizontal: Spacing.xl,
    height: 52,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: Colors.primary.contrast,
  },
  secondaryText: {
    color: Colors.text.primary,
  },
  ghostText: {
    color: Colors.primary.main,
  },
  dangerText: {
    color: Colors.primary.contrast,
  },
  disabledText: {
    color: Colors.text.tertiary,
  },
  smallText: {
    ...Typography.footnote,
  },
  mediumText: {
    ...Typography.callout,
  },
  largeText: {
    ...Typography.headline,
  },
  icon: {
    marginHorizontal: Spacing.xs,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
