import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Table, ProgressBar } from 'react-bootstrap';

const CountryTable = (props) => {
	const columns = useMemo(
		() => [
			{
				Header: 'Contry Name',
				accessor: 'name',
			},
			{
				Header: 'Capital Name',
				accessor: 'capitalName',
			},
			{
				Header: 'Code',
				accessor: 'code',
			},

			{
				Header: 'Population',
				accessor: 'population',
			},
			{
				Header: 'Region',
				accessor: 'region',
			},
			{
				Header: 'Subregion',
				accessor: 'subregion',
			},
		],
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		//rows,
		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns: columns,
			data: useMemo(() => props.countries, [props.countries]),
			initialState: { pageIndex: 0 },
		},
		useSortBy,
		usePagination
	);

	const [percentage, setPercentage] = useState(0);
	const [selectedCountryName, setSelectedCountryName] = useState();
	const intervalRef = React.useRef(null);

	useEffect(() => {
		return () => stopCounter();
	}, []);

	useEffect(() => {
		if (percentage > 100) {
			stopCounter();
			props.openCountryDetails(selectedCountryName);
		}
	}, [percentage]);

	const startCounter = (countryName) => {
		if (intervalRef.current) return;

		setSelectedCountryName(countryName);
		intervalRef.current = setInterval(() => {
			setPercentage((prevCounter) => prevCounter + 25);
		}, 500);
	};

	const stopCounter = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		setPercentage(0);
	};

	return (
		<div>
			<ProgressBar now={percentage} />
			<Table {...getTableProps()} striped bordered hover>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render('Header')}
									<span>
										{column.isSorted
											? column.isSortedDesc
												? ' 🔽'
												: ' 🔼'
											: ''}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr
								onMouseDown={() => startCounter(row.values.name)}
								onMouseUp={stopCounter}
								onMouseLeave={stopCounter}
								{...row.getRowProps()}
							>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</Table>

			<div className="pagination" style={{ marginLeft: 5 }}>
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{'<<'}
				</button>{' '}
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					{'<'}
				</button>{' '}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{'>'}
				</button>{' '}
				<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
					{'>>'}
				</button>{' '}
				<span style={{ marginLeft: 10 }}>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
				<span style={{ marginLeft: 10 }}>
					| Go to page:{' '}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							gotoPage(page);
						}}
						style={{ width: '100px' }}
					/>
				</span>{' '}
				<select
					style={{marginRight: 5}}
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default CountryTable;
