import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Contact from '../components/contact/contact';
import Service from '../components/service/Service';
import ServiceStore from '../store/ServiceStore';

const OurServicePage = () => {

    const { ServiceListRequest } = ServiceStore();

    useEffect(() => {
        (async () => {
            await ServiceListRequest();
        })()
    }, []);

    return (
        <Layout>
            <Service/>
            <Contact/>
        </Layout>
    );
};

export default OurServicePage;