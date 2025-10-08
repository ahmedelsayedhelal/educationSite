// hooks/useCourses.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn(" No token found — user not logged in");
        throw new Error("Unauthorized");
      }

      try {
        const { data } = await axios.get("https://educationtraining.runasp.net/api/Courses", {
          headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`

          },
        });

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
