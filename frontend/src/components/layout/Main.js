import React, { useEffect, useContext, useState } from 'react'

import Entries from '../timeentry/Entries';
import HealthContext from '../../context/health/healthContext';
import EntryContext from '../../context/entry/entryContext';
import Calendar from './Calendar';
import EditEntry from '../timeentry/EditEntry';
import { Preferences } from './Preferences';

import Music from '../Music';

const Main = () => {
  const healthContext = useContext(HealthContext);
  const entryContext = useContext(EntryContext);
  const { healthy } = healthContext;
  const [playSound, setPlaySound] = useState(false);
  const [ding] = useState(Music({ play: playSound, url: `${process.env.PUBLIC_URL}/ding-sound-effect_2.mp3` }))
  const [dingding] = useState(Music({ play: playSound, url: `${process.env.PUBLIC_URL}/Ding-ding-ding.mp3` }))

  useEffect(() => {
    checkHealth();
    entryContext.getTimeEntries();
    setInterval(updateTick, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkHealth = async () => {
    const online = await healthContext.getHealth();
    console.log('Health Checked: ' + online);

    var d = new Date();
    var n = d.getMinutes();
    console.log(n);
    if (n == 50) {
      const [playing, toggle] = ding;
      toggle();
    } else if (n == 0) {
      const [playing, toggle] = dingding;
      toggle();
    }
    if (online) {
      setTimeout(checkHealth, 60000);
    } else {
      setTimeout(checkHealth, 15000);
    }
  }

  const updateTick = () => {
    entryContext.getTimeEntries(true);
  }

  if (!healthy) {
    return (
      <main role="main" className="container">
        Server is Offline.
      </main>
    )
  }
  return (
    <main role="main" className="container">
      <Calendar />
      <Preferences />
      <Entries />
      <EditEntry />

    </main>
  )
}

export default Main
