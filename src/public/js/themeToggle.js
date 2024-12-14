'use strict';

const initApp = () => {
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

  themeList.addEventListener('click', (e) => {
    if (e.target.closest('li')) {
      const theme = e.target.closest('li').id;

      setTheme(theme);
      closeToggle();
    }
  });

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  setTheme(localStorage.getItem('theme') || systemTheme);
};

document.addEventListener('DOMContentLoaded', initApp);
