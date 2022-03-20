import React, { useState, useEffect } from 'react';
// import './App.css';
import {
	fetchCountriesData,
	fetchCountriesSuggestions,
} from './components/Api';
import CountryTable from './components/CountryTable';
import DetailsModal from './components/DetailsModal';
import SearchFilter from './components/SearchFilter';

const App = () => {
	const [countriesData, setCountriesData] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState();

	useEffect(() => {
		const getData = async () => {
			const countries = await fetchCountriesData();
			setCountriesData(countries);
		};
		getData();
	}, []);

	const openCountryDetails = async (countryName) => {
		const fetchedCountry = await fetchCountriesSuggestions(countryName);
		setSelectedCountry(fetchedCountry[0]);
	};

	return (
		<div>
			<SearchFilter
				openCountryDetails={openCountryDetails}
				fetchCountriesSuggestions={fetchCountriesSuggestions}
				setSelectedCountry={setSelectedCountry}
			/>
			<CountryTable
				countries={countriesData}
				openCountryDetails={openCountryDetails}
				setSelectedCountry={setSelectedCountry}
			/>
			{selectedCountry && (
				<DetailsModal
					country={selectedCountry}
					setSelectedCountry={setSelectedCountry}
				/>
			)}
		</div>
	);
};

export default App;
