import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { IonSpinner } from "@ionic/react";
import { useAuth } from "./services/AuthContext";

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

export default function ProtectedRoute({
  component: Component,
  ...rest
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <IonSpinner name="crescent" />
            </div>
          );
        }

        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}
