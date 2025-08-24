import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native'
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../constants/theme'

const { width: screenWidth } = Dimensions.get('window')

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onHide?: () => void
  action?: {
    label: string
    onPress: () => void
  }
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onHide,
  action,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current
  const opacity = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(0.9)).current

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.()
    })
  }

  useEffect(() => {
    // Show animation
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        tension: 50,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start()

    // Auto hide
    const timer = setTimeout(() => {
      hideToast()
    }, duration)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      default:
        return 'ℹ️'
    }
  }

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          background: Colors.status.success,
          text: Colors.primary.contrast,
        }
      case 'error':
        return {
          background: Colors.status.error,
          text: Colors.primary.contrast,
        }
      case 'warning':
        return {
          background: Colors.status.warning,
          text: Colors.text.primary,
        }
      default:
        return {
          background: Colors.status.info,
          text: Colors.primary.contrast,
        }
    }
  }

  const colors = getColors()

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          transform: [{ translateY }, { scale }],
          opacity,
        },
      ]}
    >
      <TouchableOpacity style={styles.content} onPress={hideToast} activeOpacity={0.9}>
        <Text style={styles.icon}>{getIcon()}</Text>
        <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
        {action && (
          <TouchableOpacity style={styles.actionButton} onPress={action.onPress}>
            <Text style={[styles.actionText, { color: colors.text }]}>{action.label}</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animated.View>
  )
}

// Toast Manager for global usage
class ToastManager {
  private showCallback?: (props: ToastProps) => void

  setShowCallback(callback: (props: ToastProps) => void) {
    this.showCallback = callback
  }

  show(props: ToastProps) {
    this.showCallback?.(props)
  }

  success(message: string, duration?: number) {
    this.show({ message, type: 'success', duration })
  }

  error(message: string, duration?: number) {
    this.show({ message, type: 'error', duration })
  }

  warning(message: string, duration?: number) {
    this.show({ message, type: 'warning', duration })
  }

  info(message: string, duration?: number) {
    this.show({ message, type: 'info', duration })
  }
}

export const ToastService = new ToastManager()

// Toast Provider Component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([])

  useEffect(() => {
    ToastService.setShowCallback((props) => {
      const id = Date.now().toString()
      setToasts((prev) => [...prev, { ...props, id }])
    })
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <>
      {children}
      <View style={styles.toastContainer}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onHide={() => removeToast(toast.id)} />
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  container: {
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.xs,
    borderRadius: BorderRadius.lg,
    ...Shadows.lg,
    maxWidth: screenWidth - Spacing.md * 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  icon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  message: {
    ...Typography.callout,
    flex: 1,
    fontWeight: '500',
  },
  actionButton: {
    marginLeft: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionText: {
    ...Typography.footnote,
    fontWeight: '600',
  },
})
