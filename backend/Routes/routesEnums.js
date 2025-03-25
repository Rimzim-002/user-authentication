const ROUTES = {
    AUTH: "/api/auth",
    ADMIN: "/api/admin",
    USER: "/api/user",

    // Authentication
    LOGIN: "/login",
    SIGNUP: "/signup",

    // User Management
    USERS: "/users",
    USERID: "/user/:id",
    DELETE_USER: "/deleteUser/:id",
    UPDATE_USER: "/editUser/:id",



    // Movie Management
    ALL_MOVIES: "/allmMovies",
    GET_MOVIE: "/getmovie/:id",
    BOOK_TICKET: "/bookticket/:movieId",
    UPDATE_PAYMENT: "/updatepayment/:orderId",
    GET_USER_ORDERS: "/getUserOrder",

    // Admin Routes
    ADMIN_USERS: "/adminusers",
    ADMIN_GET_USER: "/getuser/:_id",
    ADMIN_DELETE_USER: "/deleteuser/:_id",
    ADMIN_EDIT_USER: "/edituser/:_id",

    // Movies (Admin)
    ADD_MOVIE: "/addmovies",
    GET_ALL_MOVIES: "/getallmovies",
    ADMIN_GET_MOVIE: "/getMovie/:id",
    DELETE_MOVIE: "/deleteMovie/:id",
    UPDATE_MOVIE: "/updateMovie/:id",
};

module.exports = { ROUTES };
