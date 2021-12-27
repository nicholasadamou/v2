/* eslint-disable import/no-unresolved */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

import styled from 'styled-components';
import {graphql, useStaticQuery} from "gatsby";

import Heading from '@components/Heading';
import Experience from '@components/Experience';

import {findImageByName} from '@utilities/utilities';
import {device, until} from '@utilities/mixins';

import Section from '@sass/components/Section';
import Container from '@sass/components/Container';

import { resume, socialMedia } from '@config';

const Experiences = styled.div`
	padding: 0 6rem;

	${until(
		device.MacbookAir(),
		() => `
		margin: -1rem auto;
		margin-bottom: 1rem;
		margin-top: 1.5rem;
	`
	)}

	${until(
		device.iPadProVertical(),
		() => `
		padding: 0;
	`
	)}

	${until(
		device.iPhone12(),
		() => `
		margin: 2rem 0;
		margin-bottom: 1rem;
	`
	)}

	.experience:nth-child(even) {
		margin: 2rem 0 2rem auto;

		${until(
			device.iPhone12(),
			() => `
			margin: 2.5rem 0 2.5rem -20px;
		`
		)}
	}

  .experience:last-child {
    margin-bottom: -5px;
  }

	.has-badges {
		margin-bottom: 5.25rem !important;

		${until(
			device.MacbookAir(),
			() => `
			margin-bottom: 4.75rem !important;
		`
		)}

		${until(
			device.iPhone12(),
			() => `
			margin-bottom: 5.75rem !important;
		`
		)}
	}
`;

const Work = (props) => {
  const { linkedin } = socialMedia;

  const { logos } = useStaticQuery(
    graphql`
      query {
        logos: allFile(filter: { relativeDirectory: { eq: "logos" } }) {
          edges {
            node {
              childImageSharp {
                gatsbyImageData(
                  layout: FIXED
                  width: 50
                  quality: 100
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                )
              }
            }
          }
        }
      }
    `
  );

  const ibm = findImageByName('ibm.png', logos.edges);

  return (
    <Section>
      <Container
        style={{
          marginTop: '-1rem',
        }}
      >
        <Heading
          title="Where I've Worked"
          subtitle={() => (
            <p className="subtitle">
              Please read my{' '}
              <a
                href={resume}
                target="_blank"
                aria-hidden="true"
                rel="noopener noreferrer"
                className="link"
              >
                resume
              </a>
              {' and connect with me on '}
              <a
                href={linkedin.url}
                target="_blank"
                aria-hidden="true"
                rel="noopener noreferrer"
                className="link"
                id={linkedin.name.toLowerCase()}
              >
                {linkedin.name}
              </a>
              .
            </p>
          )}
        />

        <Experiences>
          <Experience
            company='IBM'
            title='Staff Software Engineer'
            location='Southbury, CT'
            duration='May 2021 - Present'
            description={() => "Leads the software development team for IBM’s cloud-native ledger software. Works on cross-functional teams to enhance the journaling software. Leverages modern technologies to bring a new modern face to IBM's ledger application. Integrated Apache POI to dynamically handle Excel document generation and parsing. Incorporated IBM Watson to construct a full stack chatbot application to handle user queries. Utilized Box and Java Springboot to stream video/image content to chatbot. Incorporated JWT authentication for meaningful user context. Implemented system for dynamically handling toast-style notifications. Led performance improvements initiative which led to an overall performance gain of ~60%. Acts as a software librarian for IBM's departmental software handling production deployments."}
            image={ibm}
          />

          <Experience
            company='IBM'
            title='Associate Software Engineer'
            location='Southbury, CT'
            duration='June 2019 - May 2021'
            description={() => "Works on cross-functional teams to enhance IBM's ledger and departmental software. Developed various key front-end and back-end services. Integrated IBM Carbon Design system (React) as base design system for IBM's ledger software. Constructed documentation surrounding each of the ledger's micro-service's API utilizing Swagger. Utilized IBM SSO, JWT, and React Redux to securely authenticate users. Integrated dynamic session timeout handling for user sessions. Utilized cron jobs, Hibernate, and Java Springboot to automate the clean-up of user PI data within IBM's departmental software."}
            image={ibm}
          />
        </Experiences>
      </Container>
    </Section>
  )
};

export default Work;
