import HomePage from '../views/public/pages/HomePage/HomePage'
import SportList from '../views/public/pages/SportPage/SportList'
import ConcertList from '../views/public/pages/ConcertsPage/ConcertList'
import TheatreList from '../views/public/pages/TheatrePage/TheatreList'
import Profile from '../views/private/pages/Profile'
import About from '../views/public/pages/AboutContactPages/About'
import Contact from '../views/public/pages/AboutContactPages/Contact'
export const publicRoutes = [
    {
        path:'/*',
        element: <HomePage />
    },
    {
        path:'/sport/*',
        element: <SportList />
    },
    {
        path:'/concert/*',
        element: <ConcertList />
    }
,
    {
        path:'/theatre/*',
        element: <TheatreList />
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

]

export const privateRoutes = [
    {
        path:'/profile/*',
        element: <Profile />
    }
]