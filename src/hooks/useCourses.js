import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCourses = async ({ queryKey }) => {
  const [_key, filters] = queryKey;
  const { rating, lectures, category, minPrice, maxPrice } = filters;

  const { data } = await axios.get("http://educationtraining.runasp.net/api/Courses", {
    params: {
      rating,
      lectures,
      category,
      minPrice,
      maxPrice,
    },
  });

  return data;
};

export const useCourses = (filters) => {
  return useQuery({
    queryKey: ["courses", filters], // لو الفلاتر اتغيرت → refetch تلقائي
    queryFn: fetchCourses,
    keepPreviousData: true, // يخلي الكورسات القديمة لحد ما الجديدة تيجي
  });
};
