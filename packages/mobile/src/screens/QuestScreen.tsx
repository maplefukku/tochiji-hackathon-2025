import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme'

const questCategories = [
  { id: 'daily', name: 'デイリー', emoji: '📅' },
  { id: 'weekly', name: 'ウィークリー', emoji: '📆' },
  { id: 'special', name: 'スペシャル', emoji: '⭐' },
  { id: 'achievement', name: '実績', emoji: '🏆' },
]

const quests = {
  daily: [
    {
      id: '1',
      title: '渋谷で3箇所チェックイン',
      description: '渋谷エリアの異なる3箇所でチェックインしよう',
      progress: 2,
      total: 3,
      reward: '50 XP',
      emoji: '📍',
    },
    {
      id: '2',
      title: '投稿を5件いいね',
      description: '他のユーザーの投稿に5件いいねをつけよう',
      progress: 3,
      total: 5,
      reward: '30 XP',
      emoji: '❤️',
    },
  ],
  weekly: [
    {
      id: '3',
      title: '渋谷グルメハンター',
      description: '渋谷の飲食店5店舗でチェックイン',
      progress: 2,
      total: 5,
      reward: '200 XP + バッジ',
      emoji: '🍜',
    },
    {
      id: '4',
      title: 'ソーシャルマスター',
      description: '20件の投稿にコメント',
      progress: 8,
      total: 20,
      reward: '150 XP',
      emoji: '💬',
    },
  ],
  special: [
    {
      id: '5',
      title: 'ハロウィンイベント参加',
      description: '渋谷ハロウィンイベントエリアでチェックイン',
      progress: 0,
      total: 1,
      reward: '限定バッジ',
      emoji: '🎃',
      timeLimit: '10月31日まで',
    },
  ],
  achievement: [
    {
      id: '6',
      title: '渋谷マスター',
      description: '渋谷エリアで100回チェックイン',
      progress: 67,
      total: 100,
      reward: 'プラチナバッジ',
      emoji: '🏅',
    },
  ],
}

export const QuestScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('daily')

  const currentQuests = quests[selectedCategory as keyof typeof quests] || []

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ヘッダー */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>クエスト</Text>
          <View style={styles.xpContainer}>
            <Text style={styles.xpLabel}>現在のXP</Text>
            <Text style={styles.xpValue}>1,250</Text>
          </View>
        </View>

        {/* カテゴリータブ */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryTabs}
          contentContainerStyle={styles.categoryTabsContent}
        >
          {questCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                selectedCategory === category.id && styles.categoryTabActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <Text
                style={[
                  styles.categoryName,
                  selectedCategory === category.id && styles.categoryNameActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* クエストリスト */}
        <View style={styles.questList}>
          {currentQuests.map((quest) => (
            <Card key={quest.id} variant="elevated" style={styles.questCard}>
              <View style={styles.questHeader}>
                <Text style={styles.questEmoji}>{quest.emoji}</Text>
                <View style={styles.questInfo}>
                  <Text style={styles.questTitle}>{quest.title}</Text>
                  <Text style={styles.questDescription}>{quest.description}</Text>
                  {quest.timeLimit && (
                    <Text style={styles.questTimeLimit}>⏰ {quest.timeLimit}</Text>
                  )}
                </View>
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${(quest.progress / quest.total) * 100}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {quest.progress}/{quest.total}
                </Text>
              </View>

              <View style={styles.questFooter}>
                <View style={styles.rewardContainer}>
                  <Text style={styles.rewardLabel}>報酬:</Text>
                  <Text style={styles.rewardValue}>{quest.reward}</Text>
                </View>
                <Button
                  title={quest.progress === quest.total ? '受け取る' : '詳細'}
                  variant={quest.progress === quest.total ? 'primary' : 'outline'}
                  size="small"
                />
              </View>
            </Card>
          ))}
        </View>

        {/* 統計カード */}
        <Card variant="filled" style={styles.statsCard}>
          <Text style={styles.statsTitle}>今週の統計</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>完了クエスト</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>450</Text>
              <Text style={styles.statLabel}>獲得XP</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>新バッジ</Text>
            </View>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.background.primary,
  },
  headerTitle: {
    ...Typography.largeTitle,
    color: Colors.text.primary,
  },
  xpContainer: {
    alignItems: 'flex-end',
  },
  xpLabel: {
    ...Typography.caption1,
    color: Colors.text.tertiary,
  },
  xpValue: {
    ...Typography.title2,
    color: Colors.primary.main,
    fontWeight: '700',
  },
  categoryTabs: {
    backgroundColor: Colors.background.primary,
    paddingVertical: Spacing.sm,
  },
  categoryTabsContent: {
    paddingHorizontal: Spacing.md,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginRight: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.background.secondary,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary.main,
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  categoryName: {
    ...Typography.footnote,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  categoryNameActive: {
    color: Colors.primary.contrast,
  },
  questList: {
    padding: Spacing.md,
  },
  questCard: {
    marginBottom: Spacing.md,
  },
  questHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  questEmoji: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  questInfo: {
    flex: 1,
  },
  questTitle: {
    ...Typography.headline,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  questDescription: {
    ...Typography.footnote,
    color: Colors.text.secondary,
  },
  questTimeLimit: {
    ...Typography.caption1,
    color: Colors.status.warning,
    marginTop: Spacing.xs,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.background.tertiary,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginRight: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary.main,
    borderRadius: BorderRadius.full,
  },
  progressText: {
    ...Typography.caption1,
    color: Colors.text.secondary,
    minWidth: 40,
  },
  questFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardLabel: {
    ...Typography.footnote,
    color: Colors.text.tertiary,
    marginRight: Spacing.xs,
  },
  rewardValue: {
    ...Typography.footnote,
    color: Colors.accent.yellow,
    fontWeight: '600',
  },
  statsCard: {
    margin: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statsTitle: {
    ...Typography.title3,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...Typography.title1,
    color: Colors.primary.main,
    fontWeight: '700',
  },
  statLabel: {
    ...Typography.caption1,
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
  },
})
