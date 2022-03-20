import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const DetailsModal = (props) => {
	const [show, setShow] = useState(true);
	const handleClose = () => {
		props.setSelectedCountry(null);
		setShow(false);
	};

	return (
		<div>
			<Modal show={true} onHide={handleClose} size="lg" centered>
				<Modal.Header>
					<Modal.Title>Details about {props.country?.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div style={{ backgroundColor: '#F8F8F8' }}>
						<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
							{/* <p>Flag: </p> */}
							<h5>Flag: </h5>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<img
									src={props.country?.flag}
									alt="country flag"
									style={{ width: '50%', alignSelf: 'center' }}
								/>
							</div>
						</div>
						<p style={{ marginTop: 10 }}>Region: {props.country?.region}</p>
						<p>Subregion: {props.country?.subregion}</p>
						<p>Capital: {props.country?.capitalName}</p>
						<p>Population: {props.country?.population}</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default DetailsModal;
