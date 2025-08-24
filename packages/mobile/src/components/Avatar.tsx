import React from 'react'
import { View, Image, Text, StyleSheet, ViewStyle } from 'react-native'
import { Colors } from '../constants/theme'

interface AvatarProps {
  source?: { uri: string } | number
  name?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  style?: ViewStyle
  badge?: React.ReactNode
}

export const Avatar: React.FC<AvatarProps> = ({ source, name, size = 'medium', style, badge }) => {
  const sizeValue = {
    small: 32,
    medium: 40,
    large: 56,
    xlarge: 80,
  }[size]

  const fontSize = {
    small: 14,
    medium: 16,
    large: 20,
    xlarge: 28,
  }[size]

  const getInitials = (name: string) => {
    const words = name.trim().split(' ')
    if (words.length >= 2) {
      return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <View style={[{ width: sizeValue, height: sizeValue }, style]}>
      {source ? (
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: sizeValue,
              height: sizeValue,
              borderRadius: sizeValue / 2,
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            {
              width: sizeValue,
              height: sizeValue,
              borderRadius: sizeValue / 2,
            },
          ]}
        >
          <Text style={[styles.initials, { fontSize }]}>{name ? getInitials(name) : '?'}</Text>
        </View>
      )}
      {badge && <View style={styles.badge}>{badge}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  placeholder: {
    backgroundColor: Colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: Colors.primary.contrast,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
})
