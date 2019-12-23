import React from 'react';
import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';
import Loader from './shared/Loader';

// Layouts
import Layout from './shared/layouts/Layout';
import LayoutBlank from './shared/layouts/LayoutBlank';

// Lazy load component
const lazy = cb =>
  loadable(() => pMinDelay(cb(), 200), { fallback: <Loader /> });

// ---
// Default application layout

export const DefaultLayout = Layout;

// ---
// Document title template

export const titleTemplate = '%s - YPI';

// ---
// Routes
//
// Note: By default all routes use { "exact": true }. To change this
// behaviour, pass "exact" option explicitly to the route object

export const defaultRoute = '/';
export const routes = [
  //* Pages
  {
    path: '/login',
    component: lazy(() => import('./components/pages/Login')),
    layout: LayoutBlank
  },

  //* React Pages
  {
    path: '/',
    component: lazy(() => import('./components/Home'))
  },
  {
    path: '/users',
    component: lazy(() => import('./components/Users/ListUser'))
  },
  // {
  //   path: '/users/form/:id?',
  //   component: lazy(() => import('./components/Users/UserEdit'))
  // },

  //  'Berita' route
  {
    path: '/berita',
    component: lazy(() => import('./components/Berita/Index'))
  },
  {
    path: '/berita/form/:id?',
    component: lazy(() => import('./components/Berita/Form'))
  },
  {
    path: '/berita/category',
    component: lazy(() => import('./components/Berita/Category'))
  },

  //  'Events' route
  {
    path: '/events',
    component: lazy(() => import('./components/Events/Index'))
  },
  {
    path: '/events/form/:id?',
    component: lazy(() => import('./components/Events/Form'))
  },
  {
    path: '/events/category',
    component: lazy(() => import('./components/Events/Category'))
  },
  {
    path: '/comments/berita',
    component: lazy(() => import('./components/Comment/Berita'))
  },
  {
    path: '/comments/events',
    component: lazy(() => import('./components/Comment/Event'))
  },

  //* not yet
  {
    path: '/likes/berita',
    component: lazy(() => import('./components/Likes/Berita'))
  },
  {
    path: '/likes/events',
    component: lazy(() => import('./components/Likes/Event'))
  },
  // Not yet Route

  {
    path: '/account',
    component: lazy(() => import('./components/Users/Account'))
  },

  {
    path: '/tags',
    component: lazy(() => import('./components/Tag'))
  },

  {
    path: '/seo',
    component: lazy(() => import('./components/Seo'))
  },

  {
    path: '/meta-config',
    component: lazy(() => import('./components/Config'))
  }
];