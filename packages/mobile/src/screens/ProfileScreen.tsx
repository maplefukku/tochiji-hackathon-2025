import React from 'react'
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { Avatar } from '../components/Avatar'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme'

const stats = [
  { label: '投稿', value: '142' },
  { label: 'フォロワー', value: '2.3K' },
  { label: 'フォロー中', value: '489' },
]

const achievements = [
  { id: '1', emoji: '🏆', title: '渋谷マスター', description: '100投稿達成' },
  { id: '2', emoji: '🌟', title: 'トレンドセッター', description: '人気投稿10回' },
  { id: '3', emoji: '🗺️', title: '探検家', description: '50箇所訪問' },
]

const recentPosts = [
  { id: '1', image: '📸', location: '渋谷スクランブル交差点' },
  { id: '2', image: '🍜', location: '渋谷ラーメン横丁' },
  { id: '3', image: '🛍️', location: '渋谷109' },
  { id: '4', image: '☕', location: '渋谷スターバックス' },
]

export const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* プロフィールヘッダー */}
        <View style={styles.header}>
          <Avatar size="xlarge" name="山田太郎" />
          <Text style={styles.name}>山田太郎</Text>
          <Text style={styles.username}>@yamada_taro</Text>
          <Text style={styles.bio}>渋谷在住5年目 | グルメ探索が趣味 | 週末は渋谷散策 🚶‍♂️</Text>

          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.actionButtons}>
            <Button title="プロフィールを編集" variant="outline" size="medium" fullWidth />
          </View>
        </View>

        {/* 実績セクション */}
        <Card variant="filled" style={styles.section}>
          <Text style={styles.sectionTitle}>実績 🏅</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <TouchableOpacity key={achievement.id} style={styles.achievementItem}>
                <Text style={styles.achievementEmoji}>{achievement.emoji}</Text>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDesc}>{achievement.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* 最近の投稿 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>最近の投稿</Text>
          <View style={styles.postsGrid}>
            {recentPosts.map((post) => (
              <TouchableOpacity key={post.id} style={styles.postThumbnail}>
                <Text style={styles.postImage}>{post.image}</Text>
                <Text style={styles.postLocation}>{post.location}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ランキング情報 */}
        <Card variant="elevated" style={styles.section}>
          <View style={styles.rankingHeader}>
            <Text style={styles.sectionTitle}>今月のランキング</Text>
            <Text style={styles.rankingPosition}>#12</Text>
          </View>
          <View style={styles.rankingProgress}>
            <View style={styles.rankingProgressBar} />
          </View>
          <Text style={styles.rankingText}>あと3投稿でTOP10入り！</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background.primary,
  },
  name: {
    ...Typography.title1,
    color: Colors.text.primary,
    marginTop: Spacing.md,
  },
  username: {
    ...Typography.body,
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
  },
  bio: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
  },
  statValue: {
    ...Typography.title2,
    color: Colors.text.primary,
    fontWeight: '700',
  },
  statLabel: {
    ...Typography.footnote,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
  actionButtons: {
    width: '100%',
    paddingHorizontal: Spacing.xl,
  },
  section: {
    marginTop: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.title3,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  achievementsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementItem: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.sm,
  },
  achievementEmoji: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  achievementTitle: {
    ...Typography.caption1,
    color: Colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  achievementDesc: {
    ...Typography.caption2,
    color: Colors.text.tertiary,
    textAlign: 'center',
    marginTop: 2,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  postThumbnail: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
    backgroundColor: Colors.background.primary,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  postImage: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  postLocation: {
    ...Typography.caption1,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  rankingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rankingPosition: {
    ...Typography.title2,
    color: Colors.primary.main,
    fontWeight: '700',
  },
  rankingProgress: {
    height: 8,
    backgroundColor: Colors.background.tertiary,
    borderRadius: BorderRadius.full,
    marginVertical: Spacing.md,
    overflow: 'hidden',
  },
  rankingProgressBar: {
    height: '100%',
    width: '75%',
    backgroundColor: Colors.primary.main,
    borderRadius: BorderRadius.full,
  },
  rankingText: {
    ...Typography.footnote,
    color: Colors.text.secondary,
  },
})
