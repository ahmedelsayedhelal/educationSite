import axios from 'axios';
import React from 'react'
import { useQuery } from '@tanstack/react-query';

const Courses = () => {
    const course = async () => {
        const res = await axios.get('http://educationtraining.runasp.net/api/Courses');
        return res.data
    }
    const query = useQuery({
        queryKey: ['courses'],
        queryFn: course
    });
    return query;



}

export default Courses
