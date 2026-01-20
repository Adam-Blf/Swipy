import { createBrowserRouter } from 'react-router-dom'
import { Splash } from '@/pages/Splash'
import { Welcome } from '@/pages/Welcome'
import { OnboardingName } from '@/pages/OnboardingName'
import { OnboardingCategories } from '@/pages/OnboardingCategories'
import { Swipe } from '@/pages/Swipe'
import { Stats } from '@/pages/Stats'
import { Settings } from '@/pages/Settings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '/onboarding/name',
    element: <OnboardingName />,
  },
  {
    path: '/onboarding/categories',
    element: <OnboardingCategories />,
  },
  {
    path: '/swipe',
    element: <Swipe />,
  },
  {
    path: '/stats',
    element: <Stats />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
])
