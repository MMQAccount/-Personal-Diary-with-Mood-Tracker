import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatisticsPage from "../src/pages/StatisticsPage/StatisticsPage";

describe("StatisticsPage", () => {
  it("should render the statistics page", () => {
    render(<StatisticsPage />);
    
    const heading = screen.getByRole("heading", { name: "Statistics", level: 2 });
    expect(heading).toBeInTheDocument();
  });
});
