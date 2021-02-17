import React, { Fragment, useState, useContext, useEffect } from 'react'
import EntryContext from '../../context/entry/entryContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const NewEntry = () => {
  const entryContext = useContext(EntryContext);

  const [entry, setEntry] = useState({
    name: '',
    time: '0:00:00',
    entered: false,
    timespent: 0,
  });

  const [valid] = useState({
    name: true
  });

  const { name, time } = entry;

  useEffect(() => {
    // Init Materialize JS
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.modal');
      M.Modal.init(elems);
    });
  });

  const onChange = e => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
    // setValid({ ...valid, [e.target.name]: e.target.value !== '' });
  }

  const onTimeChange = e => {
    setEntry({ ...entry, time: e.target.value });
  }

  const createEntry = async () => {
    const hms = time.split(':');
    let seconds = 0;
    if (hms.length === 3) {
      seconds = parseInt(hms[0]) * 60 * 60;
      seconds += parseInt(hms[1]) * 60;
      seconds += parseInt(hms[2]);
    }

    const newEntry = {
      ...entry,
      running: true,
      timespent: seconds,
      startTime: Date.now() - (seconds * 1000)
    }

    const savedEntry = await entryContext.createTimeEntry(newEntry);
    await entryContext.setCurrent({ ...savedEntry });

    if (savedEntry.name === '' || savedEntry.project === '') {
      var elem = document.querySelector('#modal1');
      var instance = M.Modal.getInstance(elem);
      instance.open();
    }
    clearEntry();
  }

  const clearEntry = () => {
    setEntry({
      ...entry,
      name: '',
      entered: false,
      timespent: 0,
      time: '00:00:00',
    });
    // setValid({});
  }

  let buttons;
  if (valid.name) {
    buttons =
      <Fragment>
        <button type="button" className="waves-effect waves-light btn-flat" onClick={createEntry}>
          <i class="material-icons green-text">play_arrow</i>
        </button>

        <button type="button" className="waves-effect waves-light btn-flat" onClick={clearEntry}>
          <i class="material-icons red-text">delete_forever</i>
        </button>
      </Fragment>
  } else {
    buttons = <Fragment>
      <button type="button" className="waves-effect waves-light btn-flat" disabled="true">
        <i class="material-icons">play_arrow</i>
      </button>
      <button type="button" className="waves-effect waves-light btn-flat" disabled="true">
        <i class="material-icons">delete_forever</i>
      </button>
    </Fragment>
  }

  return (
    <Fragment>
      <tr>
        <td>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
          /></td>
        <td>
          <input
            type='text'
            placeholder='00:00:00'
            name='time'
            value={time}
            onChange={onTimeChange}
          />
        </td>
        <td>

        </td>
        <td style={{ textAlign: "right" }}>
          {buttons}
        </td>
      </tr>
    </Fragment >
  )
}

export default NewEntry
