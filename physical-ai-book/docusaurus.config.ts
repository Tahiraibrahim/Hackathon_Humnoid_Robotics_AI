import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI Book',
  tagline: 'Master the art of building intelligent machines that see, think, and act in the real world.',
  favicon: 'img/favicon.ico',

  // --- GITHUB DEPLOYMENT SETTINGS (Yahan Sab Theek Kar Diya Hai) ---
  url: 'https://Tahiraibrahim.github.io', // Sahi Link
  baseUrl: '/', // Repository ka Sahi Naam (Case Sensitive)
  organizationName: 'Tahiraibrahim',
  projectName: 'Hackathon_Humnoid_Robotics_AI',
  deploymentBranch: 'gh-pages', // Ye line Zaroori thi
  trailingSlash: false, // GitHub Pages ke liye best practice

  onBrokenLinks: 'warn', // Error nahi, sirf warning dega
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Tahiraibrahim/Hackathon_Humnoid_Robotics_AI/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark', // Cyberpunk Theme ke liye Dark default rakhein
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Physical AI Book',
      logo: {
        alt: 'Physical AI Book Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Chapters',
        },
        // Agar Urdu Button ka component nahi hai to ye line hata dein warna error aayega
        // { type: 'custom-urdu-button', position: 'right' }, 
        {
          href: 'https://github.com/Tahiraibrahim/Hackathon_Humnoid_Robotics_AI',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learning',
          items: [
            {
              label: 'Start Learning',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/Tahiraibrahim/Hackathon_Humnoid_Robotics_AI',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI Book. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;