import { useEffect, lazy, Suspense, memo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuthStore } from "../Store/authStore";
import LoadingSpinner from "./components/LoadingSpinner";
import VendorOnboardingPage from "./Pages/VendorDashboard/GotoOnboarding";

// Lazy-loaded components
const MainlLayout = lazy(() => import("./Layout/MainlLayout"));
const VendorDashBoardLayout = lazy(() => import("./Layout/VendorDashBoardLayout"));

const LoginForm = lazy(() => import("./components/LoginForm"));
const RegisterForm = lazy(() => import("./components/RegisterForm"));
const OTPVerification = lazy(() => import("./components/OtpForm/OtpForm"));
const VendorOnboardingForm = lazy(() => import("./Pages/Onboard"));
const Dashboard = lazy(() => import("./Pages/Admin"));
const VendorDashboard = lazy(() => import("./Pages/VendorDashboard/VendorServicesPage"));
const EditablePage = lazy(() => import("./Pages/EditPage"));
const UserViewPage = lazy(() => import("./Pages/ClientServicePage"));
const FreelanceMarketplace = lazy(() => import("./components/sections/services"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage"));
const ContactForm = lazy(() => import("./Pages/ContactUs"));
const VendorSubscription = lazy(() => import("./Pages/VendorSubscription"));
// const MainProductPage = lazy(() => import("./productPage/prodListing/productListing"));
// const CheckoutPage = lazy(() => import("./productPage/checkout/productCheckout"));
const AdminDashboard = lazy(() => import("./Pages/Admin"));
const RedirectPage = lazy(() => import("./Pages/RedirectPage"));
const Home = lazy(() => import("./Pages/home"));
const PricingPage = lazy(() => import("./Pages/pricing"));

const VendorDetailsPage = lazy(() => import("./Pages/VendorDetails"));
const NotFoundPage = lazy(() => import("./Pages/404Page"));

const ProtectedRoute = memo(({ children }) => {
  const { authenticationState, loading, redirectToOtp } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (redirectToOtp) {
    if (location.pathname !== "/verify") {
      return <Navigate to="/verify" state={{ from: location.pathname }} replace />;
    }
    return children;
  }

  if (!authenticationState && location.pathname !== "/login") {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return authenticationState ? children : null;
});

const App = () => {
  const { checkAuth } = useAuthStore();


  useEffect(() => {
    let isMounted = true;

    const performAuth = async () => {
      if (isMounted) {
        await checkAuth();
      }
    };

    performAuth();

    return () => {
      isMounted = false;
    };
  }, [checkAuth]);

  return (
    <div>
      <Toaster position="top-right" richColors closeButton />

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainlLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/view/:id" element={<UserViewPage />} />
            <Route path="/services" element={<FreelanceMarketplace />} />
            <Route path="/contact-us" element={<ContactForm />} />
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <VendorOnboardingForm />
              </ProtectedRoute>
            } />
            {/* <Route path="/products" element={<MainProductPage />} /> */}
            {/* <Route path="/checkout" element={<CheckoutPage />} /> */}

            <Route path="/redirect" element={<RedirectPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/verify" element={<OTPVerification />} />

          <Route
            path="/vendor-details/:id"
            element={
              <ProtectedRoute>
                <VendorDetailsPage />
              </ProtectedRoute>
            }
          />


          <Route element={
            <ProtectedRoute>
              <VendorDashBoardLayout />
            </ProtectedRoute>
          }>

            <Route path="/goto/onboarding" element={<VendorOnboardingPage />} />
            <Route path="/dashboard/vendor/services" element={<VendorDashboard />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            <Route path="/dashboard/subscriptions/vendor" element={<VendorSubscription />} />
          </Route>



          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditablePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;