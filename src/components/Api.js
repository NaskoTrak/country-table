import React from 'react';
import axios from 'axios';

const COUNTRIES_API = 'https://excitel-countries.azurewebsites.net/countries';

export const fetchCountriesData = async () => {
	try {
		const { data } = await axios.get(COUNTRIES_API);
		return data;
	} catch (error) {
		console.error('Fetch Error :' + error);
		return error;
	}
};

export const fetchCountriesSuggestions = async (namePart) => {
	try {
		const { data } = await axios.get(COUNTRIES_API + '/' + namePart);
		return data;
	} catch (error) {
		console.error('Fetch Error :' + error);
		return error;
	}
};
