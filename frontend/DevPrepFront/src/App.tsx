import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SchedulePage } from "./page/Schedule/Schedule";
import { ScheduleWrite } from "./page/Schedule/ScheduleWrite";
import { Layout } from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/schedule/regist" element={<ScheduleWrite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
