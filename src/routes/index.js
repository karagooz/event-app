import HomePage from '../views/public/HomePage/HomePage'
import SportPage from '../views/public/SportPage'
import ConcertsPage from '../views/public/ConcertsPage'
import TheatrePage from '../views/public/TheatrePage'
import Profile from '../views/private/pages/Profile'
import About from '../views/public/AboutContactPages/About'
import Contact from '../views/public/AboutContactPages/Contact'
import PastEventsPage from '../views/public/PastEventsPage'

export const publicRoutes = [
    //routes
    
    {
        path:'/*',
        element: <HomePage />
    },
    {
        path:'/sport/*',
        element: <SportPage />
    },
    {
        path:'/concert/*',
        element: <ConcertsPage />
    }
,
    {
        path:'/theatre/*',
        element: <TheatrePage />
    }
,
    {
        path:'/about/*',
        element:<About />
    }
,
    {
        path:'/contact/*',
        element:<Contact />
    }
,
    {
        path:'/past/*',
        element:<PastEventsPage />
    }
,

]

export const privateRoutes = [
    {
        path:'/profile/*',
        element: <Profile />
    }
]