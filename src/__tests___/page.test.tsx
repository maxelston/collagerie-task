import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Home Page", () => {
  it("should render heading", () => {
    render(<Page />);
    expect(screen.getByAltText("rick and morty logo")).toBeDefined();
  });
});
