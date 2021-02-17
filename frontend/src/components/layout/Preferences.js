import React, { useContext, Fragment } from 'react'
import PreferencesContext from '../../context/preference/preferenceContext';

export const Preferences = () => {
  const preferencesContext = useContext(PreferencesContext);
  const { setStartNextOnStop } = preferencesContext;
  const onStartNextChange = e => {
    // console.log(e.target.name, e.target.checked);
    setStartNextOnStop(e.target.checked);
  }

  return (
    <Fragment>
      <label>
        <input type="checkbox" name="startnextonstop" checked={preferencesContext.startnextonstop} onChange={onStartNextChange} />
        <span>Start next on Stop</span>
      </label>
    </Fragment>
  )
}
