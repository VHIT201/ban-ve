import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Info } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { MOCK_STATS } from './lib/constants'

const StatsCards = () => {
  const generateSparklineData = (trend: 'up' | 'down') => {
    const baseData = [
      { value: 10 },
      { value: 205 },
      { value: 22 },
      { value: 280 },
      { value: 24 },
      { value: 30 },
      { value: trend === 'up' ? 35 : 18 }
    ]
    return baseData
  }

  return (
    <div className='flex items-center gap-8'>
      {MOCK_STATS.map((stat) => (
        <Card key={stat.title} className='flex-1 border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-3'>
            <CardTitle className='flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400'>
              {stat.title}
              <Info className='h-4 w-4 text-gray-400' />
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='text-3xl font-bold text-gray-900 dark:text-white'>{stat.value}</div>

            <div className='h-8 w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={generateSparklineData(stat.sparklineData as 'up' | 'down')}>
                  <Line
                    type='monotone'
                    dataKey='value'
                    stroke={stat.sparklineData === 'up' ? '#34D399' : '#F87171'}
                    strokeWidth={2}
                    dot={false}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className='flex items-center justify-between'>
              <div className='text-xs text-gray-500 dark:text-gray-400'>Kể từ tuần trước</div>
            </div>

            <div className='flex items-center justify-between'>
              <span className='text-sm text-gray-600 dark:text-gray-400'>Chi tiết :</span>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
                {stat.changeType === 'positive' ? '▲' : '▼'}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default StatsCards
