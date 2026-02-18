import { SakuraBackground } from './components/SakuraBackground';
import { VariationLayout } from './variations/VariationLayout';

function App() {
  return (
    <VariationLayout
      themeClass="theme-base"
      background={<SakuraBackground />}
    />
  );
}

export default App;
