// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DEFAULT_PROJECT_DEFINITION } from "@/core/structures/techo-un-agua/model";
import { RoofEditor } from "./RoofEditor";

describe("RoofEditor", () => {
  it("shows metric drafts, exact one-decimal angle and discrete controls", () => {
    render(
      <RoofEditor
        id="p1"
        initial={DEFAULT_PROJECT_DEFINITION}
        initialUpdatedAt={new Date(0).toISOString()}
      />,
    );
    expect(screen.getByLabelText(/^Ancho/)).toHaveValue("2,900");
    expect(
      screen.getByText(
        (_, node) => node?.tagName === "DD" && node.textContent?.includes("6,9°") === true,
      ),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Sentido de caída")).toBeInTheDocument();
    expect(screen.queryByText(/arrastr/i)).not.toBeInTheDocument();
  });

  it("redistributes on depth or count and preserves positions on width, height or fall changes", () => {
    render(
      <RoofEditor
        id="p1"
        initial={DEFAULT_PROJECT_DEFINITION}
        initialUpdatedAt={new Date(0).toISOString()}
      />,
    );

    fireEvent.change(screen.getByLabelText(/Cantidad/), { target: { value: "2" } });
    expect(screen.getByLabelText("Posición 1 (mm)")).toHaveValue(0);
    expect(screen.getByLabelText("Posición 2 (mm)")).toHaveValue(4150);
    expect(screen.getByText(/se descartaron/)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Posición 1 (mm)"), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText(/^Ancho/), { target: { value: "3,000" } });
    fireEvent.change(screen.getByLabelText(/^Diferencia de altura/), { target: { value: "0,450" } });
    fireEvent.change(screen.getByLabelText("Sentido de caída"), { target: { value: "back" } });
    expect(screen.getByLabelText("Posición 1 (mm)")).toHaveValue(100);
    expect(screen.getByLabelText("Posición 2 (mm)")).toHaveValue(4150);

    fireEvent.change(screen.getByLabelText(/^Profundidad horizontal/), {
      target: { value: "4,000" },
    });
    expect(screen.getByLabelText("Posición 1 (mm)")).toHaveValue(0);
    expect(screen.getByLabelText("Posición 2 (mm)")).toHaveValue(4000);
  });

  it("blocks a depth and height combination whose beam exceeds 4.50 m", () => {
    render(
      <RoofEditor
        id="p1"
        initial={DEFAULT_PROJECT_DEFINITION}
        initialUpdatedAt={new Date(0).toISOString()}
      />,
    );
    fireEvent.change(screen.getByLabelText(/^Profundidad horizontal/), {
      target: { value: "4,500" },
    });
    expect(screen.getByText("La viga supera la barra de compra de 4,50 m.")).toBeInTheDocument();
  });

  it("keeps invalid metric drafts out of the model and enforces the purlin count limit", () => {
    render(
      <RoofEditor
        id="p1"
        initial={DEFAULT_PROJECT_DEFINITION}
        initialUpdatedAt={new Date(0).toISOString()}
      />,
    );
    const width = screen.getByLabelText(/^Ancho/);
    fireEvent.change(width, { target: { value: "1 500" } });
    expect(width).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(/espacios dentro/)).toBeInTheDocument();

    fireEvent.change(width, { target: { value: "3.000" } });
    expect(width).toHaveAttribute("aria-invalid", "false");
    expect(screen.getByText("Actual: 3,000 m")).toBeInTheDocument();

    const count = screen.getByLabelText(/Cantidad/);
    fireEvent.change(count, { target: { value: "101" } });
    expect(count).toHaveValue(0);
  });
});
