/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';

import {SkeletonText} from 'carbon-components-react';

import CircularProgress from '@material-ui/core/CircularProgress';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import styled from 'styled-components';

import {device, until} from '@utilities/mixins';

import useGitHub, {round} from '@hooks/useGitHub';

import languages from './languages';

const Container = styled.article`
	margin: 10px 10px;

	font-size: var(--copy-size);

	${until(
		'1200px',
		() => `
			margin: 10px 10px;
		`
	)}
	${until(
		'932px',
		() => `
			margin: 10px 5px;
		`
	)}
	${until(
		device.iPhone12(),
		() => `
		width: 100%;
		max-width: 100%;

		margin: 1.25rem 0;

		padding: 0 20px;
	`
	)}
	.MuiCircularProgress-root {
		width: 10px !important;
		height: 10px !important;

		circle {
			stroke: var(--loading);
		}
	}

	a {
		text-decoration: none;
		color: var(--link);
	}

	div {
		display: -webkit-box;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
		align-items: center;

		margin-bottom: 10px;

		span > div {
			display: inline-block;

			margin: 0;
		}

		div {
			display: inline-block;

			margin: 0;

			width: 100%;
		}

		span[aria-label='git'] {
			margin-right: 5px;

			color: ${props => props.theme === 'light' ? 'var(--light-black)' : 'var(--white)'};
		}

		svg[data-prefix='fas'] {
			margin-right: 5px;

			-webkit-transition: all 0.25s ease-in-out;
			transition: all 0.25s ease-in-out;

			&:hover {
				-webkit-transform: scale(1.25);
				transform: scale(1.25);
			}
		}

		span[role='img'] {
			margin-left: 10px;

			&:first-child {
				margin-left: 0;
			}
		}

		${until(
			device.iPad(),
			() => `
			span[aria-label='language'] {
				display: none;
			}
			`
		)}
		a {
			color: var(--link);
			font-size: var(--copy-size);
			text-decoration: none;

			-webkit-transition: color 0.25ms ease-in-out;

			transition: color 0.25ms ease-in-out;

			&:hover {
				color: var(--light-grey);
			}

			span {
				padding: 5px;

				background: var(--grey);
				border-radius: 5px;

				&[role='img'] {
					display: flex;
					flex-direction: row;
					align-items: center;

					line-height: 1;

					margin-left: 10px;

					&:first-child {
						margin-left: 10px;
					}

					.MuiCircularProgress-root {
						margin-left: 5px;
					}
				}

				&[aria-label='title'] {
					color: var(--link);

					text-decoration: underline;

					&:hover {
						color: var(--light-grey);
					}
				}

				&[aria-label='star'],
				&[aria-label='branch'] {
					font-weight: normal;
				}

				&[aria-label='star'] {
					color: var(--yellow);
				}

				&[aria-label='branch'] {
					color: var(--light-black);
				}
			}
		}
	}

	p {
		color: ${props => props.theme === 'light' ? 'var(--light-black)' : 'var(--white)'};
	}
`;

const LanguageIcon = styled.span`
	display: flex;
	align-items: center;

	padding: 5px;

	margin-left: -5px;

	color: ${props => props.theme === 'light' ? 'var(--light-black)' : 'var(--white)'};

	svg[data-prefix='fas']:hover {
		transform: scale(1) !important;
	}

	span {
		margin-left: 5px;

		font-size: 0.8rem;
	}
`;

const LanguageTag = (props) => (
	<LanguageIcon theme={props.theme}>
		{languages[props.language].icon}
		<span>{languages[props.language].text}</span>
	</LanguageIcon>
);

const Repository = (user = 'nicholasadamou', repositoryName, language, theme = 'dark') => {
	const repository = useGitHub(user, repositoryName);

	if (JSON.stringify(repository) === '{}') return <SkeletonRepository/>;

	const {
		id,
		name,
		description,
		html_url,
		stargazers_count,
		forks_count,
	} = repository;

	return (
		// <SkeletonRepository />
		<Container key={id} theme={theme}>
			<div>
				<span role="img" aria-label="git">
				  <FontAwesomeIcon icon={['fab', 'git-alt']}/>
				</span>
				<a
					href={html_url}
					target="_blank"
					aria-hidden="true"
					rel="noopener noreferrer"
					className="link"
				>
					<span aria-label="title">{name}</span>
				</a>
				{stargazers_count !== 0 && (
					<a
						href={`${html_url}/stargazers`}
						target="_blank"
						aria-hidden="true"
						aria-label={`${name} github stargazers_count`}
						title="star"
						rel="noopener noreferrer"
					>
						<span role="img" aria-label="star">
						  <FontAwesomeIcon icon={['fas', 'star']}/>{' '}
							{round(stargazers_count)}
						</span>
					</a>
				)}
				{forks_count !== 0 && (
					<a
						href={`${html_url}/fork`}
						target="_blank"
						aria-hidden="true"
						aria-label={`fork ${name} on github`}
						title="fork"
						rel="noopener noreferrer"
					>
						<span role="img" aria-label="branch">
						  <FontAwesomeIcon icon={['fas', 'code-branch']}/>{' '}
							{round(forks_count)}
						</span>
					</a>
				)}
				<span role="img" aria-label="language">
					<LanguageTag
						language={language !== undefined ? language : repository.language}
						theme={theme}
					/>
				</span>
			</div>
			<p>{description}</p>
		</Container>
	);
};

const SkeletonRepository = (id) => (
	<Container key={id}>
		<div>
      <span role="img" aria-label="git">
        <FontAwesomeIcon icon={['fab', 'git-alt']}/>
      </span>
			<span aria-label="title">
        <CircularProgress/>
      </span>
			<a
				href="#"
				target="_blank"
				aria-hidden="true"
				aria-label="github stargazers_count"
				title="star"
				rel="noopener noreferrer"
			>
        <span role="img" aria-label="star">
          <FontAwesomeIcon icon={['fas', 'star']}/> <CircularProgress/>
        </span>
			</a>
			<a
				href="#"
				target="_blank"
				aria-hidden="true"
				aria-label="fork on github"
				title="fork"
				rel="noopener noreferrer"
			>
        <span role="img" aria-label="branch">
          <FontAwesomeIcon icon={['fas', 'code-branch']}/> <CircularProgress/>
        </span>
			</a>
			<span role="img" aria-label="language">
        <CircularProgress/>
      </span>
		</div>
		<div>
			<SkeletonText heading={false} lineCount={2} paragraph width="100%"/>
		</div>
	</Container>
);

export default Repository;
