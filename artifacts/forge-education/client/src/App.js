import React, { useState, useEffect } from 'react';
import AuthGate from './components/auth/AuthGate';
import ChildApp from './components/child/ChildApp';
import ParentAdmin from './components/parent/ParentAdmin';
import './App.css';

function App() {
  const [view, setView] = useState('auth');
  const [currentChild, setCurrentChild] = useState(null);
  const [isParent, setIsParent] = useState(false);

  const handleChildLogin = (childData) => {
    setCurrentChild(childData);
    setView('child');
  };

  const handleParentLogin = () => {
    setIsParent(true);
    setView('parent');
  };

  const handleLogout = () => {
    setCurrentChild(null);
    setIsParent(false);
    setView('auth');
  };

  return (
    <div className="forge-app">
      {view === 'auth' && (
        <AuthGate
          onChildLogin={handleChildLogin}
          onParentLogin={handleParentLogin}
        />
      )}
      {view === 'child' && currentChild && (
        <ChildApp
          child={currentChild}
          onLogout={handleLogout}
        />
      )}
      {view === 'parent' && isParent && (
        <ParentAdmin
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
