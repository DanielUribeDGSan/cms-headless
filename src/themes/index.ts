import { LegacyRootLayout } from './legacy-elementor/layouts/LegacyRootLayout';
import { LegacyHomePage } from './legacy-elementor/pages/LegacyHomePage';

// The active theme is controlled via an environment variable. 
// For now, it defaults to 'legacy'.
const activeTheme = process.env.NEXT_PUBLIC_THEME || 'legacy';

export const getThemeConfig = () => {
  if (activeTheme === 'legacy') {
    return {
      RootLayout: LegacyRootLayout,
      HomePage: LegacyHomePage,
    };
  }

  // Future Modern Theme
  // if (activeTheme === 'modern') {
  //   return {
  //     RootLayout: ModernRootLayout,
  //     HomePage: ModernHomePage,
  //   };
  // }

  // Default fallback
  return {
    RootLayout: LegacyRootLayout,
    HomePage: LegacyHomePage,
  };
};
