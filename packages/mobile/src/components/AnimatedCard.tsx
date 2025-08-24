import React, { useRef, useEffect } from 'react'
import { View, StyleSheet, Animated, TouchableOpacity, ViewStyle, Dimensions } from 'react-native'
import { Colors, Spacing, BorderRadius, Shadows } from '../constants/theme'

const { width: screenWidth } = Dimensions.get('window')

interface AnimatedCardProps {
  children: React.ReactNode
  variant?: 'slide' | 'fade' | 'scale' | 'flip'
  delay?: number
  duration?: number
  onPress?: () => void
  style?: ViewStyle
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  variant = 'fade',
  delay = 0,
  duration = 500,
  onPress,
  style,
}) => {
  const animationValue = useRef(new Animated.Value(0)).current
  const scaleValue = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const animation = Animated.timing(animationValue, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    })
    animation.start()
  }, [animationValue, delay, duration])

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.98,
      duration: 100,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start()
  }

  const getAnimatedStyle = () => {
    switch (variant) {
      case 'slide':
        return {
          transform: [
            {
              translateX: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [screenWidth, 0],
              }),
            },
            { scale: scaleValue },
          ],
          opacity: animationValue,
        }
      case 'scale':
        return {
          transform: [
            {
              scale: Animated.multiply(
                animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
                scaleValue
              ),
            },
          ],
          opacity: animationValue,
        }
      case 'flip':
        return {
          transform: [
            {
              rotateY: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['90deg', '0deg'],
              }),
            },
            { scale: scaleValue },
          ],
          opacity: animationValue,
        }
      default: // fade
        return {
          opacity: animationValue,
          transform: [{ scale: scaleValue }],
        }
    }
  }

  const CardContent = (
    <Animated.View style={[styles.card, getAnimatedStyle(), style]}>
      {/* グラデーションオーバーレイ */}
      <View style={StyleSheet.absoluteFillObject}>
        <Animated.View
          style={[
            styles.gradientOverlay,
            {
              opacity: animationValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.1, 0],
              }),
            },
          ]}
        />
      </View>
      {children}
    </Animated.View>
  )

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {CardContent}
      </TouchableOpacity>
    )
  }

  return CardContent
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginVertical: Spacing.sm,
    ...Shadows.md,
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary.main,
    borderRadius: BorderRadius.lg,
  },
})
