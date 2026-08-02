import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

// Pages
import { LoginPage } from '@/pages/LoginPage';
import { HomePage } from '@/pages/HomePage';
import { HoodTapperGame } from '@/pages/HoodTapperGame';
import { DogeDashGame } from '@/pages/DogeDashGame';
import { MoonOrFudGame } from '@/pages/MoonOrFudGame';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { HowToPlayPage } from '@/pages/HowToPlayPage';
import { AboutPage } from '@/pages/AboutPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { CredentialsPage } from '@/pages/CredentialsPage';
import { CookiesPage } from '@/pages/CookiesPage';
import { LegalPage } from '@/pages/LegalPage';

// Components
import { BottomNav } from '@/components/BottomNav';

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-full max-w-[500px] mx-auto bg-background relative shadow-2xl overflow-x-hidden">
      <Switch>
        <Route path="/" component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/game/tapper" component={HoodTapperGame} />
        <Route path="/game/dash" component={DogeDashGame} />
        <Route path="/game/moon" component={MoonOrFudGame} />
        <Route path="/leaderboard" component={LeaderboardPage} />
        <Route path="/how-to-play" component={HowToPlayPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/credentials" component={CredentialsPage} />
        <Route path="/cookies" component={CookiesPage} />
        <Route path="/legal" component={LegalPage} />
        <Route component={NotFound} />
      </Switch>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="bg-[#050505] min-h-screen w-full flex justify-center">
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
