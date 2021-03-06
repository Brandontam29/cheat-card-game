import lazyLoad from '../../lib/lazyload';

export const Home = lazyLoad(
    () => import('./home'),
    (module) => module.Home,
);

export const Lobby = lazyLoad(
    () => import('./lobby'),
    (module) => module.Lobby,
);

export const NotFound = lazyLoad(
    () => import('./notFound'),
    (module) => module.NotFound,
);

