import { type RouteConfig, index, layout, prefix, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),

  ...prefix('ahmed', [
    route('about', 'routes/about.tsx'),
    route('post/:postId', 'routes/post.tsx'),
  ]),

  // dashboard
  layout('routes/dashboard.tsx', [
    route('finances', 'routes/finances.tsx'),
    route('personal-info', 'routes/personal-info.tsx'),
  ]),
] satisfies RouteConfig;
