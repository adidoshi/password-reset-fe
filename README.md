# Complete JWT User Authentication UI

### Front end: user register -> login -> forgot password -> reset password -> private route -> logout functionality acheived.

Backend Repo ->

https://github.com/adidoshi/password-reset-backend

User get's redirected to login page if user auth token is not found in the local storage, i.e. '/' gets redirect to '/login'.
React-router-dom useHistory usage.

When user logs in - JWT token is verified, if correct user redirects to private route page.

If not error -> "Not authorized to access this route".

React-router-dom (Redirect, Route) -> usage.
