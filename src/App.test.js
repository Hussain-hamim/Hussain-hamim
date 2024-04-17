import { fireEvent, render, screen } from "@testing-library/react";
import FeedbackForm from "./FeedbackForm";

describe("Feedback Form", () => {
  test("User is able to submit the form if the score is lower than 5 and additional feedback is provided", () => {
    const score = "3";
    const comment = "The pizza crust was too thick";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass

    const rangeInput = screen.getByLabelText(/Score/);
    fireEvent.change(rangeInput, { target: { value: score } });

    const textArea = screen.getByLabelText(/Comments/);
    fireEvent.change(textArea, { target: { value: comment } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment,
    });
  });

  test("User is able to submit the form if the score is higher than 5, without additional feedback", () => {
    const score = "9";
    const handleSubmit = jest.fn();
    render(<FeedbackForm onSubmit={handleSubmit} />);

    // You have to write the rest of the test below to make the assertion pass

    const rangeInput = screen.getByLabelText(/Score/);
    fireEvent.change(rangeInput, { target: { value: score } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      score,
      comment: "",
    });
  });
});

// import { fireEvent, render, screen } from "@testing-library/react";
// import FeedbackForm from "./FeedbackForm";

// describe("Feedback Form", () => {
//   test("submission is disabled if score is less then 5 and there is no feedback", () => {
//     const handleSubmit = jest.fn();
//     render(<FeedbackForm onSubmit={handleSubmit} />);

//     const rangeInput = screen.getByLabelText(/Score/);
//     fireEvent.change(rangeInput, { target: { value: "4" } });

//     const submitButton = screen.getByRole("button");
//     fireEvent.click(submitButton);

//     expect(handleSubmit).not.toHaveBeenCalled();
//     expect(submitButton).toHaveAttribute("disabled");
//   });
// });

// The React test code provided uses the `@testing-library/react` for rendering components and interacting with them in a testing environment, as well as `jest` for creating mock functions and asserting test outcomes. The code is focused on testing the functionality of a `FeedbackForm` component to ensure that the form behaves as expected under certain conditions. Let's break down the test step-by-step:

// 1. **Imports**:
//    - `fireEvent`, `render`, `screen`: These are imported from `@testing-library/react`. `render` is used to render the component into a virtual DOM for testing, `screen` is used to query the rendered components, and `fireEvent` is used to simulate user actions like clicking or typing.
//    - `FeedbackForm`: This is the component that is being tested. It's assumed to be a form component that takes user feedback.
//    - `jest.fn()`: This is a Jest function used to create a mock function that can track calls, arguments, and return values.

// 2. **Describe Block**:
//    - The `describe` function is used to group together similar tests. All tests inside the block are related to the "Feedback Form".

// 3. **Test Block**:
//    - `test` is a Jest function that defines an individual test case. The description of the test case explains what is being tested: "submission is disabled if score is less than 5 and there is no feedback".

// 4. **Test Setup**:
//    - `handleSubmit` is defined as a mock function using `jest.fn()`. This allows the test to check if this function gets called during form submission.
//    - The `FeedbackForm` component is rendered using `render(<FeedbackForm onSubmit={handleSubmit} />)`. The `onSubmit` prop is passed the mock function `handleSubmit`.

// 5. **Interactions**:
//    - The test finds a range input element by its accessible label, which is expected to contain "Score". This is done using `screen.getByLabelText(/Score/)`.
//    - `fireEvent.change` is used to change the value of the score input to "4". This simulates a user action where the score is set below 5.
//    - The submit button is queried using `screen.getByRole("button")`, which fetches the button element intended for form submission.
//    - `fireEvent.click` simulates a click event on the submit button.

// 6. **Assertions**:
//    - `expect(handleSubmit).not.toHaveBeenCalled()`: This checks that the `handleSubmit` function has not been called, expecting the form not to submit when the conditions are not met (score less than 5 and no feedback text).
//    - `expect(submitButton).toHaveAttribute("disabled")`: This asserts that the submit button should be disabled under the conditions tested. However, this assertion might fail depending on how the `FeedbackForm` is implemented because the actual disabling logic needs to be handled in the component itself (the test does not automatically ensure the button is disabled unless the component's logic does so).

// Overall, this test ensures that the form submission is correctly restricted under specified conditions, providing a safeguard to ensure that users cannot submit insufficient feedback.
