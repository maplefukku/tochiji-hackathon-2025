import { Platform, TouchableOpacity, TouchableOpacityProps } from 'react-native'

// Haptic feedback types
export enum HapticType {
  Light = 'light',
  Medium = 'medium',
  Heavy = 'heavy',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Selection = 'selection',
}

// Haptic feedback manager
class HapticsManager {
  private isEnabled: boolean = true

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled
  }

  trigger(type: HapticType = HapticType.Light) {
    if (!this.isEnabled) {
      return
    }

    // Platform-specific haptic implementations would go here
    // For now, we'll just log the haptic event in development
    // Development logging disabled to avoid console warnings

    // In a real implementation, you would use:
    // - iOS: ReactNativeHapticFeedback or Expo Haptics
    // - Android: Vibration API
    if (Platform.OS === 'ios') {
      // iOS specific haptic feedback
      this.triggerIOS(type)
    } else if (Platform.OS === 'android') {
      // Android specific haptic feedback
      this.triggerAndroid(type)
    }
  }

  private triggerIOS(type: HapticType) {
    // iOS haptic implementation
    // Would use libraries like react-native-haptic-feedback
    switch (type) {
      case HapticType.Light:
        // UIImpactFeedbackGenerator with style .light
        break
      case HapticType.Medium:
        // UIImpactFeedbackGenerator with style .medium
        break
      case HapticType.Heavy:
        // UIImpactFeedbackGenerator with style .heavy
        break
      case HapticType.Success:
      case HapticType.Warning:
      case HapticType.Error:
        // UINotificationFeedbackGenerator
        break
      case HapticType.Selection:
        // UISelectionFeedbackGenerator
        break
    }
  }

  private triggerAndroid(_type: HapticType) {
    // Android haptic implementation
    // Would use Vibration API with different patterns
    // const patterns: Record<HapticType, number[]> = {
    //   [HapticType.Light]: [0, 10],
    //   [HapticType.Medium]: [0, 20],
    //   [HapticType.Heavy]: [0, 40],
    //   [HapticType.Success]: [0, 30, 50, 30],
    //   [HapticType.Warning]: [0, 20, 20, 20],
    //   [HapticType.Error]: [0, 50, 50, 50],
    //   [HapticType.Selection]: [0, 5],
    // }
    // Vibration.vibrate(patterns[_type])
  }
}

export const Haptics = new HapticsManager()

// Haptic feedback wrapper component
import React from 'react'

interface HapticTouchableProps extends TouchableOpacityProps {
  hapticType?: HapticType
  children: React.ReactNode
}

export const HapticTouchable: React.FC<HapticTouchableProps> = ({
  hapticType = HapticType.Light,
  onPress,
  children,
  ...props
}) => {
  const handlePress = (event: React.BaseSyntheticEvent) => {
    Haptics.trigger(hapticType)
    onPress?.(event)
  }

  return (
    <TouchableOpacity {...props} onPress={handlePress}>
      {children}
    </TouchableOpacity>
  )
}
