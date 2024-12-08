import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Contact from '../components/contact/contact';
import About from '../components/about/about';
import Team from '../components/team/Team';
import TeamStore from '../store/TeamStore';

const AboutPage = () => {

    const { TeamListRequest } = TeamStore();

    useEffect(() => {
        (async () => {
            await TeamListRequest();
        })()
    }, []);

    return (
        <Layout>
            <About/>
            <Team/>
            <Contact/>
        </Layout>
    );
};

export default AboutPage;