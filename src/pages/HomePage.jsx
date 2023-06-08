import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ALL_COUNTRIES } from '../config';
import { Card } from '../components/Card';
import { List } from '../components/List';
import { Controls } from '../components/Controls';

export const HomePage = ({ countries, setCountries }) => {
	// переменная состояния филтрованных карточек
	const [filtredCountries, setFiltredCountries] = useState(countries);

	const { push } = useHistory();

	// функция фильтрации по поисковой строке и селектору региона
	const handleSearch = (search, region) => {
		// изначально есть данные со всеми странами
		let data = [...countries];
		// дальше проверяю по региону методом filter
		if (region) {
			data = data.filter((c) => c.region.includes(region));
		}
		// проверяю по фильтру поиска search
		if (search) {
			data = data.filter((c) =>
				c.name.toLowerCase().includes(search.toLowerCase())
			);
		}

		setFiltredCountries(data);
	};

	// получаем данные стран
	useEffect(() => {
		if (!countries.length)
			axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
	}, []);

	//  еще один useEffect, который будет принудительно вызвать фильтрацию,
	// когда изменится набор стран - вызовем handleSearch() и получим все страны в
	// отфильтрованный массив

	useEffect(() => {
		handleSearch();
	}, [countries]);

	return (
		<>
			<Controls onSearch={handleSearch} />
			<List>
				{filtredCountries.map((c) => {
					const countryInfo = {
						img: c.flags.png,
						name: c.name,
						info: [
							{
								title: 'Population',
								description: c.population.toLocaleString(),
							},
							{
								title: 'Region',
								description: c.region,
							},
							{
								title: 'Capital',
								description: c.capital,
							},
						],
					};

					return (
						<Card
							key={c.name}
							onClick={() => push(`/country/${c.name}`)}
							{...countryInfo}
						/>
					);
				})}
			</List>
		</>
	);
};
