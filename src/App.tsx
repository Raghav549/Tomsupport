import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import CapabilitiesPage from './pages/Capabilities';
import { AgentRuntimePage, PlanningPage, ToolsPage, VerificationPage, MemoryPage } from './pages/TechnicalPages';
import { VoicePage, AndroidPage, BrowserPage, ModelsPage, Qwen3OllamaPage } from './pages/PlatformPages';
import { ResearchPage, BenchmarksPage, ProductionReadinessPage } from './pages/ResearchPages';
import { DocsPage, ApiReferencePage, RoadmapPage } from './pages/DocsPages';
import { CommunityPage, ContributePage, SupportPage, FAQPage, ContactPage, SecurityPage, IntegrationsPage, GitHubPage } from './pages/CommunityPages';

function NotFoundPage() {
  return (
    <div className="paper-texture-light min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <p className="font-mono text-xs text-ochre-dark uppercase tracking-wider mb-4">404 — Page Not Found</p>
        <h1 className="display-serif text-4xl md:text-5xl text-ink mb-4">This page doesn't exist</h1>
        <p className="body-sans text-ink-muted mb-8 max-w-md mx-auto">
          The page you're looking for may have been moved or doesn't exist yet. Check the documentation or navigate using the menu above.
        </p>
        <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-parchment text-sm font-sans font-medium rounded-sm hover:bg-ink-light transition-colors">
          Return Home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* About */}
          <Route path="/about" element={<AboutPage />} />

          {/* Capabilities */}
          <Route path="/capabilities" element={<CapabilitiesPage />} />
          <Route path="/capabilities/runtime" element={<AgentRuntimePage />} />
          <Route path="/capabilities/planning" element={<PlanningPage />} />
          <Route path="/capabilities/tools" element={<ToolsPage />} />
          <Route path="/capabilities/verification" element={<VerificationPage />} />
          <Route path="/capabilities/memory" element={<MemoryPage />} />
          <Route path="/capabilities/voice" element={<VoicePage />} />
          <Route path="/capabilities/android" element={<AndroidPage />} />
          <Route path="/capabilities/browser" element={<BrowserPage />} />
          <Route path="/capabilities/models" element={<ModelsPage />} />
          <Route path="/capabilities/integrations" element={<IntegrationsPage />} />

          {/* Research */}
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/benchmarks" element={<BenchmarksPage />} />

          {/* Documentation */}
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/quick-start" element={<DocsPage />} />
          <Route path="/docs/api-reference" element={<ApiReferencePage />} />
          <Route path="/docs/qwen3-ollama" element={<Qwen3OllamaPage />} />
          <Route path="/docs/configuration" element={<DocsPage />} />
          <Route path="/docs/voice-setup" element={<VoicePage />} />
          <Route path="/docs/android-setup" element={<AndroidPage />} />
          <Route path="/docs/browser-setup" element={<BrowserPage />} />
          <Route path="/docs/security" element={<SecurityPage />} />
          <Route path="/docs/architecture" element={<AgentRuntimePage />} />
          <Route path="/docs/production" element={<ProductionReadinessPage />} />
          <Route path="/docs/troubleshooting" element={<FAQPage />} />

          {/* Roadmap */}
          <Route path="/roadmap" element={<RoadmapPage />} />

          {/* Community */}
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/contribute" element={<ContributePage />} />

          {/* Support */}
          <Route path="/support" element={<SupportPage />} />

          {/* FAQ */}
          <Route path="/faq" element={<FAQPage />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Security */}
          <Route path="/security" element={<SecurityPage />} />

          {/* GitHub */}
          <Route path="/github" element={<GitHubPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
