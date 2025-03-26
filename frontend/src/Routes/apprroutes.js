import Signup from "../Pages/auth/Signup";
import Login from "../Pages/auth/Login";
import Admindashboard from "../Pages/dashboard/Adindashboard/Admindashboard";
import UserManagement from "../Pages/dashboard/Adindashboard/Usermanagement";
import MoviesManagement from "../Pages/dashboard/Adindashboard/Moviesmanagement";
import TotalRevenue from "../Pages/dashboard/Adindashboard/Totalrevenue";

import Home from "../Pages/dashboard/userdashboard/Homepage";
import UserDashboard from "../Pages/dashboard/userdashboard/Userdashboard";
import MovieDetails from "../Pages/dashboard/userdashboard/Moviedetailpage";
import BookingPage from "../Pages/dashboard/userdashboard/Bookingpage";
import UserProfile from "../Pages/dashboard/userdashboard/UserProfile";
import Myorders from "../Pages/dashboard/userdashboard/Myorders";

import { APP_ROUTES } from "./routes";

// Define Roles
export const ROLES = Object.freeze({
  SUPER_ADMIN: "superadmin",
  ADMIN: "admin",
  USER: "user",
});

const appRoutes = [
  // Public Routes
  { path: APP_ROUTES.HOME, element: <Signup />, isProtected: false },
  { path: APP_ROUTES.LOGIN, element: <Login />, isProtected: false },
  { path: APP_ROUTES.MOVIE_DETAILS, element: <MovieDetails />, isProtected: true, role: ROLES.USER }, // ✅ Now includes `:movieId`


  // User Routes
  { path: APP_ROUTES.USER_DASHBOARD, element: <UserDashboard />, isProtected: true, role: ROLES.USER },
  { path: APP_ROUTES.BOOK_TICKET, element: <BookingPage />, isProtected: true, role: ROLES.USER },
  { path: APP_ROUTES.PROFILE, element: <UserProfile />, isProtected: true, role: ROLES.USER },
  { path: APP_ROUTES.ORDERS, element: <Myorders />, isProtected: true, role: ROLES.USER },
  { path: APP_ROUTES.MOVIE_DETAILS, element: <MovieDetails />, isProtected: true, role: ROLES.USER },
  

  // Admin Routes
  { path: APP_ROUTES.ADMIN_DASHBOARD, element: <Admindashboard />, isProtected: true, role: ROLES.SUPER_ADMIN },
  { path: APP_ROUTES.ADMIN_USERS, element: <UserManagement />, isProtected: true, role: ROLES.SUPER_ADMIN },
  { path: APP_ROUTES.ADMIN_MOVIES, element: <MoviesManagement />, isProtected: true, role: ROLES.SUPER_ADMIN },
  { path: APP_ROUTES.ADMIN_TOTAL_REVENUE, element: <TotalRevenue />, isProtected: true, role: ROLES.SUPER_ADMIN },
];
export default appRoutes;
