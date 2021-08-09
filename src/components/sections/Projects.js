import React from 'react';

import styled from "styled-components";

import Heading from '@components/Heading';
import Repository from '@components/Repository';
import FooterText from '@components/FooterText';

import {device, until} from '@utilities/mixins';

import Section from '@sass/components/Section';
import Container from '@sass/components/Container';

import { socialMedia } from '@config';

const Repositories = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;

	width: 80%;
	max-width: 90%;

	margin: 0 auto;

	${until(
		device.MacbookAir(),
		() => `
		margin: -1rem auto;
		margin-bottom: 1rem;
		margin-top: 1.5rem;
	`
	)}

	${until(
		device.iPhone12(),
		() => `
		display: block;

		margin: 2rem 0;
		margin-bottom: 1rem;

		width: 100%;
		max-width: 100%;

		article {
			padding: 0;

			&:first-child {
				margin-top: 0;
			}
		}
	`
	)}
`;


const Projects = (props) => {
	const theme = "dark";

	const { github } = socialMedia;

	return (
		<Section
			style={{
				backgroundColor: 'var(--black)'
			}}
		>
			<Container
				style={{
					marginTop: '-1rem',
					marginBottom: 0
				}}
			>
				<Heading
					title="Some Things I've Built"
					subtitle={() => (
						<p className="subtitle">
							Various projects that I've open sourced while working at these companies.
						</p>
					)}
					theme={theme}
				/>

				<Repositories>
					{Repository('nicholasadamou', 'down-to-network', 'react', theme)}
					{Repository('nicholasadamou', 'firebase-react-starter-kit', 'react', theme)}
					{Repository('nicholasadamou', 'react-iframe', 'react', theme)}
					{Repository('nicholasadamou', 'storage', 'react', theme)}
					{Repository('nicholasadamou', 'krios-github-bot', 'node', theme)}
					{Repository('nicholasadamou', 'toasty', 'react', theme)}
					{Repository('nicholasadamou', 'jwt-spring-security-demo', 'java', theme)}
				</Repositories>

				{FooterText(
					'More can be found on my ',
					github.name,
					github.url,
					github.name.toLowerCase(),
					theme
				)}
			</Container>
		</Section>
	)
}

export default Projects;
