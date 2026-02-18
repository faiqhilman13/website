import { VariationLayout } from './VariationLayout';
import { VoidScene } from './VoidScene';
import { HeroVoid } from './HeroVoid';

export const AppVariationVoid: React.FC = () => {
  return (
    <VariationLayout
      themeClass="theme-void"
      hero={<HeroVoid />}
      background={
        <>
          <div className="void-backdrop fixed inset-0 z-0 pointer-events-none" />
          <VoidScene className="void-scene fixed inset-0 z-[1] pointer-events-none" />
          <div className="void-vignette fixed inset-0 z-[2] pointer-events-none" />
        </>
      }
    />
  );
};
