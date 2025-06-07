'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const setTheme = (theme) => {
    const html = document.documentElement;

    if (theme === 'system') {
      html.removeAttribute('data-theme');
    } else {
      html.setAttribute('data-theme', theme);
    }

    localStorage.setItem('theme', theme);
  };

  const closeToggle = () => {
    const detail = document.querySelector('.dropdown.dropdown-end');

    if (detail.hasAttribute('open')) {
      detail.removeAttribute('open');
    }
  };

  const themeList = document.getElementById('theme-list');
  const mobileList = document.getElementById('mobile-list');

  themeList.addEventListener('click', (e) => {
    if (e.target.closest('li')) {
      const theme = e.target.closest('li').id;

      setTheme(theme);
      closeToggle();
    }
  });

  mobileList.addEventListener('click', (e) => {
    if (e.target.closest('li')) {
      const theme = e.target.closest('li').id;

      setTheme(theme);
    }
  });

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  setTheme(localStorage.getItem('theme') || systemTheme);
});
