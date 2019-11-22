import Home from "../views/Home";
import TopList from "../views/TopList";
import Plays from "../views/Plays";
import Recommend from '../views/Home/Recommend'
import Rankings from '../views/Home/Rankings'
import Searchs from '../views/Home/Searchs'

const routes = [
    {
        path: "/toplist",
        component: TopList
    },
    {
        path: "/play",
        component: Plays
    },
    {
        path: "/",
        component: Home,
        children: [
            {
                path: "/home/recommend",
                component: Recommend
            },
            {
                path: "/home/rankings",
                component: Rankings
            },
            {
                path: "/home/searchs",
                component: Searchs
            },
            {
                from: "/",
                to: "/home/recommend"
            }
        ]
    },
    {
        from: "/",
        to: '/'
    }
]
export default routes;