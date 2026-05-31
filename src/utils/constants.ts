import gsap from 'gsap';

const BASE_URL = import.meta.env.BASE_URL;

export const logoSrc = `${BASE_URL}images/logo-transparent.png`;

export const imageSrc = (filename: string) => `${BASE_URL}images/${filename}`;

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  let targetPosition;

  if (id === 'process') {
    const hero = document.querySelector('section.h-dvh, section.h-screen');
    const stats = hero?.nextElementSibling;

    if (stats) {
      targetPosition = (stats as HTMLElement).offsetTop + (stats as HTMLElement).offsetHeight;
    } else {
      targetPosition = element.offsetTop;
    }
  } else {
    targetPosition = element.offsetTop;
  }

  const navbarHeight = 100;
  const offsetPosition = targetPosition - navbarHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

export const navItems = [
  { label: 'Destinations', id: 'destinations' },
  { label: 'Process', id: 'process' },
  { label: 'Services', id: 'services' },
  { label: 'Founder', id: 'founder' },
];
