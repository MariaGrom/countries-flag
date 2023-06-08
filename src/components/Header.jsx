import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMoon, IoMoonOutline } from 'react-icons/io5';

import { Container } from './Container';

// стилизация через styled-components
// стилизация всего header
const HeaderEl = styled.header`
	box-shadow: var(--shadow);
	background-color: var(--color-ui-base);
`;
// стилиация расположения элементов внутри header
const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem 0;
`;

// стилизация заголовков
const Title = styled(Link).attrs({
	to: '/',
})`
	color: var(--color-text);
	font-size: var(--fs-sm);
	text-decoration: none;
	font-weight: var(--fw-bold);
`;

// стилизация переключателя
const ModalSwitcher = styled.div`
	color: var(--color-text);
	font-size: var(--fs-sm);
	cursor: pointer;
	// font-weight: var(--fw-bold);
	text-transform: capitalize;
`;

export const Header = () => {
	// Переменная темы
	const [theme, setTheme] = useState('light');
	// Обработчик изменения темы
	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
	// Следим за изменением темы
	useEffect(() => {
		document.body.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<HeaderEl>
			<Container>
				<Wrapper>
					<Title>Where is the world?</Title>
					<ModalSwitcher onClick={toggleTheme}>
						{theme === 'light' ? (
							<IoMoonOutline size="14px" />
						) : (
							<IoMoon size="14px" />
						)}
						<span style={{ marginLeft: '0.75rem' }}>{theme} Theme</span>
					</ModalSwitcher>
				</Wrapper>
			</Container>
		</HeaderEl>
	);
};
