import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native'
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../constants/theme'

const { width: screenWidth } = Dimensions.get('window')

interface FABAction {
  id: string
  icon: string
  label: string
  onPress: () => void
  color?: string
}

interface FloatingActionButtonProps {
  actions?: FABAction[]
  mainIcon?: string
  onMainPress?: () => void
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  actions = [],
  mainIcon = '➕',
  onMainPress,
  position = 'bottom-right',
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const animationValue = useRef(new Animated.Value(0)).current
  const rotateValue = useRef(new Animated.Value(0)).current
  const scaleValue = useRef(new Animated.Value(1)).current

  const toggleMenu = () => {
    const toValue = isExpanded ? 0 : 1

    Animated.parallel([
      Animated.spring(animationValue, {
        toValue,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(rotateValue, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()

    setIsExpanded(!isExpanded)
  }

  const handleMainPress = () => {
    // プレスアニメーション
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()

    if (actions.length > 0) {
      toggleMenu()
    } else {
      onMainPress?.()
    }
  }

  const handleActionPress = (action: FABAction) => {
    action.onPress()
    toggleMenu()
  }

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  })

  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-left':
        return { left: Spacing.md }
      case 'bottom-center':
        return { left: screenWidth / 2 - 28 }
      default:
        return { right: Spacing.md }
    }
  }

  return (
    <View style={[styles.container, getPositionStyles()]}>
      {/* 背景オーバーレイ */}
      {isExpanded && (
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.3],
              }),
            },
          ]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            onPress={toggleMenu}
            activeOpacity={1}
          />
        </Animated.View>
      )}

      {/* アクションボタン */}
      {actions.map((action, index) => {
        const translateY = animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(70 * (index + 1))],
        })

        const opacity = animationValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 0, 1],
        })

        const scale = animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        })

        return (
          <Animated.View
            key={action.id}
            style={[
              styles.actionContainer,
              {
                transform: [{ translateY }, { scale }],
                opacity,
              },
            ]}
          >
            {/* ラベル */}
            <Animated.View
              style={[
                styles.labelContainer,
                {
                  opacity,
                  transform: [
                    {
                      translateX: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.label}>{action.label}</Text>
            </Animated.View>

            {/* アクションボタン */}
            <TouchableOpacity
              style={[styles.actionButton, action.color && { backgroundColor: action.color }]}
              onPress={() => handleActionPress(action)}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
            </TouchableOpacity>
          </Animated.View>
        )
      })}

      {/* メインボタン */}
      <Animated.View
        style={[
          styles.mainButton,
          {
            transform: [{ rotate }, { scale: scaleValue }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleMainPress}
          activeOpacity={0.9}
          style={styles.mainButtonTouchable}
        >
          <Text style={styles.mainIcon}>{mainIcon}</Text>
        </TouchableOpacity>

        {/* リップルエフェクト */}
        <Animated.View
          style={[
            styles.ripple,
            {
              transform: [
                {
                  scale: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2],
                  }),
                },
              ],
              opacity: animationValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.5, 0],
              }),
            },
          ]}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    zIndex: 999,
  },
  overlay: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -100,
    bottom: -100,
    backgroundColor: Colors.text.primary,
  },
  mainButton: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.xl,
    elevation: 8,
  },
  mainButtonTouchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainIcon: {
    fontSize: 24,
    color: Colors.primary.contrast,
  },
  ripple: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary.main,
  },
  actionContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 0,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
    elevation: 4,
  },
  actionIcon: {
    fontSize: 20,
  },
  labelContainer: {
    marginRight: Spacing.sm,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    ...Shadows.sm,
  },
  label: {
    ...Typography.caption1,
    color: Colors.text.primary,
    fontWeight: '500',
  },
})
