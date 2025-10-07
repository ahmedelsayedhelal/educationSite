import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
const fetchCategories = async () => {
    const res = await axios.get('/api/Categories')
    return res.data
}
const Categories = () => {
    const query =useQuery({
        queryKey:['categories'],
        queryFn:fetchCategories
    });
  return query;
}

export default Categories
