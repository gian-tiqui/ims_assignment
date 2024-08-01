import { Route, Routes } from "react-router-dom";
import { routeMapping } from "./data/Routes";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div className="bg-neutral-800 h-screen">
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
    </div>
  );
};

export default App;
