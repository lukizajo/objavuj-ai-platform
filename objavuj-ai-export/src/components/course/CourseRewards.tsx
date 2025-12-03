import React, { useState } from 'react'
import { Trophy, Star, Calendar, Clock, TrendingUp, Award, Target, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useTranslation } from '@/hooks/useTranslation'
import { useAuthStore } from '@/stores/authStore'
import { 
  mockRewards, 
  mockUserRewards, 
  mockLeaderboard, 
  type MockReward, 
  type MockLeaderboardEntry 
} from '@/lib/mockData'

type TabType = 'rewards' | 'leaderboard' | 'progress'

interface CourseRewardsProps {
  compact?: boolean
}

const CourseRewards: React.FC<CourseRewardsProps> = ({ compact = false }) => {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<TabType>('rewards')
  const [selectedRewardType, setSelectedRewardType] = useState<string>('all')

  // Get user's unlocked rewards
  const userUnlockedRewards = mockRewards.filter(reward => 
    mockUserRewards.some(userReward => 
      userReward.userId === user?.id && userReward.rewardId === reward.id
    )
  )

  // Calculate user stats
  const userStats = {
    totalPoints: mockUserRewards
      .filter(ur => ur.userId === user?.id)
      .reduce((sum, ur) => sum + ur.pointsEarned, 0),
    unlockedRewards: userUnlockedRewards.length,
    totalRewards: mockRewards.length,
    currentRank: mockLeaderboard.find(entry => entry.userId === user?.id)?.rank || 0,
    totalUsers: mockLeaderboard.length,
    streakDays: mockLeaderboard.find(entry => entry.userId === user?.id)?.streakDays || 0,
    level: mockLeaderboard.find(entry => entry.userId === user?.id)?.level || 'Začiatočník'
  }

  // Filter rewards based on selected type
  const filteredRewards = selectedRewardType === 'all' 
    ? mockRewards 
    : mockRewards.filter(reward => reward.type === selectedRewardType)

  // Get rarity color
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700 border-gray-200'
      case 'rare': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'epic': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'legendary': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  // Get rarity color for border
  const getRarityBorderColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300'
      case 'rare': return 'border-blue-300'
      case 'epic': return 'border-purple-300'
      case 'legendary': return 'border-yellow-300'
      default: return 'border-gray-300'
    }
  }

  // Check if reward is unlocked
  const isRewardUnlocked = (rewardId: string) => {
    return mockUserRewards.some(userReward => 
      userReward.userId === user?.id && userReward.rewardId === rewardId
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sk-SK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  // Compact layout for course tabs
  if (compact) {
    return (
      <div className="space-y-6">
        {/* Stats for compact view */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
              {userStats.totalPoints}
            </h3>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
              {t('rewards.totalPoints')}
            </p>
          </Card>

          <Card className="p-4 text-center">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
              {userStats.unlockedRewards}/{userStats.totalRewards}
            </h3>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
              {t('rewards.completedRewards')}
            </p>
          </Card>

          <Card className="p-4 text-center">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
              #{userStats.currentRank}
            </h3>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
              {t('rewards.rank')}
            </p>
          </Card>

          <Card className="p-4 text-center">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
              {userStats.streakDays}
            </h3>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
              {t('rewards.streak')} {t('rewards.days')}
            </p>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="bg-muted dark:bg-dark-muted rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-4 py-2 rounded-md font-medium transition-colors text-sm ${
                activeTab === 'rewards'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              {t('rewards.badges')}
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 py-2 rounded-md font-medium transition-colors text-sm ${
                activeTab === 'leaderboard'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              {t('rewards.leaderboard')}
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 rounded-md font-medium transition-colors text-sm ${
                activeTab === 'progress'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              {t('rewards.yourProgress')}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'rewards' && (
          <div>
            {/* Reward Type Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Button
                variant={selectedRewardType === 'all' ? 'primary' : 'outline'}
                onClick={() => setSelectedRewardType('all')}
                size="sm"
              >
                Všetky
              </Button>
              <Button
                variant={selectedRewardType === 'level' ? 'primary' : 'outline'}
                onClick={() => setSelectedRewardType('level')}
                size="sm"
              >
                {t('rewards.levels')}
              </Button>
              <Button
                variant={selectedRewardType === 'achievement' ? 'primary' : 'outline'}
                onClick={() => setSelectedRewardType('achievement')}
                size="sm"
              >
                Úspechy
              </Button>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRewards.map((reward) => {
                const isUnlocked = isRewardUnlocked(reward.id)
                return (
                  <Card
                    key={reward.id}
                    className={`p-4 relative overflow-hidden ${
                      isUnlocked 
                        ? `${getRarityBorderColor(reward.rarity)} border-2 shadow-md` 
                        : 'opacity-60 grayscale'
                    }`}
                  >
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-background/50 dark:bg-dark-background/50 flex items-center justify-center">
                        <div className="text-center">
                          <Clock className="w-6 h-6 text-text-secondary dark:text-dark-text-secondary mx-auto mb-1" />
                          <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                            {reward.pointsRequired} bodov
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <div className={`text-2xl mb-3 ${isUnlocked ? '' : 'filter grayscale'}`}>
                        {reward.icon}
                      </div>
                      
                      <h3 className="text-sm font-bold text-text-primary dark:text-dark-text-primary mb-1">
                        {reward.title}
                      </h3>
                      
                      <p className="text-xs text-text-secondary dark:text-dark-text-secondary mb-3 line-clamp-2">
                        {reward.description}
                      </p>
                      
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Badge className={getRarityColor(reward.rarity)}>
                          {reward.rarity}
                        </Badge>
                        <Badge variant="muted" className="text-xs">
                          {reward.pointsRequired}
                        </Badge>
                      </div>
                      
                      {isUnlocked && (
                        <div className="text-xs text-green-600 dark:text-green-400">
                          ✓ {formatDate(
                            mockUserRewards.find(ur => ur.rewardId === reward.id)?.unlockedAt || ''
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-3">
            {mockLeaderboard.slice(0, 10).map((entry, index) => {
              const isCurrentUser = entry.userId === user?.id
              return (
                <Card
                  key={entry.userId}
                  className={`p-4 ${
                    isCurrentUser 
                      ? 'ring-2 ring-primary bg-primary-light/10 dark:bg-primary/10' 
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-muted dark:bg-dark-muted text-text-secondary dark:text-dark-text-secondary'
                    }`}>
                      #{entry.rank}
                    </div>
                    
                    {/* Avatar */}
                    <img
                      src={entry.userAvatar}
                      alt={entry.userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    
                    {/* User Info */}
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm ${
                        isCurrentUser 
                          ? 'text-primary' 
                          : 'text-text-primary dark:text-dark-text-primary'
                      }`}>
                        {entry.userName}
                        {isCurrentUser && ' (Vy)'}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-text-secondary dark:text-dark-text-secondary">
                        <span>{entry.level}</span>
                        <span>•</span>
                        <span>{entry.completedCourses} kurzov</span>
                      </div>
                    </div>
                    
                    {/* Points */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
                        {entry.totalPoints}
                      </div>
                      <div className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        bodov
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Level */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                <Star className="w-5 h-5" />
                {t('rewards.levels')}
              </h3>
              <div className="text-center">
                <div className="text-4xl mb-3">🚀</div>
                <h4 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                  {userStats.level}
                </h4>
                <p className="text-text-secondary dark:text-dark-text-secondary mb-4">
                  {userStats.totalPoints} / 1500 bodov
                </p>
                <div className="w-full bg-muted dark:bg-dark-muted rounded-full h-2 mb-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((userStats.totalPoints / 1500) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                  {1500 - userStats.totalPoints} bodov do ďalšej úrovne
                </p>
              </div>
            </Card>

            {/* Recent Achievements */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Najnovšie úspechy
              </h3>
              <div className="space-y-3">
                {userUnlockedRewards.slice(-3).map((reward) => (
                  <div key={reward.id} className="flex items-center gap-3 p-2 bg-muted dark:bg-dark-muted rounded-lg">
                    <div className="text-lg">{reward.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-text-primary dark:text-dark-text-primary">
                        {reward.title}
                      </h4>
                      <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                        {formatDate(
                          mockUserRewards.find(ur => ur.rewardId === reward.id)?.unlockedAt || ''
                        )}
                      </p>
                    </div>
                    <Badge className={getRarityColor(reward.rarity)}>
                      +{mockUserRewards.find(ur => ur.rewardId === reward.id)?.pointsEarned}
                    </Badge>
                  </div>
                ))}
                
                {userUnlockedRewards.length === 0 && (
                  <div className="text-center py-6 text-text-secondary dark:text-dark-text-secondary">
                    <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Zatiaľ nemáte žiadne úspechy</p>
                    <p className="text-xs">Začnite sa učiť a získajte svoju prvú odmenu!</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    )
  }

  // Full layout for standalone rewards page
  return (
    <div className="space-y-8">
      {/* User Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-1">
            {userStats.totalPoints}
          </h3>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
            {t('rewards.totalPoints')}
          </p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Award className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-1">
            {userStats.unlockedRewards}/{userStats.totalRewards}
          </h3>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
            {t('rewards.completedRewards')}
          </p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-1">
            #{userStats.currentRank}
          </h3>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
            {t('rewards.rank')} {t('rewards.outOf')} {userStats.totalUsers}
          </p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-1">
            {userStats.streakDays}
          </h3>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
            {t('rewards.streak')} {t('rewards.days')}
          </p>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-muted dark:bg-dark-muted rounded-lg p-1 flex">
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'rewards'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
            }`}
          >
            {t('rewards.badges')}
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'leaderboard'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
            }`}
          >
            {t('rewards.leaderboard')}
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'progress'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
            }`}
          >
            {t('rewards.yourProgress')}
          </button>
        </div>
      </div>

      {/* Full content for each tab would go here... */}
    </div>
  )
}

export default CourseRewards