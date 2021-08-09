import React from 'react';

import styled from 'styled-components';

import { device, until } from '@utilities/mixins';

const Container = styled.div`
	${until(
		device.MacbookAir(),
		() => `
			padding-left: 1rem;
		`
	)}

	${until(
		device.iPhone12(),
		() => `
			padding-left: 0;
		`
	)}

	.title {
		margin-top: 25px;
		margin-bottom: 10px !important;

		font-family: var(--primary);
		font-weight: 900;
		color: ${props => props.theme === 'dark' ? 'var(--white)' : 'var(--copy)'};
		line-height: 1;

		span {
			font-size: inherit;
		}
	}

	.subtitle {
		margin-top: 0 !important;
		margin-bottom: 2rem;

		font-family: var(--secondary);
		color: ${props => props.theme === 'dark' ? 'var(--white)' : 'var(--copy)'};
		line-height: 1.5;

		${until(
			device.iPhone12(),
			() => `
			font-size: 1.15rem;
			margin-bottom: 25px !important;
		`
		)}
	}
`;

const Heading = (props) => {
	const { title, subtitle, theme } = props;

	return (
		<Container theme={theme}>
			{typeof title === 'function'
				?
					title()
				:
					<h3 className="title">{title}</h3>
			}
			{subtitle()}
		</Container>
	)
}

export default Heading;
