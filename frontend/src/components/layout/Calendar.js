import React, { Fragment, useContext } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EntryContext from '../../context/entry/entryContext';

const Calendar = () => {
  const entryContext = useContext(EntryContext);
  const { date, setDate, getTimeEntries } = entryContext;

  const dateChange = newDate => {
    console.log(newDate, date);
    setDate(newDate);
    getTimeEntries(false, newDate);
  }

  return (
    <Fragment>
      <DatePicker todayButton="Today" selected={date} onChange={dateChange} />
    </Fragment>
  )
}

export default Calendar
