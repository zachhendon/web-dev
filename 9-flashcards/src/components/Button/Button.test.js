import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("should render a button", () => {
    render(<Button />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  it("should render a button with the string from props.children", () => {
    render(<Button>Button content</Button>);
    const text = screen.getByText(/button content/i);
    expect(text).toBeInTheDocument();
  });
  it("should render the given element if given a component", () => {
    render(<Button><p>Button content</p></Button>);
    const text = screen.getByText(/button content/i);
    expect(text).toBeInTheDocument();
  });
  it("should render the given component if given a component", () => {
    render(<Button><Button>Button content</Button></Button>);
    const text = screen.getByText(/button content/i);
    expect(text).toBeInTheDocument();
  });
  it("should render the given number if given a number", () => {
    render(<Button>{123}</Button>);
    const button = screen.getByRole("button");
    const buttonText = button.textContent;
    expect(buttonText).toEqual("123");
  });
  it("should render the given boolean if given a boolean", () => {
    render(<Button>{true}</Button>);
    const button = screen.getByRole("button");
    const buttonText = button.textContent;
    expect(buttonText).toEqual("true");
  });
  it("should render '' if given an empty string", () => {
    render(<Button>{""}</Button>);
    const button = screen.getByRole("button");
    const buttonText = button.textContent;
    expect(buttonText).toEqual("");
  });
  it("should render '' if given nothing", () => {
    render(<Button></Button>);
    const button = screen.getByRole("button");
    const buttonText = button.textContent;
    expect(buttonText).toEqual("");
  });
  it("should render 'error' if given null", () => {
    render(<Button>{null}</Button>);
    const button = screen.getByRole("button");
    const buttonText = button.textContent;
    expect(buttonText).toEqual("Error");
  });
  it("should render 'error' if given something else", () => {
    render(<Button>{[]}</Button>);
    const button = screen.getByRole("button");
    const buttonText = button.textContent;
    expect(buttonText).toEqual("Error");
  });
  it("should be disabled if the disabled prop is true", () => {
    render(<Button disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
  it("should be enabled if the disabled prop is not passed", () => {
    render(<Button />);
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });
  it("should be enabled if the disabled prop is not a boolean", () => {
    render(<Button disabled="true" />);
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });
  it("should enabled if the disabled prop is false", () => {
    render(<Button disabled={false} />); 
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });
  it("should be disabled if there is an error", () => {
    render(<Button>{[]}</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
