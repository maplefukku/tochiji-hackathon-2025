import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { MapScreen } from './src/screens/MapScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { QuestScreen } from './src/screens/QuestScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { Colors, Spacing, Typography } from './src/constants/theme';

type TabName = 'home' | 'map' | 'quest' | 'profile' | 'settings';

const tabs = [
  { id: 'home' as TabName, label: 'ホーム', icon: '🏠' },
  { id: 'map' as TabName, label: 'マップ', icon: '🗺️' },
  { id: 'quest' as TabName, label: 'クエスト', icon: '🎯' },
  { id: 'profile' as TabName, label: 'プロフィール', icon: '👤' },
  { id: 'settings' as TabName, label: '設定', icon: '⚙️' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'map':
        return <MapScreen />;
      case 'quest':
        return <QuestScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[
              styles.tabIcon,
              activeTab === tab.id && styles.tabIconActive
            ]}>
              {tab.icon}
            </Text>
            <Text style={[
              styles.tabLabel,
              activeTab === tab.id && styles.tabLabelActive
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    paddingBottom: Spacing.xs,
    paddingTop: Spacing.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  tabIconActive: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    ...Typography.caption1,
    color: Colors.text.tertiary,
  },
  tabLabelActive: {
    color: Colors.primary.main,
    fontWeight: '600',
  },
});
