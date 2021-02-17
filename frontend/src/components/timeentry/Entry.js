import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import EntryContext from '../../context/entry/entryContext';
import PreferencesContext from '../../context/preference/preferenceContext';

const Entry = ({ entry, showBtns }) => {
  const entryContext = useContext(EntryContext);
  const preferencesContext = useContext(PreferencesContext);

  const { name,
    time,
    entered,
    running
  } = entry;

  const onChange = async e => {
    const entryUpdate = {
      ...entry,
      [e.target.name]: e.target.checked
    }

    await entryContext.updateTimeEntry(entryUpdate);
  }

  const startEntry = async () => {
    const startTime = Date.now() - (entry.timespent * 1000);

    const entryUpdate = {
      ...entry,
      running: true,
      startTime: startTime,
      lastStartCount: entry.timespent
    }
    await entryContext.updateTimeEntry(entryUpdate);
  }

  const stopEntry = () => {
    const entryUpdate = {
      ...entry,
      running: false,
      timespent: getTimeSpent()
    }
    entryContext.updateTimeEntry(entryUpdate);

    if (preferencesContext.startnextonstop) {
      startNext();
    }
  }

  const deleteEntry = () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      entryContext.deleteTimeEntry({ ...entry });
    }
  }

  const getTimeSpent = () => {
    const millis = Date.now() - entry.startTime;
    return Math.floor(millis / 1000);
  }

  const addfive = () => {
    const MS_PER_MINUTE = 60000;
    const entryUpdate = {
      ...entry
    }
    if (entry.running === true) {
      entryUpdate.startTime = entryUpdate.startTime - (5 * MS_PER_MINUTE);
    } else {
      entryUpdate.timespent += 5 * 60;
      entryUpdate.startTime = Date.now() - (entryUpdate.timespent * 1000);
    }
    entryContext.updateTimeEntry(entryUpdate);
  }

  const showEdit = e => {
    entryContext.setCurrent(entry);
  }

  const copyEntry = async () => {
    const newEntry = {
      ...entry,
      running: true,
      timespent: 0,
      startTime: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }

    await entryContext.createTimeEntry(newEntry);
  }

  const startNext = async () => {
    const newEntry = {
      name: '',
      entered: false,
      running: true,
      timespent: 0,
      startTime: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }

    entryContext.createTimeEntry(newEntry);
  }

  return (
    <Fragment>
      <tr className={running && 'yellow lighten-4'}>
        <td>{name}</td>
        <td>{time}</td>
        <td>
          <label>
            <input type="checkbox" name="entered" checked={entered} onChange={onChange} />
            <span></span>
          </label>
        </td>
        {showBtns && (
          <td style={{ textAlign: "right" }}>
            {!running && (
              <button type="button" className="waves-effect waves-light btn-flat" onClick={startEntry}>
                <i class="material-icons green-text">play_arrow</i>
              </button>
            )}
            {running && (
              <Fragment>
                {/* <button type="button" className="btn btn-sm btn-warning"><i class="far fa-times-circle"></i></button> */}
                <button type="button" className="waves-effect waves-light btn-flat" onClick={stopEntry}>
                  <i class="material-icons red-text">stop</i>
                </button>
              </Fragment>
            )}
            <button type="button" className="waves-effect waves-light btn-flat" onClick={addfive}>
              <i class="material-icons blue-text">add_alarm</i>
            </button>

            <button type="button" className="waves-effect waves-light btn-flat" onClick={deleteEntry}>
              <i class="material-icons">delete_forever</i>
            </button>

            <button className="waves-effect waves-light btn-flat modal-trigger" href="#modal1" onClick={showEdit}>
              <i class="material-icons">edit</i>
            </button>

            <button className="waves-effect waves-light btn-flat modal-trigger" onClick={copyEntry}>
              <i class="material-icons">file_copy</i>
            </button>
          </td>
        )}
      </tr>
    </Fragment>
  )
}

Entry.propTypes = {
  entry: PropTypes.object.isRequired,
  showBtns: PropTypes.bool.isRequired,
}
export default Entry
