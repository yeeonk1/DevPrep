import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SchedulePage } from "./page/Schedule/Schedule";
import { Layout } from "./components/sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/schedule" element={<SchedulePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
