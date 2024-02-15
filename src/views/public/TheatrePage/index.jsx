import React from "react";
import { Route, Routes } from "react-router-dom";
import TheatreList from "./pages/TheatreList";
import TheatreDetail from "./pages/TheatreList";

function index() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TheatreList />} />
        <Route path="/:id" element={<TheatreDetail />} />
      </Routes>
    </>
  );
}

export default index;
