import React from "react";
import { Route, Link, useLocation, Routes } from "react-router-dom";

import { Task as UIIntegration } from "./01-ui-integration";

const task = {
  title: "UI Integration",
  slug: "ui-integration",
};

function Tasks() {
  let location = useLocation();

  return (
    <div>
      <Routes>
        <Route path={`/task/${task.slug}`} element={<UIIntegration />} />
        <Route path={location.path} element={<h3>Please select a topic.</h3>} />
      </Routes>
    </div>
  );
}

function List() {
  return (
    <div>
      <Link to={`/task/${task.slug}`}>{task.title}</Link>
    </div>
  );
}

export default Tasks;

export { List };
