import React from 'react';
import Banner from '../Banner/Banner';
import TagSection from '../../TagSection/TagSection';
import AllPost from '../AllPosts/AllPost/AllPost';
import { Helmet } from 'react-helmet-async';
import AnnouncementSection from '../AnnouncementSection/AnnouncementSection';
import Subscription from '../Subscription/Subscription';

const Home = () => {
    return (
        <div>
            <Helmet>
            <title>Forum | Home</title>
            </Helmet>
            
            <Banner></Banner>
            <TagSection></TagSection>

           <AnnouncementSection></AnnouncementSection>

            <AllPost></AllPost>

            <Subscription></Subscription>
        </div>
    );
};

export default Home;