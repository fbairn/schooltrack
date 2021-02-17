import React, { Fragment, useContext } from 'react'
import EntryContext from '../../context/entry/entryContext';

const EditEntry = () => {
  const entryContext = useContext(EntryContext);
  const { current, setCurrent, updateTimeEntry } = entryContext;

  const onChange = e => {
    setCurrent({ ...current, [e.target.name]: e.target.value });
    // setValid({ ...valid, [e.target.name]: e.target.value !== '' });
  }

  const onTimeChange = e => {
    if (e.target.name === 'time') {
      const hms = e.target.value.split(':');
      var seconds = 0;
      if (hms.length === 3) {
        seconds = parseInt(hms[0]) * 60 * 60;
        seconds += parseInt(hms[1]) * 60;
        seconds += parseInt(hms[2]);
      }
      setCurrent({ ...current, time: e.target.value, timespent: seconds });
    } else if (e.target.name === 'hours') {
      let value = parseFloat(e.target.value);
      if (e.target.value === '') {
        value = 0;
      }
      const hours = Math.floor(value);
      let minutes = Math.floor((value * 60) - (hours * 60));

      if (minutes < 10) { minutes = "0" + minutes; }
      if (value > 0) value = value.toFixed(2);

      setCurrent({ ...current, time: hours + ':' + minutes + ':00', hours: value });
    }
    // setValid({ ...valid, [e.target.name]: e.target.value !== '' });
  }

  const onBoxChange = e => {
    // console.log(e.target.name, e.target.checked);
    setCurrent({ ...current, [e.target.name]: e.target.checked });
  }

  const saveRecord = async () => {
    await updateTimeEntry(current);
  }

  if (current === undefined) {
    return <Fragment>
    </Fragment>
  }

  return (
    <Fragment>
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Edit Entry</h4>
          <div>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={current.name}
              onChange={onChange}
            />
          </div>
          <div>
            {!current.running && (
              <input
                type='text'
                pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                title="Time 00:00:00"
                placeholder='00:00:00'
                name='time'
                value={current.time}
                onChange={onTimeChange}
              />
            )}
          </div>
          <div>
            <label>
              <input type="checkbox" className="filled-in" name="entered" checked={current.entered} onChange={onBoxChange} />
              <span>Entered</span>
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={saveRecord}>Save</a>
        </div>
      </div>
    </Fragment>
  )
}

export default EditEntry
