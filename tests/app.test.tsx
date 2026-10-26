import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "../app/page";
import { ThemeShell } from "../components/theme-shell";

describe("job-application-tracker workspace", () => {
  it("renders its initial workspace content", () => {
    const markup = renderToStaticMarkup(
      createElement(ThemeShell, null, createElement(HomePage)),
    );
    expect(markup).toContain("FOLIO");
  });
});