import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import BlogDetails from '../components/blog/BlogDetails';
import Contact from '../components/contact/contact';
import BlogStore from '../store/BlogStore';
import { useParams } from 'react-router-dom';

const BlogDetailsPage = () => {


    const { BlogListDetailsRequest, BlogListRequest } = BlogStore();
    let {id} = useParams()

    useEffect(() => {
        (async () => {
            await BlogListDetailsRequest(id);
            await BlogListRequest();
        })()
    }, []);


    return (
        <Layout>
            <BlogDetails/>
            <Contact/>
        </Layout>
    );
};

export default BlogDetailsPage;