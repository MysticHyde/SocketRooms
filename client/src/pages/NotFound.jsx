import { Link } from "react-router-dom";
const NotFound = () => (
  <div>
    <h1>Not Found page</h1>
    <p>The page you tried to access doesn't exist.</p>
    <Link to="/">Go back.</Link>
  </div>
);

export default NotFound;
