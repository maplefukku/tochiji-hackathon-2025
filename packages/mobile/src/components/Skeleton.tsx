import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, ViewStyle } from 'react-native'
import { Colors, Spacing, BorderRadius } from '../constants/theme'

interface SkeletonProps {
  width?: number | string
  height?: number | string
  borderRadius?: number
  style?: ViewStyle
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  animation?: 'pulse' | 'wave' | 'none'
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius,
  style,
  variant = 'rectangular',
  animation = 'pulse',
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (animation === 'none') {
      return
    }

    const animationLoop = Animated.loop(
      animation === 'pulse'
        ? Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        : Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          })
    )

    animationLoop.start()
    return () => animationLoop.stop()
  }, [animation, animatedValue])

  const getRadius = () => {
    if (borderRadius !== undefined) {
      return borderRadius
    }
    switch (variant) {
      case 'circular':
        return 9999
      case 'rounded':
        return BorderRadius.lg
      case 'text':
        return BorderRadius.sm
      default:
        return BorderRadius.md
    }
  }

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: animation === 'pulse' ? [0.3, 0.7] : [0.3, 0.3],
  })

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  })

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius: getRadius(),
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.skeleton,
          {
            opacity: animation === 'pulse' ? opacity : 0.3,
            borderRadius: getRadius(),
          },
        ]}
      />
      {animation === 'wave' && (
        <Animated.View
          style={[
            styles.wave,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      )}
    </View>
  )
}

// Skeleton group for loading states
interface SkeletonGroupProps {
  count?: number
  children?: React.ReactNode
}

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({ count = 1, children }) => {
  if (children) {
    return <View style={styles.group}>{children}</View>
  }

  return (
    <View style={styles.group}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} style={styles.groupItem} />
      ))}
    </View>
  )
}

// Preset skeleton components
export const SkeletonCard: React.FC = () => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Skeleton variant="circular" width={40} height={40} />
      <View style={styles.cardHeaderText}>
        <Skeleton width={120} height={16} />
        <Skeleton width={80} height={12} style={{ marginTop: 4 }} />
      </View>
    </View>
    <Skeleton height={12} style={{ marginTop: Spacing.md }} />
    <Skeleton height={12} width="80%" style={{ marginTop: Spacing.xs }} />
    <Skeleton height={200} variant="rounded" style={{ marginTop: Spacing.md }} />
    <View style={styles.cardFooter}>
      <Skeleton width={60} height={24} />
      <Skeleton width={60} height={24} />
      <Skeleton width={60} height={24} />
    </View>
  </View>
)

export const SkeletonList: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <View>
    {Array.from({ length: count }).map((_, index) => (
      <View key={index} style={styles.listItem}>
        <Skeleton variant="circular" width={48} height={48} />
        <View style={styles.listItemContent}>
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={12} style={{ marginTop: 4 }} />
        </View>
      </View>
    ))}
  </View>
)

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: Colors.background.secondary,
  },
  skeleton: {
    flex: 1,
    backgroundColor: Colors.border.light,
  },
  wave: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '-20deg' }],
  },
  group: {
    padding: Spacing.md,
  },
  groupItem: {
    marginBottom: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.background.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    margin: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.background.primary,
    marginBottom: Spacing.xs,
  },
  listItemContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
})
