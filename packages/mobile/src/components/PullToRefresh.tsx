import React, { useRef, useState } from 'react'
import {
  ScrollView,
  RefreshControl,
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollViewProps,
} from 'react-native'
import { Colors, Spacing, Typography } from '../constants/theme'

interface PullToRefreshProps extends ScrollViewProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  refreshingText?: string
  pullingText?: string
  releaseText?: string
  customRefreshControl?: React.ReactElement
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  refreshingText = '更新中...',
  pullingText = '下に引いて更新',
  releaseText = '離して更新',
  customRefreshControl,
  ...scrollViewProps
}) => {
  const [refreshing, setRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const animatedValue = useRef(new Animated.Value(0)).current

  const handleRefresh = async () => {
    setRefreshing(true)

    // アニメーション開始
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()

    try {
      await onRefresh()
    } finally {
      // アニメーション終了
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setRefreshing(false)
      })
    }
  }

  const handleScroll = (event: React.UIEvent<ScrollView>) => {
    const { contentOffset } = event.nativeEvent
    if (contentOffset.y < 0) {
      setPullDistance(Math.abs(contentOffset.y))
    } else {
      setPullDistance(0)
    }
  }

  const getRefreshText = () => {
    if (refreshing) {
      return refreshingText
    }
    if (pullDistance > 80) {
      return releaseText
    }
    if (pullDistance > 0) {
      return pullingText
    }
    return ''
  }

  const spinValue = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  if (customRefreshControl) {
    return (
      <ScrollView {...scrollViewProps} refreshControl={customRefreshControl}>
        {children}
      </ScrollView>
    )
  }

  return (
    <ScrollView
      {...scrollViewProps}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={Colors.primary.main}
          title={getRefreshText()}
          titleColor={Colors.text.secondary}
        />
      }
    >
      {/* カスタムプルインジケーター */}
      {pullDistance > 0 && !refreshing && (
        <View
          style={[
            styles.pullIndicator,
            {
              opacity: Math.min(pullDistance / 100, 1),
              transform: [
                {
                  translateY: Math.min(pullDistance / 2, 50) - 100,
                },
              ],
            },
          ]}
        >
          <Text style={styles.pullEmoji}>{pullDistance > 80 ? '🎯' : '👇'}</Text>
          <Text style={styles.pullText}>{getRefreshText()}</Text>
        </View>
      )}

      {/* ローディングインジケーター */}
      {refreshing && (
        <View style={styles.refreshingContainer}>
          <Animated.Text style={[styles.refreshingEmoji, { transform: [{ rotate: spinValue }] }]}>
            🔄
          </Animated.Text>
          <Text style={styles.refreshingText}>{refreshingText}</Text>
        </View>
      )}

      {children}
    </ScrollView>
  )
}

// 簡易版のPullToRefresh (FlatList用)
interface SimplePullToRefreshProps {
  refreshing: boolean
  onRefresh: () => void
  tintColor?: string
  title?: string
}

export const SimplePullToRefresh: React.FC<SimplePullToRefreshProps> = ({
  refreshing,
  onRefresh,
  tintColor = Colors.primary.main,
  title = '更新中...',
}) => {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={tintColor}
      title={refreshing ? title : ''}
      titleColor={Colors.text.secondary}
    />
  )
}

const styles = StyleSheet.create({
  pullIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  pullEmoji: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  pullText: {
    ...Typography.footnote,
    color: Colors.text.secondary,
  },
  refreshingContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  refreshingEmoji: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  refreshingText: {
    ...Typography.footnote,
    color: Colors.text.secondary,
  },
})
