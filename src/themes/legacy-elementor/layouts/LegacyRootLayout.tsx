import React from 'react';
import '../styles/bradesco-main.css';
import '../styles/frontend.min.css';
import '../styles/post-4.css';
import '../styles/post-17.css';
import '../styles/base-desktop.css';
import '../styles/base-mobile.css';

export const LegacyRootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <body className="home wp-singular page-template page-template-template-elementor-home page-template-template-elementor-home-php page page-id-17 wp-theme-bradesco bradesco-site bradesco-elementor-home elementor-default elementor-kit-4 elementor-page elementor-page-17">
      {children}
    </body>
  );
};
