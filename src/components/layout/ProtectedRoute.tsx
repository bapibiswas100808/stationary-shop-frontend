import { ReactNode, useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hook";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";
import { Spin } from "antd";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Spin size="large" tip="Authenticating..." />
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
