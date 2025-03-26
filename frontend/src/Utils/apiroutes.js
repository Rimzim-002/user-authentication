const API_ROUTES = {
    AUTH: {
        BASE: "/auth",
        LOGIN: "/auth/login",
        SIGNUP: "/auth/signup",
    },

    ADMIN: {
        BASE: "/admin",

       
            FETCH_ALL_USERS: "/admin/users",
            FETCH_ALL_MOVIES:"/admin/allmMovies",
            DELETE_USER: "/admin/deleteUser/${userId}",
            UPDATE_USER: (userId) => `/api/admin/edituser/${userId}`,
        },
        
    USER: {
        BASE: "/user",

      
            FETCH_ALL_MOVIES: "user/allmMovies",
            FETCH_MOVIE_BY_ID: (movieId) => `/user/getmovie/${movieId}`,
            BOOK_MOVIE: (movieId) => `/user/booking/${movieId}`,
            PAYMENT:"/user/payment",
            GET_ORDERS:"user/orders"

    }
        // MOVIES: {
        //     ADD: "/api/admin/addmovie",
        //     GET_ALL: "/allmMovies",
        //     GET_BY_ID: (movieId) => `/getMovie/${movieId}`,
        //     DELETE: (movieId) => `/deleteMovie/${movieId}`,
        //     UPDATE: (movieId) => `/updateMovie/${movieId}`,
        // },

        // ORDERS: {
        //     FETCH_ALL: "/api/admin/orders",
        //     CONFIRM_PAYMENT: "/api/admin/payment",
        // },
    }

//         PROFILE: "/api/user/profile",
//     },

//     MOVIES: {
//         BASE: "/api/movies",
//         FETCH_ALL: "/api/movies/allmMovies",
//         FETCH_BY_ID: (movieId) => `/api/movies/getmovie/${movieId}`,
//         BOOK_TICKET: (movieId) => `/api/movies/bookticket/${movieId}`,
//     },

//     ORDERS: {
//         BASE: "/api/orders",
//         GET_USER_ORDERS: "/api/orders/getUserOrder",
//         UPDATE_PAYMENT: (orderId) => `/api/orders/updatepayment/${orderId}`,
//         BOOKING: (bookingId) => `/api/orders/booking/${bookingId}`,
//         CONFIRM_PAYMENT: "/api/orders/payment",
//     },
// };

export default API_ROUTES;
