import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "../app/page";
import { ThemeShell } from "../components/theme-shell";

describe("job-application-tracker workspace", () => {
  function renderWorkspace() {
    const markup = renderToStaticMarkup(
      createElement(ThemeShell, null, createElement(HomePage)),
    );
    return markup;
  }

  it("renders its initial workspace content", () => {
    const markup = renderWorkspace();
    expect(markup).toContain("FOLIO");
  });

  it("keeps the current workspace destinations available as in-page anchors", () => {
    const markup = renderWorkspace();
    expect(markup).toContain('aria-label="Main navigation"');
    expect(markup).toContain('href="#pipeline"');
    expect(markup).toContain('id="pipeline"');
    expect(markup).toContain('href="#calendar"');
    expect(markup).toContain('id="calendar"');
    expect(markup).toContain('href="#insights"');
    expect(markup).toContain('id="insights"');
    expect(markup).toContain('id="settings"');
    expect(markup).toContain('id="help"');
    expect(markup).toContain('aria-label="Compact workspace navigation"');
    expect(markup).toContain('href="#overview"');
    expect(markup).toContain('id="overview"');
  });
});
