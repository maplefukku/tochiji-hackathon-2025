import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { Card } from '../components/Card'
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../constants/theme'

// MapViewのプレースホルダー（実際のマップはreact-native-mapsを使用）
const MapPlaceholder = () => (
  <View style={styles.mapPlaceholder}>
    <Text style={styles.mapPlaceholderText}>🗺️</Text>
    <Text style={styles.mapPlaceholderLabel}>地図表示エリア</Text>
    <Text style={styles.mapPlaceholderSubtext}>react-native-mapsで実装予定</Text>
  </View>
)

const nearbyPosts = [
  {
    id: '1',
    title: '渋谷109前',
    distance: '50m',
    count: 15,
    emoji: '🛍️',
  },
  {
    id: '2',
    title: 'ハチ公前広場',
    distance: '120m',
    count: 23,
    emoji: '🐕',
  },
  {
    id: '3',
    title: '渋谷パルコ',
    distance: '200m',
    count: 8,
    emoji: '🏬',
  },
]

const categories = [
  { id: '1', name: 'グルメ', emoji: '🍜', active: true },
  { id: '2', name: 'ショッピング', emoji: '🛍️', active: false },
  { id: '3', name: 'イベント', emoji: '🎉', active: false },
  { id: '4', name: '観光', emoji: '📸', active: false },
]

export const MapScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('1')
  const [showNearbyPosts, setShowNearbyPosts] = useState(true)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapPlaceholder />

        {/* カテゴリフィルター */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryFilter}
          contentContainerStyle={styles.categoryFilterContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 現在地ボタン */}
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationButtonIcon}>📍</Text>
        </TouchableOpacity>

        {/* フローティングアクションボタン */}
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabIcon}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* 近くの投稿パネル */}
      {showNearbyPosts && (
        <View style={styles.bottomPanel}>
          <TouchableOpacity
            style={styles.panelHandle}
            onPress={() => setShowNearbyPosts(!showNearbyPosts)}
          >
            <View style={styles.handleBar} />
          </TouchableOpacity>

          <Text style={styles.panelTitle}>近くの投稿</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.nearbyPostsScroll}
          >
            {nearbyPosts.map((post) => (
              <Card key={post.id} variant="elevated" style={styles.nearbyPostCard}>
                <Text style={styles.postEmoji}>{post.emoji}</Text>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postDistance}>{post.distance}</Text>
                <View style={styles.postCountBadge}>
                  <Text style={styles.postCount}>{post.count}</Text>
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontSize: 80,
    marginBottom: Spacing.md,
  },
  mapPlaceholderLabel: {
    ...Typography.title2,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  mapPlaceholderSubtext: {
    ...Typography.footnote,
    color: Colors.text.tertiary,
  },
  categoryFilter: {
    position: 'absolute',
    top: Spacing.md,
    left: 0,
    right: 0,
    maxHeight: 50,
  },
  categoryFilterContent: {
    paddingHorizontal: Spacing.md,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
    ...Shadows.md,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary.main,
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  categoryText: {
    ...Typography.footnote,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: Colors.primary.contrast,
  },
  locationButton: {
    position: 'absolute',
    right: Spacing.md,
    bottom: 280,
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.lg,
  },
  locationButtonIcon: {
    fontSize: 24,
  },
  fab: {
    position: 'absolute',
    right: Spacing.md,
    bottom: 220,
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.xl,
  },
  fabIcon: {
    fontSize: 24,
    color: Colors.primary.contrast,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background.primary,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingBottom: Spacing.lg,
    ...Shadows.xl,
  },
  panelHandle: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border.medium,
    borderRadius: BorderRadius.full,
  },
  panelTitle: {
    ...Typography.title3,
    color: Colors.text.primary,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  nearbyPostsScroll: {
    paddingHorizontal: Spacing.md,
  },
  nearbyPostCard: {
    width: 120,
    marginRight: Spacing.sm,
    alignItems: 'center',
  },
  postEmoji: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  postTitle: {
    ...Typography.footnote,
    color: Colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  postDistance: {
    ...Typography.caption1,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
  postCountBadge: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    backgroundColor: Colors.primary.main,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
  },
  postCount: {
    ...Typography.caption1,
    color: Colors.primary.contrast,
    fontWeight: '600',
  },
})
