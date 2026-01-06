# ReelRoll Application Review

## BACKEND REVIEW

### Strengths

1. **Well-structured API organization**

   - Clear separation of routers by resource (users, movies, genres, reviews, favorites)
   - Good use of Express Router for modular routing

2. **Database schema design**

   - Proper use of foreign keys and constraints
   - Good normalization with junction table for movie_genre
   - Appropriate use of CASCADE deletes
   - Unique constraints prevent duplicate favorites and reviews

3. **Security practices**

   - Password hashing with bcrypt
   - JWT token authentication
   - Middleware for user authentication (`requireUser`, `getUserFromToken`)
   - Input validation middleware (`requireBody`)

4. **Error handling**

   - Error handling middleware for database errors (PostgreSQL error codes)
   - Try-catch blocks in route handlers
   - Proper error propagation with `next()`

5. **Database queries**
   - Parameterized queries prevent SQL injection
   - Good separation of concerns with query functions

### Issues & Bugs

1. **Bug in `reviewRouter.js`**

   - Line 43: `req.params.userId` is undefined - should be `req.user.id` since the route is `/user` (no param)
   - The route should be `/user/:userId` if you want to use params, or use `req.user.id` directly since you have a middleware getting the user and adding to the request on `req.user`

2. **Inconsistent error responses**

   - Some routes return JSON, others return plain text
   - Error messages could be more consistent (e.g., always return `{ error: "message" }`)

3. **Missing CORS configuration**

   - No CORS middleware configured - may cause issues with frontend requests
   - This will be needed when deploying

---

## FRONTEND REVIEW

### Strengths

1. **Modern React setup**

   - Uses React Router for navigation
   - Context API for authentication state management
   - Functional components with hooks

2. **Component organization**

   - Good separation of concerns with separate folders for different features
   - API calls separated into dedicated files

3. **Routing structure**
   - Clear route definitions in `App.jsx`
   - Protected routes concept (though implementation could be improved)

### Issues & Bugs

1. **Critical: Bug in `frontend/src/auth/auth.jsx`**

   - Line 72: `localStorage.removeItem("token")` is called outside the `logout` function
   - This line executes on every render, not just when logout is called
   - Should be inside the `logout` function

2. **Bug in `frontend/src/movies/movieDetails.jsx`**

   - Line 18: References `setFav` which is commented out (line 10)
   - Line 32: References `movies.release_date` but schema has `release_year`
   - Line 33: References `movies.genre` but this field doesn't exist in the movie object

3. **Missing error handling**

   - API functions catch errors but don't provide user feedback
   - No error boundaries in React components
   - Login/register pages don't display error messages to users

4. **Missing loading states**

   - Most components don't show loading indicators while fetching data
   - Only `MovieDetails` has a loading check

5. **Missing authentication checks**

   - No protected route wrapper
   - Users can navigate to protected pages without being logged in
   - Components that require auth don't check token before making requests

6. **Token not cleared on logout**

   - `logout` function doesn't clear token from localStorage properly (see bug #1)
   - Should also redirect user after logout

7. **Missing user feedback**
   - No success messages after actions (e.g., adding favorite, creating review)
   - No confirmation dialogs for destructive actions (delete account, remove favorite)

### Low Priority Issues

1. **Console.log statements**

   - Multiple `console.log` statements left in production code
   - Should be removed or replaced with proper logging

2. **Hardcoded API paths**

   - API endpoints are hardcoded in multiple places
   - Should use the `API` constant` or create a centralized API configuration

3. **State management**

   - No global state management for movies, genres, etc.
   - Each component fetches its own data, leading to redundant API calls
   - Consider using Context API for the various data objects
