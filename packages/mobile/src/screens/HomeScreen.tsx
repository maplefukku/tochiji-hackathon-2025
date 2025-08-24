import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import { PostCard } from '../components/PostCard'
import { AnimatedButton } from '../components/AnimatedButton'
import { GlassCard } from '../components/GlassCard'
import { AnimatedCard } from '../components/AnimatedCard'
import { Colors, Spacing, Typography } from '../constants/theme'

const mockPosts = [
  {
    id: '1',
    author: { name: '田中太郎', avatar: '' },
    content: '渋谷スクランブル交差点なう！今日も人が多いですね〜 🚶‍♂️',
    image: 'https://via.placeholder.com/400x300',
    location: '渋谷スクランブル交差点',
    timestamp: '5分前',
    likes: 42,
    comments: 8,
    isLiked: false,
  },
  {
    id: '2',
    author: { name: 'Emma Wilson', avatar: '' },
    content: 'Found an amazing ramen shop in Shibuya! The tonkotsu broth is incredible 🍜',
    location: '渋谷ラーメン横丁',
    timestamp: '15分前',
    likes: 128,
    comments: 23,
    isLiked: true,
  },
  {
    id: '3',
    author: { name: '김민수', avatar: '' },
    content: '시부야 타워레코드에서 좋은 음악 발견! K-POP 섹션이 정말 크네요 🎵',
    image: 'https://via.placeholder.com/400x300',
    location: '渋谷タワーレコード',
    timestamp: '30分前',
    likes: 89,
    comments: 15,
    isLiked: false,
  },
]

const trendingTopics = [
  { id: '1', title: '#渋谷ハロウィン2025', count: '2.3K 投稿' },
  { id: '2', title: '#ShibuyaCrossing', count: '1.8K 投稿' },
  { id: '3', title: '#渋谷グルメ', count: '956 投稿' },
  { id: '4', title: '#渋谷ショッピング', count: '742 投稿' },
]

export const HomeScreen: React.FC = () => {
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.heroSection}>
        <GlassCard intensity="light" style={styles.heroGlass}>
          <Text style={styles.heroTitle}>渋谷の「今」を共有しよう</Text>
          <Text style={styles.heroSubtitle}>リアルタイムで渋谷の情報をシェア</Text>
          <AnimatedButton
            title="投稿を作成"
            variant="secondary"
            size="large"
            fullWidth
            icon="✨"
            animationType="pulse"
            style={styles.createButton}
          />
        </GlassCard>
      </View>

      <AnimatedCard variant="slide" delay={200} style={styles.trendingCard}>
        <Text style={styles.sectionTitle}>トレンド 🔥</Text>
        {trendingTopics.map((topic, index) => (
          <AnimatedCard
            key={topic.id}
            variant="fade"
            delay={300 + index * 100}
            style={styles.trendingItemCard}
          >
            <TouchableOpacity style={styles.trendingItem}>
              <Text style={styles.trendingTitle}>{topic.title}</Text>
              <Text style={styles.trendingCount}>{topic.count}</Text>
            </TouchableOpacity>
          </AnimatedCard>
        ))}
      </AnimatedCard>

      <Text style={styles.sectionTitle}>最新の投稿</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            {...item}
            onPress={() => console.warn('Post pressed:', item.id)}
            onLike={() => console.warn('Like pressed:', item.id)}
            onComment={() => console.warn('Comment pressed:', item.id)}
            onShare={() => console.warn('Share pressed:', item.id)}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  content: {
    paddingBottom: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.md,
  },
  heroSection: {
    backgroundColor: Colors.primary.main,
    padding: Spacing.xl,
    paddingTop: Spacing.xxl,
  },
  heroGlass: {
    backgroundColor: 'transparent',
  },
  heroTitle: {
    ...Typography.largeTitle,
    color: Colors.primary.contrast,
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    ...Typography.body,
    color: Colors.primary.contrast,
    opacity: 0.9,
    marginBottom: Spacing.lg,
  },
  createButton: {
    marginTop: Spacing.md,
  },
  trendingCard: {
    margin: Spacing.md,
    marginTop: -Spacing.lg,
    backgroundColor: Colors.background.primary,
  },
  trendingItemCard: {
    backgroundColor: 'transparent',
    padding: 0,
    marginVertical: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  sectionTitle: {
    ...Typography.title2,
    color: Colors.text.primary,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  trendingItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  trendingTitle: {
    ...Typography.headline,
    color: Colors.primary.main,
    marginBottom: 2,
  },
  trendingCount: {
    ...Typography.footnote,
    color: Colors.text.tertiary,
  },
})
