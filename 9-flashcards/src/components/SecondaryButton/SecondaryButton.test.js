import { render, screen } from "@testing-library/react";
import SecondaryButton from "./SecondaryButton";

describe("SecondaryButton", () => {
  it("should render a Button", () => {
    render(<SecondaryButton></SecondaryButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  it("should render an empty Button if nothing is passed", () => {
    render(<SecondaryButton></SecondaryButton>);
    const button = screen.getByRole("button");
    const buttonText = button.textContent;
    expect(buttonText).toEqual("");
  });
  it("should render the given children", () => {
    render(<SecondaryButton>Button content</SecondaryButton>);
    const text = screen.getByText(/button content/i);
    expect(text).toBeInTheDocument();
  });
  it("should render a disabled button if the disabled prop is true", () => {
    render(<SecondaryButton disabled={true}></SecondaryButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
