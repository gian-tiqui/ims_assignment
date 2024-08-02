import { Route, Routes } from "react-router-dom";
import { routeMapping } from "./data/Routes";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <main className="h-full min-h-screen bg-neutral-800">
      <Routes>
        {routeMapping.map((routeMap) => (
          <Route
            key={routeMap.path}
            path={routeMap.path}
            element={
              routeMap.protected ? (
                <ProtectedRoute element={routeMap.component} />
              ) : (
                routeMap.component
              )
            }
          />
        ))}
      </Routes>
    </main>
  );
};

export default App;
