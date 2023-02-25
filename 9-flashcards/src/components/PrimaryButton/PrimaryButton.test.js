import { render, screen } from "@testing-library/react";
import PrimaryButton from "./PrimaryButton";

describe("PrimaryButton", () => {
  it("should render a Button", () => {
    render(<PrimaryButton></PrimaryButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  it("should render an empty Button if nothing is passed", () => {
    render(<PrimaryButton></PrimaryButton>);
    const button = screen.getByRole("button");
    const buttonText = button.textContent;
    expect(buttonText).toEqual("");
  });
  it("should render the given children", () => {
    render(<PrimaryButton>Button content</PrimaryButton>);
    const text = screen.getByText(/button content/i);
    expect(text).toBeInTheDocument();
  });
  it("should render a disabled button if the disabled prop is true", () => {
    render(<PrimaryButton disabled={true}></PrimaryButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
