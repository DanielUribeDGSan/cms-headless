import { HomeEntity } from "@/modules/home/domain/home.entity";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { HeroSection } from "../components/HeroSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { AccountSection } from "../components/AccountSection";
import { StepsSection } from "../components/StepsSection";
import { PromoSection } from "../components/PromoSection";
import { SecuritySection } from "../components/SecuritySection";
import { LearnSection } from "../components/LearnSection";
import { NewsletterSection } from "../components/NewsletterSection";
import { FaqSection } from "../components/FaqSection";
import { FinalSection } from "../components/FinalSection";

interface LegacyHomePageProps {
  data: HomeEntity;
}

export const LegacyHomePage = ({ data }: LegacyHomePageProps) => {
  return (
    <>
      <SiteHeader />
      <main id="contenido" tabIndex={-1}>
        <div data-elementor-type="wp-page" data-elementor-id="17" className="elementor elementor-17">
          <div className="elementor-element elementor-element-040086b5 e-con-full bradesco-elementor-root e-flex e-con e-parent" data-id="040086b5" data-element_type="container" data-e-type="container">
            
            <div className="elementor-element elementor-element-87dab595 bradesco-section-widget bradesco-section-1 elementor-widget elementor-widget-bradesco-editable-section">
              <div className="elementor-widget-container">
                <HeroSection data={data.hero} />
              </div>
            </div>

            <div className="elementor-element elementor-element-3fb41d74 bradesco-section-widget bradesco-section-2 elementor-widget elementor-widget-bradesco-editable-section">
              <div className="elementor-widget-container">
                <ExperienceSection data={data.experience} />
              </div>
            </div>

            <div className="elementor-element elementor-element-b482d8cd bradesco-section-widget bradesco-section-3 elementor-widget elementor-widget-bradesco-editable-section">
              <div className="elementor-widget-container">
                <AccountSection data={data.account} />
              </div>
            </div>

            <div className="elementor-element elementor-element-d978c3d6 bradesco-section-widget bradesco-section-4 elementor-widget elementor-widget-bradesco-editable-section">
              <div className="elementor-widget-container">
                <StepsSection data={data.steps} />
              </div>
            </div>

            <div className="elementor-element elementor-element-30c69f79 bradesco-section-widget bradesco-section-5 elementor-widget elementor-widget-bradesco-editable-section">
              <div className="elementor-widget-container">
                <PromoSection data={data.promo} />
              </div>
            </div>

            <div className="elementor-element elementor-element-90a09bcc bradesco-section-widget bradesco-section-6 elementor-widget elementor-widget-bradesco-editable-section">
              <div className="elementor-widget-container">
                <SecuritySection data={data.security} />
              </div>
            </div>

            <div className="elementor-element elementor-element-32aef06f bradesco-section-widget bradesco-section-7 elementor-widget elementor-widget-bradesco-editable-section">
              <div className="elementor-widget-container">
                <LearnSection data={data.learn} />
              </div>
            </div>

            <div className="elementor-element elementor-element-60d2411c bradesco-section-widget bradesco-section-8 elementor-widget elementor-widget-bradesco-editable-section">
              <div className="elementor-widget-container">
                <NewsletterSection data={data.newsletter} />
              </div>
            </div>

            <div className="elementor-element elementor-element-2ef7be4f bradesco-section-widget bradesco-section-9 elementor-widget elementor-widget-bradesco-editable-section">
              <div className="elementor-widget-container">
                <FaqSection data={data.faq} />
              </div>
            </div>

            <div className="elementor-element elementor-element-eafb48da bradesco-section-widget bradesco-section-10 elementor-widget elementor-widget-bradesco-editable-section">
              <div className="elementor-widget-container">
                <FinalSection />
              </div>
            </div>

          </div>
        </div>
      </main>
      <SiteFooter data={data.footer} />
    </>
  );
};
