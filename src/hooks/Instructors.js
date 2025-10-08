import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
const fetchinstructor = async () => {
    const res = await axios.get('http://educationtraining.runasp.net/api/Instructor')
    return res.data
}
const Instructors = () => {
    const query =useQuery({
        queryKey:['instructors'],
        queryFn:fetchinstructor
    });
  return query;
}

export default Instructors
