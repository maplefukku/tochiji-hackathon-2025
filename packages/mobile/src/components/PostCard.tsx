import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Card } from './Card'
import { Avatar } from './Avatar'
import { Colors, Spacing, Typography } from '../constants/theme'

interface PostCardProps {
  id: string
  author: {
    name: string
    avatar?: string
  }
  content: string
  image?: string
  location: string
  timestamp: string
  likes: number
  comments: number
  isLiked?: boolean
  onPress?: () => void
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
}

export const PostCard: React.FC<PostCardProps> = ({
  author,
  content,
  image,
  location,
  timestamp,
  likes,
  comments,
  isLiked = false,
  onPress,
  onLike,
  onComment,
  onShare,
}) => {
  return (
    <Card variant="elevated" padding="none" onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Avatar
          source={author.avatar ? { uri: author.avatar } : undefined}
          name={author.name}
          size="medium"
        />
        <View style={styles.headerInfo}>
          <Text style={styles.authorName}>{author.name}</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.location}>📍 {location}</Text>
            <Text style={styles.timestamp}> · {timestamp}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.content}>{content}</Text>

      {image && <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onLike}>
          <Text style={[styles.actionIcon, isLiked && styles.likedIcon]}>
            {isLiked ? '❤️' : '🤍'}
          </Text>
          <Text style={styles.actionCount}>{likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onComment}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionCount}>{comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onShare}>
          <Text style={styles.actionIcon}>📤</Text>
        </TouchableOpacity>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    padding: Spacing.md,
  },
  headerInfo: {
    marginLeft: Spacing.sm,
    flex: 1,
  },
  authorName: {
    ...Typography.headline,
    color: Colors.text.primary,
  },
  metaContainer: {
    flexDirection: 'row',
    marginTop: 2,
  },
  location: {
    ...Typography.footnote,
    color: Colors.primary.main,
  },
  timestamp: {
    ...Typography.footnote,
    color: Colors.text.tertiary,
  },
  content: {
    ...Typography.body,
    color: Colors.text.primary,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: Spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  actionIcon: {
    fontSize: 20,
  },
  likedIcon: {
    color: Colors.status.error,
  },
  actionCount: {
    ...Typography.footnote,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
})
