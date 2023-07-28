import { render, screen } from "@testing-library/react";

import Header from "../components/Header";
import Movie from "../components/Movie";
test("header of the page is visible", () => {
  render(<Header />);
  // screen.debug();
  const el = screen.getByRole("heading", { name: /my movie searcher/i });
  expect(el).toBeInTheDocument();
});

test("movies tab is render", () => {
  render(<Movie />);
  // screen.debug();
  const el = screen.getByRole("heading", { name: /movies/i });
  expect(el).toBeInTheDocument();
});
