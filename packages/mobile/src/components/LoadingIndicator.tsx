import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { Colors, Spacing, Typography } from '../constants/theme'

interface LoadingIndicatorProps {
  size?: 'small' | 'large'
  color?: string
  text?: string
  fullScreen?: boolean
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'large',
  color = Colors.primary.main,
  text,
  fullScreen = false,
}) => {
  const content = (
    <>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </>
  )

  if (fullScreen) {
    return <View style={styles.fullScreenContainer}>{content}</View>
  }

  return <View style={styles.container}>{content}</View>
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.primary,
  },
  text: {
    ...Typography.body,
    color: Colors.text.secondary,
    marginTop: Spacing.md,
  },
})
