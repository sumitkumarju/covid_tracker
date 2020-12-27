import React, {useState,useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';

function CountryPicker({handleCountryChange}) {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
       const fetchCountry = async () => {
           setCountries(await fetchCountries());
       }

       fetchCountry();
    }, []);
    

    return (
        <div>
           <FormControl className={styles.formControl}>
               <NativeSelect defaultValue= "" onChange={(e)=> handleCountryChange(e.target.value)}>
               <option value="">Nation</option>
               {countries.map((country, i) => <option key={i} value={country.abbreviation}>{country.stateut}</option>)}
               </NativeSelect>
           </FormControl>
        </div>
    )
}

export default CountryPicker;
