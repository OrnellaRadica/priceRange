import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Range } from "./Range";
import { findClosestStep } from "./Dot";

describe("Range component in excercise 1", () => {

  window.HTMLElement.prototype.getBoundingClientRect = () =>
  ({
    x: 309,
    y: 130.5,
    width: 320,
    height: 3,
    top: 130.5,
    right: 629,
    bottom: 133.5,
    left: 309,
  } as DOMRect);

  it("Moves left dot", async () => {
    const minValue = 10;
    const maxValue = 240;
    render(<Range min={minValue} max={maxValue} />);

    const dotLeft = screen.getByTestId("left-dot");
    await waitFor(() => {
      fireEvent.pointerDown(dotLeft);
      fireEvent.mouseMove(window, { clientX: 337 });
      fireEvent.pointerUp(dotLeft);
    });

    const inputLeft = screen.getByTestId("input-left");
    expect(inputLeft).toHaveValue(20);

    fireEvent.pointerDown(dotLeft);
    fireEvent.mouseMove(window, { clientX: 517 });
    fireEvent.pointerUp(dotLeft);

    expect(inputLeft).toHaveValue(150);

  });

  it("Moves right dot", async () => {
    const minValue = 10;
    const maxValue = 240;
    render(<Range min={minValue} max={maxValue} />);

    const dotRight = screen.getByTestId("right-dot");
    await waitFor(() => {
      fireEvent.pointerDown(dotRight);
      fireEvent.mouseMove(window, { clientX: 548 });
      fireEvent.pointerUp(dotRight);
    });

    const inputRight = screen.getByTestId("input-right");
    expect(inputRight).toHaveValue(172);

    fireEvent.pointerDown(dotRight);
    fireEvent.mouseMove(window, { clientX: 420 });
    fireEvent.pointerUp(dotRight);

    expect(inputRight).toHaveValue(80);
  });

  it("Updates value when input left is changed and moves left dot", async () => {
    const minValue = 10;
    const maxValue = 240;
    render(<Range min={minValue} max={maxValue} />);

    const inputLeft = screen.getByTestId("input-left");
    fireEvent.change(inputLeft, { target: { value: "56" } });
    expect(inputLeft).toHaveValue(56);

    const dotLeft = screen.getByTestId("left-dot");
    const expectedPosition = "calc(20% - 8px)"
    expect(dotLeft).toHaveStyle(`left: ${expectedPosition}`);
  });

  it("Updates value when input right is changed and moves rigth dot", async () => {
    const minValue = 10;
    const maxValue = 240;
    render(<Range min={minValue} max={maxValue} />);

    const inputRight = screen.getByTestId("input-right");
    fireEvent.change(inputRight, { target: { value: "125" } });
    expect(inputRight).toHaveValue(125);

    const dotRight = screen.getByTestId("right-dot");
    const expectedPosition = "calc(50% - 8px)"
    expect(dotRight).toHaveStyle(`left: ${expectedPosition}`);
  });

  it("Updates value when input left and right are changed", () => {
    const minValue = 10;
    const maxValue = 100;
    render(<Range min={minValue} max={maxValue} />);

    const inputLeft = screen.getByTestId("input-left");
    const inputRight = screen.getByTestId("input-right");
    fireEvent.change(inputLeft, { target: { value: "50" } });
    fireEvent.change(inputRight, { target: { value: "80.99" } });
    expect(inputLeft).toHaveValue(50);
    expect(inputRight).toHaveValue(80.99);
  });

  it("Displays error message when min value input is smaller than minValue", async () => {
    const minValue = 10;
    const maxValue = 100;
    render(<Range min={minValue} max={maxValue} />);
    const inputLeft = screen.getByTestId("input-left");

    fireEvent.change(inputLeft, { target: { value: "5" } });

    const errorMessage = await screen.findByText(
      new RegExp(`Min price must be bigger than ${minValue}`)
    );
    expect(errorMessage).toBeInTheDocument();

    const dotLeft = screen.getByTestId("left-dot");
    expect(dotLeft).toHaveStyle("left: calc(0% - 8px)");

    const dotRight = screen.getByTestId("right-dot");
    expect(dotRight).toHaveStyle("left: calc(100% - 8px)");
  });

  it("Displays error message when max value input is bigger than maxValue", async () => {
    const minValue = 10;
    const maxValue = 100;
    render(<Range min={minValue} max={maxValue} />);
    const inputRight = screen.getByTestId("input-right");

    fireEvent.change(inputRight, { target: { value: "120" } });

    const errorMessage = await screen.findByText(
      new RegExp(
        `Max price must be bigger than 10 € and smaller than ${maxValue}`
      )
    );
    expect(errorMessage).toBeInTheDocument();

    const dotLeft = screen.getByTestId("left-dot");
    expect(dotLeft).toHaveStyle("left: calc(0% - 8px)");

    const dotRight = screen.getByTestId("right-dot");
    expect(dotRight).toHaveStyle("left: calc(100% - 8px)");
  });

  it("Displays error message when min value input is smaller than minValue and max input value is bigger than maxValue", async () => {
    const minValue = 10;
    const maxValue = 100;
    render(<Range min={minValue} max={maxValue} />);

    const inputLeft = screen.getByTestId("input-left");
    const inputRight = screen.getByTestId("input-right");

    fireEvent.change(inputLeft, { target: { value: "5" } });
    fireEvent.change(inputRight, { target: { value: "120" } });

    const errorMessage = await screen.findByText(/Price range must be between/);
    expect(errorMessage).toBeInTheDocument();

    const dotLeft = screen.getByTestId("left-dot");
    expect(dotLeft).toHaveStyle("left: calc(0% - 8px)");

    const dotRight = screen.getByTestId("right-dot");
    expect(dotRight).toHaveStyle("left: calc(100% - 8px)");
  });

  it("Displays error message when min value input is bigger than max value input", async () => {
    const minValue = 10;
    const maxValue = 100;
    render(<Range min={minValue} max={maxValue} />);

    const inputLeft = screen.getByTestId("input-left") as HTMLInputElement;
    const inputRight = screen.getByTestId("input-right") as HTMLInputElement;

    fireEvent.change(inputRight, { target: { value: "60" } });
    fireEvent.change(inputLeft, { target: { value: "80" } });

    const errorMessage = await screen.findByText(
      new RegExp(
        `Min price must be bigger than ${minValue} € and smaller than ${inputRight.value} €`
      )
    );
    expect(errorMessage).toBeInTheDocument();

    const dotLeft = screen.getByTestId("left-dot");
    expect(dotLeft).toHaveStyle("left: calc(0% - 8px)");

    const dotRight = screen.getByTestId("right-dot");
    expect(dotRight).toHaveStyle("left: calc(55.55555555555556% - 8px)");
  });
});

describe("Range component in excercise 2 (steps)", () => {
  window.HTMLElement.prototype.getBoundingClientRect = () =>
    ({
      x: 309,
      y: 130.5,
      width: 320,
      height: 3,
      top: 130.5,
      right: 629,
      bottom: 133.5,
      left: 309,
    } as DOMRect);

    it("Finds the closest step correctly", () => {
      const steps = [0, 8, 20.99, 30, 40];
      expect(findClosestStep(15, steps, 0, 40, "left")).toBe(20.99);
      expect(findClosestStep(32, steps, 0, 40, "right")).toBe(30);
    });

    it("snaps to the closest step when left dot is dragged and displays step values", async () => {
      const steps = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];
  
      render(<Range steps={steps} />);
  
      const dotLeft = screen.getByTestId("left-dot");
      await waitFor(() => {
        fireEvent.pointerDown(dotLeft);
        fireEvent.mouseMove(window, { clientX: 351 });
        fireEvent.pointerUp(dotLeft);
      });
  
      expect(screen.getByTestId("price-left")).toHaveTextContent("10.99");
  
      fireEvent.pointerDown(dotLeft);
      fireEvent.mouseMove(window, { clientX: 472 });
      fireEvent.pointerUp(dotLeft);
  
      expect(screen.getByTestId("price-left")).toHaveTextContent("30.99");
    });

  it("snaps to the closest step when right dot is dragged and displays step values", async () => {
    const steps = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

    render(<Range steps={steps} />);

    const dotRight = screen.getByTestId("right-dot");
    await waitFor(() => {
      fireEvent.pointerDown(dotRight);
      fireEvent.mouseMove(window, { clientX: 556 });
      fireEvent.pointerUp(dotRight);
    });

    expect(screen.getByTestId("price-right")).toHaveTextContent("50.99");

    fireEvent.pointerDown(dotRight);
    fireEvent.mouseMove(window, { clientX: 470 });
    fireEvent.pointerUp(dotRight);

    expect(screen.getByTestId("price-right")).toHaveTextContent("30.99");
  });


  it("Moves left dot without collapsing elements", async () => {
    const steps = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

    render(<Range steps={steps} />);

    const dotRight = screen.getByTestId("right-dot");
    await waitFor(() => {
      fireEvent.pointerDown(dotRight);
      fireEvent.mouseMove(window, { clientX: 470 });
      fireEvent.pointerUp(dotRight);
    });

    expect(screen.getByTestId("price-right")).toHaveTextContent("30.99");

    const dotLeft = screen.getByTestId("left-dot");
      await waitFor(() => {
        fireEvent.pointerDown(dotLeft);
        fireEvent.mouseMove(window, { clientX: 580 });
        fireEvent.pointerUp(dotLeft);
      });
  
      expect(screen.getByTestId("price-left")).toHaveTextContent("10.99");
  
  });

  it("Moves right dot without collapsing elements", async () => {
    const steps = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];

    render(<Range steps={steps} />);

    const dotLeft = screen.getByTestId("left-dot");
      await waitFor(() => {
        fireEvent.pointerDown(dotLeft);
        fireEvent.mouseMove(window, { clientX: 472 });
        fireEvent.pointerUp(dotLeft);
      });
  
      expect(screen.getByTestId("price-left")).toHaveTextContent("30.99");
    

    const dotRight = screen.getByTestId("right-dot");
    await waitFor(() => {
      fireEvent.pointerDown(dotRight);
      fireEvent.mouseMove(window, { clientX: 345 });
      fireEvent.pointerUp(dotRight);
    });

    expect(screen.getByTestId("price-right")).toHaveTextContent("50.99");
  });
});
