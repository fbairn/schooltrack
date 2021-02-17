import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import './App.css';
import Navbar from './components/layout/Navbar';
import Main from './components/layout/Main';
import EntryState from './context/entry/entryState';
import HealthState from './context/health/healthState';
import PreferenceState from './context/preference/preferenceState';



const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });

  return (
    <PreferenceState>
      <HealthState>
        <EntryState>
          <div>
            <Navbar title="A+ TimeTrack" />
            <Main />
          </div>
        </EntryState>
      </HealthState>
    </PreferenceState>
  );
}

export default App;
