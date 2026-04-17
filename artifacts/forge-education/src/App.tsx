import { useState } from 'react';
import AuthGate from './components/auth/AuthGate';
import ChildApp from './components/child/ChildApp';
import ParentAdmin from './components/parent/ParentAdmin';
import './forge.css';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

function App() {
  const [view, setView] = useState<'auth' | 'child' | 'parent'>('auth');
  const [currentChild, setCurrentChild] = useState<any>(null);

  const handleChildLogin = (childData: any) => {
    setCurrentChild(childData);
    setView('child');
  };

  const handleParentLogin = () => {
    setView('parent');
  };

  const handleLogout = () => {
    setCurrentChild(null);
    setView('auth');
  };

  return (
    <div className="forge-app">
      {view === 'auth' && (
        <AuthGate
          onChildLogin={handleChildLogin}
          onParentLogin={handleParentLogin}
          basePath={BASE}
        />
      )}
      {view === 'child' && currentChild && (
        <ChildApp
          child={currentChild}
          onLogout={handleLogout}
          basePath={BASE}
        />
      )}
      {view === 'parent' && (
        <ParentAdmin
          onLogout={handleLogout}
          basePath={BASE}
        />
      )}
    </div>
  );
}

export default App;
