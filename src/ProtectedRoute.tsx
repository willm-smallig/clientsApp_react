import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const session = localStorage.getItem("supabase.auth.token");
        return session ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
}
