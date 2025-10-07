// hooks/UseLogin.js
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

// دالة لفك تشفير JWT
const decodeJWT = (token) => {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

const UseLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials) => {
      const res = await fetch("/api/Account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();

      // ✅ خزن التوكن وبيانات المستخدم
      if (data?.token) {
        localStorage.setItem("token", data.token);
        
        // فك تشفير التوكن علشان نجيب الـ role
        const decodedToken = decodeJWT(data.token);
        if (decodedToken) {
          localStorage.setItem("userRole", decodedToken.role);
          localStorage.setItem("userEmail", decodedToken.email);
          localStorage.setItem("username", decodedToken.sub);
          
          console.log("🔑 User Role:", decodedToken.role);
          console.log("👤 User Email:", decodedToken.email);
        }
        
        queryClient.invalidateQueries(["currentUser"]);
        console.log("💾 Token saved:", data.token);
      }

      return data;
    },

    onSuccess: (data) => {
      console.log("✅ Logged in successfully:", data);
    },

    onError: (error) => {
      console.error("❌ Login error:", error.message);
    },
  });
};

export default UseLogin;