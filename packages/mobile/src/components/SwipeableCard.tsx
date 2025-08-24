import React, { useRef } from 'react'
import { Animated, PanResponder, Text, StyleSheet, Dimensions } from 'react-native'
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../constants/theme'

const { width: screenWidth } = Dimensions.get('window')
const SWIPE_THRESHOLD = screenWidth * 0.25

interface SwipeableCardProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onDoubleTap?: () => void
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onDoubleTap,
}) => {
  const pan = useRef(new Animated.ValueXY()).current
  const lastTap = useRef(0)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        // ダブルタップ検出
        const now = Date.now()
        const DOUBLE_TAP_DELAY = 300
        if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
          onDoubleTap?.()
        }
        lastTap.current = now
      },

      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),

      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > SWIPE_THRESHOLD) {
          // スワイプ完了
          if (gestureState.dx > 0) {
            // 右スワイプ
            Animated.timing(pan, {
              toValue: { x: screenWidth, y: 0 },
              duration: 200,
              useNativeDriver: false,
            }).start(() => {
              onSwipeRight?.()
              pan.setValue({ x: 0, y: 0 })
            })
          } else {
            // 左スワイプ
            Animated.timing(pan, {
              toValue: { x: -screenWidth, y: 0 },
              duration: 200,
              useNativeDriver: false,
            }).start(() => {
              onSwipeLeft?.()
              pan.setValue({ x: 0, y: 0 })
            })
          }
        } else {
          // 元の位置に戻す
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            friction: 5,
          }).start()
        }
      },
    })
  ).current

  const rotate = pan.x.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  })

  const opacity = pan.x.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  })

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
          opacity,
        },
      ]}
      {...panResponder.panHandlers}
    >
      {children}

      {/* スワイプインジケーター */}
      <Animated.View
        style={[
          styles.swipeIndicator,
          styles.leftIndicator,
          {
            opacity: pan.x.interpolate({
              inputRange: [-SWIPE_THRESHOLD, 0],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <Text style={styles.indicatorText}>👈 パス</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.swipeIndicator,
          styles.rightIndicator,
          {
            opacity: pan.x.interpolate({
              inputRange: [0, SWIPE_THRESHOLD],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <Text style={styles.indicatorText}>いいね 👉</Text>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeIndicator: {
    position: 'absolute',
    top: '50%',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.full,
    ...Shadows.lg,
  },
  leftIndicator: {
    left: Spacing.md,
  },
  rightIndicator: {
    right: Spacing.md,
  },
  indicatorText: {
    ...Typography.headline,
    color: Colors.primary.main,
    fontWeight: '600',
  },
})
