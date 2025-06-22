import React from 'react';
import BangladeshMap from './BangladeshMap';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const serviceCenters = useLoaderData();
    // console.log(serviceCenters)
    return (
        <div>
            <BangladeshMap serviceCenters={serviceCenters}></BangladeshMap>
        </div>
    );
};

export default Coverage;