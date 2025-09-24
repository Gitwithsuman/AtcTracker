import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import Header from "./components/ui/Header";
import LandingDashboard from './pages/landing-dashboard';
import ClassificationResults from './pages/classification-results';
import HealthAssessment from './pages/health-assessment';
import BPAIntegration from './pages/bpa-integration';
import PlanManagement from './pages/plan-management';

// Page Components - using the full original components
const DashboardPage = () => <LandingDashboard />;
const ResultsPage = () => <ClassificationResults />;
const HealthPage = () => <HealthAssessment />;
const SyncPage = () => <BPAIntegration />;
const PlansPage = () => <PlanManagement />;

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/sync" element={<SyncPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="*" element={<DashboardPage />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
