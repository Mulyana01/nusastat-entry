// NusaStat router: a tiny hash router. The address after # names the page
// ('' overview, 'population', 'economy', 'wellbeing', 'provinces',
// 'sources'); unknown names fall back to the overview. Each navigation
// renders the view, draws its charts, marks the matching nav link and
// scrolls back to the top, like a page load on a multi-page site.

import { VIEWS } from './views.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.topnav a')];

function currentRoute() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  return Object.prototype.hasOwnProperty.call(VIEWS, raw) ? raw : '';
}

function render() {
  const route = currentRoute();
  const view = VIEWS[route]();
  document.title = route === '' ? 'NusaStat — Indonesia in Numbers' : `${view.title} · NusaStat`;
  app.innerHTML = view.html;
  view.mount();
  for (const link of navLinks) {
    link.classList.toggle('active', link.dataset.route === route);
  }
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
