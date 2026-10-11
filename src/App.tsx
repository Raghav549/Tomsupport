import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import CapabilitiesPage from './pages/Capabilities';
import { SupportPage as AllPagesSupportPage, CommunityJoinPage, ResearchPage, DocsPage, RoadmapPage, CommunityPage, ContributePage, FAQPage, ContactPage, SecurityPage as AllPagesSecurityPage, GitHubPage, ApiReferencePage } from './pages/AllPages';
import { FeaturesPage, HowItWorksPage, ArchitecturePage, LocalAIPage, OllamaQwenPage, VoiceTTsPage, BrowserAutomationPage, AndroidAutomationPage, ToolRegistryPage, VerificationPage, SecurityPage, MemoryPage, InstallationPage, TutorialsPage, ExamplesPage, BenchmarksPage, ResearchPapersPage, ChangelogPage, ContributingPage, SupportPage, LicensePage, PrivacyPage, TermsPage, DonatePage } from './pages/NewPages';

function NotFoundPage() {
  return (
    <div className="pt-16 min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <p className="font-mono text-sm text-gray-400 mb-4">404</p>
        <h1 className="heading-sans text-4xl md:text-5xl mb-4">Page not found</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">The page you're looking for may have been moved or doesn't exist.</p>
        <a href="/" className="btn-primary">Return Home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/capabilities" element={<CapabilitiesPage />} />
          <Route path="/capabilities/:id" element={<CapabilitiesPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/benchmarks" element={<ResearchPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/quick-start" element={<DocsPage />} />
          <Route path="/docs/api-reference" element={<ApiReferencePage />} />
          <Route path="/docs/qwen3-ollama" element={<DocsPage />} />
          <Route path="/docs/configuration" element={<DocsPage />} />
          <Route path="/docs/voice-setup" element={<DocsPage />} />
          <Route path="/docs/android-setup" element={<DocsPage />} />
          <Route path="/docs/browser-setup" element={<DocsPage />} />
          <Route path="/docs/security" element={<SecurityPage />} />
          <Route path="/docs/architecture" element={<DocsPage />} />
          <Route path="/docs/production" element={<DocsPage />} />
          <Route path="/docs/troubleshooting" element={<FAQPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/join" element={<CommunityJoinPage />} />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/github" element={<GitHubPage />} />
          
          {/* New comprehensive pages */}
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/architecture" element={<ArchitecturePage />} />
          <Route path="/local-ai" element={<LocalAIPage />} />
          <Route path="/ollama-qwen" element={<OllamaQwenPage />} />
          <Route path="/voice-tts" element={<VoiceTTsPage />} />
          <Route path="/browser-automation" element={<BrowserAutomationPage />} />
          <Route path="/android-automation" element={<AndroidAutomationPage />} />
          <Route path="/tool-registry" element={<ToolRegistryPage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/memory" element={<MemoryPage />} />
          <Route path="/security-info" element={<AllPagesSecurityPage />} />
          <Route path="/support-legacy" element={<AllPagesSupportPage />} />
          <Route path="/docs/installation" element={<InstallationPage />} />
          <Route path="/docs/tutorials" element={<TutorialsPage />} />
          <Route path="/docs/examples" element={<ExamplesPage />} />
          <Route path="/research/papers" element={<ResearchPapersPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/contributing" element={<ContributingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/license" element={<LicensePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/donate" element={<DonatePage />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
