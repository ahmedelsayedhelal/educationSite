import { useMutation,QueryClient } from "@tanstack/react-query";
import axios from "axios";

const useRegister = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const { data } = await axios.post(
        "https://educationtraining.runasp.net/api/Account/register",
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    },
  });
};

export default useRegister;
