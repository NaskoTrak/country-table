import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import DetailsModal from './DetailsModal';

const SearchFilter = (props) => {
	const INPUT_TIMEOUT = 1000;
	const MAX_SUGGESTIONS = 10;
	const [value, setValue] = useState('');
	const [predictions, setPredictions] = useState([]);
	let timeout;

	useEffect(() => {
		const setPredictionsData = () => {
			clearTimeout(timeout);

			if (value.length > 0) {
				timeout = setTimeout(async () => {
					const fetchedPredictions = await props.fetchCountriesSuggestions(
						value
					);
					const foundPredictions =
						fetchedPredictions.length > MAX_SUGGESTIONS
							? fetchedPredictions.slice(0, MAX_SUGGESTIONS)
							: fetchedPredictions;
					setPredictions(foundPredictions);
				}, INPUT_TIMEOUT);
			} else {
				setPredictions([]);
			}
		};
		setPredictionsData();
	}, [value]);

	return (
		<div style={{ margin: 10 }}>
			<InputGroup className="mb-8" size="smd">
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<FormControl
						placeholder="Search for country"
						aria-label="Search for country"
						// aria-describedby="basic-addon2"
						aria-describedby="inputGroup-sizing-lg"
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						style={{ display: 'flex', flexDirection: 'column' }}
					/>
					<div style={{ position: 'fixed', left: 10, top: 50 }}>
						{predictions?.map((item, index) => (
							<div
								style={{
									backgroundColor: '#dcdcdc',
									paddingLeft: 10,
									paddingRight: 10,
								}}
								key={index}
								onClick={() => props.openCountryDetails(item.name)}
							>
								{item.name}
							</div>
						))}
					</div>
				</div>
			</InputGroup>
		</div>
	);
};

export default SearchFilter;
