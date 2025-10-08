// hooks/useCourses.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("https://educationtraining.runasp.net/api/Courses");
        return data;
      } catch (error) {
        console.error(" Error fetching courses:", error.response?.data || error.message);
        throw error;
      }
    },
    retry: false,
    refetchOnWindowFocus: false, 
  });
}
