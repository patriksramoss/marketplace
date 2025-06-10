import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import Loader from "./Components/Loader/Loader";
import Settings from "./Pages/Settings/Settings";
import Profile from "./Pages/Profile/Profile";
import Market from "./Pages/Market/Market";
import Product from "./Pages/Product/Product";
import Balance from "./Pages/Balance/Balance";
import { observer } from "mobx-react-lite";

// STORES
import userStore from "./Stores/User";

const BalanceSandbox = React.lazy(() =>
  import("./Pages/Balance/BalanceSandbox")
);

const ProtectedRoute = ({ element, authenticated }) =>
  authenticated ? element : <Navigate to="/login" replace />;

const AppRoutes = observer(({ authenticated }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authenticated !== null) {
      setTimeout(() => setLoading(false), 100);
    }
  }, [authenticated]);

  useEffect(() => {}, [userStore.data]);

  if (loading) return <Loader contained={false} />;

  return (
    <Routes>
      {authenticated ? (
        <>
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/market/*"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                element={<Market />}
              />
            }
          />
          <Route
            path="/product/:itemId"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                element={<Product />}
              />
            }
          />
          <Route
            path="/balance"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                element={
                  <Suspense fallback={<Loader />}>
                    {userStore.data.sandbox ? <BalanceSandbox /> : null}
                  </Suspense>
                }
              />
            }
          />
          <Route
            path="/account"
            element={<Navigate to="/settings#account" replace />}
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                element={<Settings />}
              />
            }
          />
          <Route
            path="/friends"
            element={<Navigate to="/settings#friends" replace />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                authenticated={authenticated}
                element={<Profile />}
              />
            }
          />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
});

export default AppRoutes;
