import { render, screen } from "@testing-library/react";
import DeckPreview from "./DeckPreview";

describe("DeckPreview", () => {
  it("should render a button", () => {
    render(<DeckPreview />)
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  it("should render a button with the text from the text prop", () => {
    render(<DeckPreview text="Deck 1"/>);
    const text = screen.getByText(/deck 1/i);
    expect(text).toBeInTheDocument();
  })
  it("should render a default 'Unnamed' no text prop is passed", () => {
    render(<DeckPreview />);
    const text = screen.getByText(/unnamed/i);
    expect(text).toBeInTheDocument();
  });
  it("should render a default 'Unnamed' if given an empty string", () => {
    render(<DeckPreview text="" />);
    const text = screen.getByText(/unnamed/i);
    expect(text).toBeInTheDocument();
  })
  it("should render a default 'Unnamed' if given null", () => {
    render(<DeckPreview text={null} />);
    const text = screen.getByText(/unnamed/i);
    expect(text).toBeInTheDocument();
  })
});