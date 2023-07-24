import React from "react";

export default function Header() {
  return (
    <div
      className="d-flex items-center justify-content-between p-4 z-[100] absolute"
      style={{ borderBottom: "6px solid grey" }}
    >
      <h1 className="font-bold">My Movie Searcher</h1>
    </div>
  );
}
