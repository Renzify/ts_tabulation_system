import { Link } from "react-router";

function Home() {
  return (
    <div>
      <h1>This is the home page.</h1>
      <Link to="/admin"> Link to admin </Link>
    </div>
  );
}

export default Home;
