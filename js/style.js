(function () {
  'use strict';

  // + selector setting
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  // + event setting
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  // + preloader
  let preloader = select('#preloader');
  document.addEventListener('DOMContentLoaded', function () {
    if (matchMedia('screen and (max-width: 992px)').matches) {
      if (preloader) {
        select('html').classList.add('scroll-prevent');
        preloader.classList.add('show');
        setTimeout(() => {
          preloader.remove();
          select('html').classList.remove('scroll-prevent');
          console.log(1);
        }, 2000);
      }
    }
  });

  // + scroll
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  // + navigation Scroll
  // navigation Scroll
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  // scroll Event
  const scrollto = (el) => {
    let header = select('#header');
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth',
    });
  };

  // header Scroll Control
  let selectHeader = select('#header');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  // + back Top Event
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  // mobile Toggle Menu
  on('click', '.nav-menu-toggle', function (e) {
    if (select('#navbar').classList.contains('menu-open')) {
    }
    select('#navbar').classList.toggle('menu-open');
    select('html').classList.toggle('scroll-prevent');
  });

  //  + scroll To Class
  on(
    'click',
    '.scrollto',
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select('#navbar');
        if (navbar.classList.contains('menu-open')) {
          navbar.classList.remove('menu-open');
          select('#header').classList.remove('menu-opened');
          select('html').classList.remove('scroll-prevent');
        }
        scrollto(this.hash);
      }
    },
    true
  );

  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  // + nav menu Toggle
  on('click', '.nav-menu-toggle', function (e) {
    select('.header').classList.toggle('menu-opened');
  });
})();