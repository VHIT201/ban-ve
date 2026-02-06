'use client'

// Core
import { useRouter } from 'next/navigation'

// App
import { Button } from '@/components/ui/button'
import { BASE_PATHS } from '@/constants/paths'
import { Badge } from '@/components/ui/badge'

// Types
interface RouterErrorBoundaryProps {
  statusCode?: number
  title?: string
  message?: string
}

// Component
const RouterErrorBoundary = ({
  statusCode = 500,
  title,
  message
}: RouterErrorBoundaryProps) => {
  // Hooks
  const router = useRouter()

  // Error config based on status code
  const errorConfig = {
    code: statusCode,
    title: title || (statusCode === 404 ? 'Page Not Found' : statusCode === 403 ? 'Access Denied' : 'Internal Server Error'),
    message: message || (statusCode === 404 
      ? "Oops! The page you're looking for doesn't exist or has been moved."
      : statusCode === 403 
      ? 'You do not have permission to view this page.'
      : 'Something went wrong on our end. Please try again later.')
  }

  // Template
  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-linear-to-br from-[#f9fafb] to-[#f0f4f8] p-4 dark:from-[#0f172a] dark:to-[#1e293b]'>
      <div className='w-full max-w-4xl'>
        <div className='flex flex-col items-center justify-center overflow-hidden lg:flex-row dark:bg-gray-900'>
          <div
            data-aos='fade-right'
            className='flex flex-col items-center justify-center rounded-2xl bg-gray-50 p-8 md:h-[400px] md:p-12 dark:bg-gray-800'
          >
            <div className='space-y-6 text-center'>
              <div>
                <Badge className='x-4 inline-flex items-center rounded-full py-1 text-sm font-medium'>
                  Error {errorConfig.code}
                </Badge>
                <h1 className='mt-3 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white'>
                  {errorConfig.title}
                </h1>
              </div>

              <p className='mt-2 text-gray-600 dark:text-gray-300'>{errorConfig.message}</p>

              <div className='mt-6 flex flex-col justify-center gap-3 sm:flex-row'>
                <Button onClick={() => router.back()} variant='outline' className='w-full sm:w-auto'>
                  ← Go Back
                </Button>
                <Button onClick={() => router.push(BASE_PATHS.home.path)} className='w-full sm:w-auto'>
                  Home Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RouterErrorBoundary
