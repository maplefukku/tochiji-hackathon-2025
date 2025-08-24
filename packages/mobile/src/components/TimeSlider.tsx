import React, { useState } from 'react'
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native'
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme'

const { width: screenWidth } = Dimensions.get('window')
const SLIDER_WIDTH = screenWidth - Spacing.xl * 2

interface TimeSliderProps {
  onTimeChange?: (hours: number) => void
}

export const TimeSlider: React.FC<TimeSliderProps> = ({ onTimeChange }) => {
  const [sliderValue] = useState(new Animated.Value(0))
  const [currentHours, setCurrentHours] = useState(0)

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderMove: (_, gestureState) => {
      const newValue = Math.max(0, Math.min(gestureState.dx, SLIDER_WIDTH))
      sliderValue.setValue(newValue)

      const hours = Math.round((newValue / SLIDER_WIDTH) * 24)
      setCurrentHours(hours)
      onTimeChange?.(hours)
    },

    onPanResponderRelease: (_, gestureState) => {
      const newValue = Math.max(0, Math.min(gestureState.dx, SLIDER_WIDTH))
      const hours = Math.round((newValue / SLIDER_WIDTH) * 24)

      // スナップポイントに吸着
      const snapValue = (hours / 24) * SLIDER_WIDTH
      Animated.spring(sliderValue, {
        toValue: snapValue,
        friction: 5,
        useNativeDriver: false,
      }).start()
    },
  })

  const getTimeLabel = (hours: number) => {
    if (hours === 0) {
      return '今'
    }
    if (hours < 1) {
      return `${Math.round(hours * 60)}分前`
    }
    return `${hours}時間前`
  }

  const getTimeMarkers = () => {
    return [0, 6, 12, 18, 24].map((hour) => (
      <View key={hour} style={styles.marker}>
        <View style={styles.markerLine} />
        <Text style={styles.markerLabel}>{hour === 0 ? '今' : `${hour}h`}</Text>
      </View>
    ))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⏰ 時間軸</Text>
        <Text style={styles.currentTime}>{getTimeLabel(currentHours)}</Text>
      </View>

      <View style={styles.sliderContainer}>
        <View style={styles.track} />

        <Animated.View
          style={[
            styles.activeTrack,
            {
              width: sliderValue,
            },
          ]}
        />

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.thumb,
            {
              transform: [{ translateX: sliderValue }],
            },
          ]}
        >
          <View style={styles.thumbInner} />
        </Animated.View>

        <View style={styles.markersContainer}>{getTimeMarkers()}</View>
      </View>

      <View style={styles.labels}>
        <Text style={styles.labelStart}>現在</Text>
        <Text style={styles.labelEnd}>24時間前</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.headline,
    color: Colors.text.primary,
  },
  currentTime: {
    ...Typography.headline,
    color: Colors.primary.main,
    fontWeight: '600',
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    position: 'absolute',
    height: 4,
    width: SLIDER_WIDTH,
    backgroundColor: Colors.border.light,
    borderRadius: BorderRadius.full,
  },
  activeTrack: {
    position: 'absolute',
    height: 4,
    backgroundColor: Colors.primary.main,
    borderRadius: BorderRadius.full,
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    marginLeft: -12,
  },
  thumbInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary.main,
    borderWidth: 4,
    borderColor: Colors.background.primary,
    shadowColor: Colors.primary.main,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  markersContainer: {
    position: 'absolute',
    width: SLIDER_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 20,
  },
  marker: {
    alignItems: 'center',
  },
  markerLine: {
    width: 1,
    height: 8,
    backgroundColor: Colors.border.medium,
    marginBottom: 2,
  },
  markerLabel: {
    ...Typography.caption2,
    color: Colors.text.tertiary,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  labelStart: {
    ...Typography.caption1,
    color: Colors.text.secondary,
  },
  labelEnd: {
    ...Typography.caption1,
    color: Colors.text.secondary,
  },
})
