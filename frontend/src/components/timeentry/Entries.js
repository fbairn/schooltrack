import React, { Fragment, useContext, useState, useEffect } from 'react'
import Entry from './Entry';
import EntryContext from '../../context/entry/entryContext';
import NewEntry from './NewEntry';
import { secondsToTime } from '../../helpers/time';

const Entries = () => {
  const entryContext = useContext(EntryContext);
  const { entries } = entryContext;

  const [data, setData] = useState({
    time: '0:00:00'
  });

  useEffect(() => {
    let seconds = 0;

    entries.forEach(element => {
      seconds += element.timespent;
    });


    setData({ ...data, time: secondsToTime(seconds) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  return (
    <Fragment>
      <table className="striped" >
        <thead className="grey darken-3">
          <tr>
            <th className="white-text grey darken-3">Task</th>
            <th className="white-text grey darken-3">Time</th>
            <th className="white-text grey darken-3">Entered</th>
            <th className="white-text grey darken-3"></th>
          </tr>
        </thead>
        <tbody>
          <NewEntry />
          {entries.map(entry =>
            <Entry key={entry._id} entry={entry} showBtns={true} />
          )}
        </tbody>
        <tr>
          <td>
            Total
          </td>
          <td>{data.time}</td>
        </tr>
      </table>
    </Fragment>
  )
}

export default Entries
