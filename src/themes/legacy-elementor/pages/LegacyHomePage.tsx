import { HomeEntity, HomeLayoutBlock } from "@/modules/home/domain/home.entity";
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
  const defaultLayout: HomeLayoutBlock[] = [
    { blockType: 'hero' as const, data: data.hero }, { blockType: 'experience' as const, data: data.experience },
    { blockType: 'account' as const, data: data.account }, { blockType: 'steps' as const, data: data.steps },
    { blockType: 'promo' as const, data: data.promo }, { blockType: 'security' as const, data: data.security },
    { blockType: 'learn' as const, data: data.learn }, { blockType: 'newsletter' as const, data: data.newsletter },
    { blockType: 'faq' as const, data: data.faq }, { blockType: 'footer' as const, data: data.footer },
  ];
  const layout = data.layout?.length ? data.layout : defaultLayout;
  const renderBlock = (block: (typeof layout)[number], index: number) => {
    const key = block.id ?? `${block.blockType}-${index}`;
    switch (block.blockType) {
      case 'hero': return <HeroSection key={key} data={block.data} />;
      case 'experience': return <ExperienceSection key={key} data={block.data} />;
      case 'account': return <AccountSection key={key} data={block.data} />;
      case 'steps': return <StepsSection key={key} data={block.data} />;
      case 'promo': return <PromoSection key={key} data={block.data} />;
      case 'security': return <SecuritySection key={key} data={block.data} />;
      case 'learn': return <LearnSection key={key} data={block.data} />;
      case 'newsletter': return <NewsletterSection key={key} data={block.data} />;
      case 'faq': return <FaqSection key={key} data={block.data} />;
      case 'footer': return <SiteFooter key={key} data={block.data} />;
    }
  };

  return (
    <>
      <SiteHeader />
      <main id="contenido" tabIndex={-1}>
        <div data-elementor-type="wp-page" data-elementor-id="17" className="elementor elementor-17">
          <div className="elementor-element elementor-element-040086b5 e-con-full bradesco-elementor-root e-flex e-con e-parent" data-id="040086b5" data-element_type="container" data-e-type="container">
            
            {layout.map((block, index) => {
              if (block.blockType === 'footer') return null;
              return (
                <div 
                  key={block.id ?? `${block.blockType}-${index}`} 
                  className={`bradesco-section-widget bradesco-section-${index + 1}`}
                  data-payload-path={`layout.${index}`}
                >
                  <div className="elementor-widget-container">{renderBlock(block, index)}</div>
                </div>
              );
            })}

            <div className="elementor-element elementor-element-eafb48da bradesco-section-widget bradesco-section-10 elementor-widget elementor-widget-bradesco-editable-section">
              <div className="elementor-widget-container">
                <FinalSection />
              </div>
            </div>

          </div>
        </div>
      </main>
      {layout.map((block, index) => {
        if (block.blockType !== 'footer') return null;
        return (
          <div key={block.id ?? `${block.blockType}-${index}`} data-payload-path={`layout.${index}`}>
            {renderBlock(block, index)}
          </div>
        );
      })}
    </>
  );
};
