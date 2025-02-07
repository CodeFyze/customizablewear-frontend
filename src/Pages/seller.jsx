import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerDashboard from "../components/sellerDashboard";

const SellPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/isAdmin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();
        console.log("Admin Check Response:", data); 

        if (data.success) {
          setIsAdmin(true);
        } else {
          console.log("User is not an admin, redirecting to login");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!isAdmin) {
    return null; 
  }

  return (
    <div>
      <SellerDashboard />
    </div>
  );
};

export default SellPage;