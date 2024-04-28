import { useRouteError } from "react-router-dom";

// error page for router
export default function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Page not found:</h1>
      <p>{error.data}</p>
    </div>
  );
}
