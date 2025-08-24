import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native'
import { Card } from '../components/Card'
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme'

const settingSections = [
  {
    title: 'アカウント',
    items: [
      { id: 'profile', title: 'プロフィール編集', icon: '👤' },
      { id: 'privacy', title: 'プライバシー設定', icon: '🔒' },
      { id: 'security', title: 'セキュリティ', icon: '🛡️' },
    ],
  },
  {
    title: '通知',
    items: [
      { id: 'push', title: 'プッシュ通知', icon: '🔔', hasSwitch: true },
      { id: 'email', title: 'メール通知', icon: '📧', hasSwitch: true },
      { id: 'location', title: '位置情報通知', icon: '📍', hasSwitch: true },
    ],
  },
  {
    title: 'アプリ設定',
    items: [
      { id: 'language', title: '言語', icon: '🌐', value: '日本語' },
      { id: 'theme', title: 'テーマ', icon: '🎨', value: 'ライト' },
      { id: 'cache', title: 'キャッシュクリア', icon: '🗑️' },
    ],
  },
  {
    title: 'サポート',
    items: [
      { id: 'help', title: 'ヘルプセンター', icon: '❓' },
      { id: 'feedback', title: 'フィードバック', icon: '💬' },
      { id: 'terms', title: '利用規約', icon: '📄' },
      { id: 'privacy-policy', title: 'プライバシーポリシー', icon: '📋' },
    ],
  },
]

export const SettingsScreen: React.FC = () => {
  const [switches, setSwitches] = useState({
    push: true,
    email: false,
    location: true,
  })

  const toggleSwitch = (id: string) => {
    setSwitches((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>設定</Text>
        </View>

        {/* アカウント情報 */}
        <Card variant="elevated" style={styles.accountCard}>
          <View style={styles.accountInfo}>
            <View style={styles.accountAvatar}>
              <Text style={styles.accountAvatarText}>山田</Text>
            </View>
            <View style={styles.accountDetails}>
              <Text style={styles.accountName}>山田太郎</Text>
              <Text style={styles.accountEmail}>yamada@example.com</Text>
              <Text style={styles.accountPlan}>プレミアムプラン</Text>
            </View>
          </View>
        </Card>

        {/* 設定セクション */}
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Card variant="elevated" style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingItem,
                    itemIndex < section.items.length - 1 && styles.settingItemBorder,
                  ]}
                >
                  <View style={styles.settingItemLeft}>
                    <Text style={styles.settingIcon}>{item.icon}</Text>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                  </View>
                  <View style={styles.settingItemRight}>
                    {item.hasSwitch ? (
                      <Switch
                        value={switches[item.id as keyof typeof switches]}
                        onValueChange={() => toggleSwitch(item.id)}
                        trackColor={{
                          false: Colors.border.light,
                          true: Colors.primary.light,
                        }}
                        thumbColor={
                          switches[item.id as keyof typeof switches]
                            ? Colors.primary.main
                            : Colors.background.tertiary
                        }
                      />
                    ) : (
                      <>
                        {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
                        <Text style={styles.chevron}>›</Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </Card>
          </View>
        ))}

        {/* アクションボタン */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>ログアウト</Text>
          </TouchableOpacity>
        </View>

        {/* バージョン情報 */}
        <View style={styles.footer}>
          <Text style={styles.appName}>Shibuya Live Canvas</Text>
          <Text style={styles.version}>バージョン 1.0.0</Text>
          <Text style={styles.copyright}>© 2025 Shibuya Live Canvas</Text>
        </View>
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
    padding: Spacing.md,
    backgroundColor: Colors.background.primary,
  },
  headerTitle: {
    ...Typography.largeTitle,
    color: Colors.text.primary,
  },
  accountCard: {
    margin: Spacing.md,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  accountAvatarText: {
    ...Typography.title2,
    color: Colors.primary.contrast,
    fontWeight: '600',
  },
  accountDetails: {
    flex: 1,
  },
  accountName: {
    ...Typography.headline,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  accountEmail: {
    ...Typography.footnote,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  accountPlan: {
    ...Typography.caption1,
    color: Colors.primary.main,
    fontWeight: '600',
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.subhead,
    color: Colors.text.tertiary,
    marginLeft: Spacing.md,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
  },
  sectionCard: {
    marginHorizontal: Spacing.md,
    paddingVertical: 0,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: Spacing.md,
  },
  settingTitle: {
    ...Typography.body,
    color: Colors.text.primary,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    ...Typography.footnote,
    color: Colors.text.tertiary,
    marginRight: Spacing.xs,
  },
  chevron: {
    fontSize: 24,
    color: Colors.text.tertiary,
  },
  actionSection: {
    marginTop: Spacing.xl,
    marginHorizontal: Spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.status.error,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  logoutText: {
    ...Typography.body,
    color: Colors.status.error,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    marginTop: Spacing.xl,
  },
  appName: {
    ...Typography.headline,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  version: {
    ...Typography.footnote,
    color: Colors.text.tertiary,
    marginBottom: Spacing.xs,
  },
  copyright: {
    ...Typography.caption1,
    color: Colors.text.tertiary,
  },
})
