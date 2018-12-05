import SignUp from '../components/accounts/SignUp'
import SignIn from '../components/accounts/SignIn'
import Home from '../components/home/Home'
import NotFound from '../components/helpers/NotFound'
import Game from '../components/game/Game'
import Platform from '../components/platforms/Platform'
import Profile from '../components/profile/Profile'
import Reports from '../components/reports/Reports'
import Stats from '../components/statistics/Stats'
import Dashboard from '../components/dashboard/Dashboard'
import Mailbox from '../components/mailbox/Mailbox'
import Leaderboard from '../components/leaderboard/Leaderboard'
import AdList from '../components/ads/AdList'

/*
  add redirect option only if you want redirect with 'when' option =
  'LOGED_IN': has an user loged in
  'VISITOR': hasn't an user loged in

  redirect = {
    when: 'OPTION',
    to: 'somePath'
  }
*/

const ROUTES = [
  { component: Dashboard,
    path: '/dashboard/:view',
    redirect: { when: 'VISITOR', to: '/' }
  },
  { component: Home,
    path: '/',
    redirect: { when: 'LOGED_IN', to: '/dashboard/news' }
  },
  { component: SignIn,
    path: '/login',
    redirect: { when: 'LOGED_IN', to: '/dashboard/news' }
  },
  { component: SignUp,
    path: '/register',
    redirect: { when: 'LOGED_IN', to: '/dashboard/news' }
  },
  { component: Game,
    path: '/game/:gameId',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: Platform,
    path: '/platforms',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: Profile,
    path: '/profile/:param',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: Reports,
    path: '/secrect_path_reports',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: Stats, path: '/admin_stats'},
  { component: Mailbox,
    path: '/mailbox',
    redirect: { when: 'VISITOR', to: '/login' }
  },
  { component: Leaderboard,
    path: '/leaderboard'
  },
  { component: AdList,
    path: '/temporary_ads'
  },
  { component: NotFound }
]

export { ROUTES }
