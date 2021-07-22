import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import countryTepleats from './hbs/countryTepleats.hbs'
import selectedCountries from './hbs/selectedCountries.hbs'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info')


searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));



function onSearch(evt) {
    evt.preventDefault();

   const searchQuery = evt.target.value.trim();

   if (searchQuery === '') {
    clearData();
    return;
  }

    fetchCountries(searchQuery).then(data => {
        if (data.length === 1) {
            clearData()
            countryList.innerHTML = countryTepleats(data);
        }
        return data;
    }).then(
        data => {
            if(data.length >1 && data.length <=10){
                clearData()
                countryList.innerHTML = selectedCountries(data);
            }
        return data;
        }
    ).then(data => {
        if(data.length > 10){
            clearData()
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
    }).catch((error) => {
        console.log(error)
        clearData()
        Notiflix.Notify.failure('Oops, there is no country with that name');
    })
};

function clearData() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}