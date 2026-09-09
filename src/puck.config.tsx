"use client";

import { Config } from "@puckeditor/core";
import { SiteHeader } from "@/themes/legacy-elementor/components/SiteHeader";
import { SiteFooter } from "@/themes/legacy-elementor/components/SiteFooter";
import { HeroSection } from "@/themes/legacy-elementor/components/HeroSection";
import { ExperienceSection } from "@/themes/legacy-elementor/components/ExperienceSection";
import { AccountSection } from "@/themes/legacy-elementor/components/AccountSection";
import { StepsSection } from "@/themes/legacy-elementor/components/StepsSection";
import { PromoSection } from "@/themes/legacy-elementor/components/PromoSection";
import { SecuritySection } from "@/themes/legacy-elementor/components/SecuritySection";
import { LearnSection } from "@/themes/legacy-elementor/components/LearnSection";
import { NewsletterSection } from "@/themes/legacy-elementor/components/NewsletterSection";
import { FaqSection } from "@/themes/legacy-elementor/components/FaqSection";
import { FinalSection } from "@/themes/legacy-elementor/components/FinalSection";

type Props = {
  HeroBlock: any;
  ExperienceBlock: any;
  AccountBlock: any;
  StepsBlock: any;
  PromoBlock: any;
  SecurityBlock: any;
  LearnBlock: any;
  NewsletterBlock: any;
  FaqBlock: any;
  FooterBlock: any;
};

export const puckConfig: Config<Props> = {
  root: {
    render: ({ children }) => {
      return (
        <div className="home wp-singular page-template page-template-template-elementor-home page-template-template-elementor-home-php page page-id-17 wp-theme-bradesco bradesco-site bradesco-elementor-home elementor-default elementor-kit-4 elementor-page elementor-page-17">
          <style>{`@import url("/theme.css");`}</style>
          <SiteHeader />
          <main id="contenido" tabIndex={-1}>
            <div data-elementor-type="wp-page" data-elementor-id="17" className="elementor elementor-17">
              <div className="elementor-element elementor-element-040086b5 e-con-full bradesco-elementor-root e-flex e-con e-parent" data-id="040086b5" data-element_type="container" data-e-type="container">
                {children}
                <div className="elementor-element elementor-element-eafb48da bradesco-section-widget bradesco-section-10 elementor-widget elementor-widget-bradesco-editable-section">
                  <div className="elementor-widget-container">
                    <FinalSection />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    }
  },
  components: {
    HeroBlock: {
      fields: {
        kicker: { type: "text" },
        title: { type: "textarea" },
        lead: { type: "textarea" },
        legal: { type: "text" },
        primaryButtonText: { type: "text" },
        primaryButtonUrl: { type: "text" },
        secondaryButtonText: { type: "text" },
        secondaryButtonUrl: { type: "text" },
      },
      defaultProps: {
        kicker: "Bradesco llega a México",
        title: "Tu dinero, en movimiento contigo.",
        lead: "Una cuenta digital para pagar, organizar y avanzar hacia tus planes desde una sola app.",
        legal: "La información mostrada es ilustrativa.",
        primaryButtonText: "Conoce la cuenta",
        primaryButtonUrl: "#cuenta",
        secondaryButtonText: "Descubre Bradesco",
        secondaryButtonUrl: "#nosotros",
      },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-1">
          <div className="elementor-widget-container">
            <HeroSection
              data={{
                kicker: props.kicker,
                title: props.title,
                lead: props.lead,
                legal: props.legal,
                primaryButton: { text: props.primaryButtonText, url: props.primaryButtonUrl },
                secondaryButton: { text: props.secondaryButtonText, url: props.secondaryButtonUrl },
              }}
            />
          </div>
        </div>
      ),
    },
    ExperienceBlock: {
      fields: {
        title: { type: "text" },
        lead: { type: "textarea" },
      },
      defaultProps: {
        title: "Tu experiencia bancaria cambia con nosotros",
        lead: "Creemos que las finanzas no deben de ser complejas ni un impedimento para lograr lo que te propones.",
      },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-2">
          <div className="elementor-widget-container">
            <ExperienceSection data={{ title: props.title, lead: props.lead, features: [] }} />
          </div>
        </div>
      ),
    },
    AccountBlock: {
      fields: { title: { type: "text" }, lead: { type: "textarea" } },
      defaultProps: { title: "Beneficios de cuenta digital.", lead: "Un lugar en el que controlas tus movimientos diarios con tu celular." },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-3">
          <div className="elementor-widget-container">
            <AccountSection data={{ title: props.title, lead: props.lead }} />
          </div>
        </div>
      ),
    },
    StepsBlock: {
      fields: { title: { type: "text" } },
      defaultProps: { title: "Pasos" },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-4">
          <div className="elementor-widget-container">
            <StepsSection data={{ title: props.title, list: [] }} />
          </div>
        </div>
      ),
    },
    PromoBlock: {
      fields: { title: { type: "text" }, lead: { type: "textarea" }, button: { type: "text" } },
      defaultProps: { title: "Promo", lead: "Lead", button: "Button" },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-5">
          <div className="elementor-widget-container">
            <PromoSection data={{ title: props.title, lead: props.lead, button: props.button }} />
          </div>
        </div>
      ),
    },
    SecurityBlock: {
      fields: { title: { type: "text" }, lead: { type: "textarea" } },
      defaultProps: { title: "Seguridad", lead: "Lead" },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-6">
          <div className="elementor-widget-container">
            <SecuritySection data={{ title: props.title, lead: props.lead }} />
          </div>
        </div>
      ),
    },
    LearnBlock: {
      fields: { title: { type: "text" }, lead: { type: "textarea" } },
      defaultProps: { title: "Aprende", lead: "Lead" },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-7">
          <div className="elementor-widget-container">
            <LearnSection data={{ title: props.title, lead: props.lead }} />
          </div>
        </div>
      ),
    },
    NewsletterBlock: {
      fields: { title: { type: "text" }, lead: { type: "textarea" } },
      defaultProps: { title: "Newsletter", lead: "Lead" },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-8">
          <div className="elementor-widget-container">
            <NewsletterSection data={{ title: props.title, lead: props.lead }} />
          </div>
        </div>
      ),
    },
    FaqBlock: {
      fields: { title: { type: "text" } },
      defaultProps: { title: "Preguntas Frecuentes" },
      render: (props) => (
        <div className="bradesco-section-widget bradesco-section-9">
          <div className="elementor-widget-container">
            <FaqSection data={{ title: props.title, list: [] }} />
          </div>
        </div>
      ),
    },
    FooterBlock: {
      fields: { copyright: { type: "text" } },
      defaultProps: { copyright: "© 2026 Bradesco" },
      render: (props) => (
        <SiteFooter data={{ copyright: props.copyright, links: [] }} />
      ),
    },
  },
};
