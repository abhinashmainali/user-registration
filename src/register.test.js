import React from "react";
import SignUp from "./SignUp";
import { render, fireEvent } from "@testing-library/react";
import { act } from 'react-dom/test-utils'

describe.only("SignUp", () => {
  test("should display correct error message", async () => {
    const { getByTestId, findAllByText } = render(<SignUp />);

    fireEvent.click(getByTestId("submit"));
    await findAllByText('This field is required')
  });

  test('should validate form fields', async () => {
    const mockOnSubmit = jest.fn()
    const {getByTestId, findAllByText} = render(<SignUp onSubmit={mockOnSubmit}/>)

    await act(async () => {
      fireEvent.change(getByTestId("firstName"), {target: {value: "test"}})
      fireEvent.change(getByTestId("middleName"), {target: {value: "test"}})
      fireEvent.change(getByTestId("lastName"), {target: {value: "test"}})
      fireEvent.change(getByTestId("email"), {target: {value: "email@test.com"}})
      fireEvent.change(getByTestId("mobileNumber"), {target: {value: "0971555555555"}})
      fireEvent.change(getByTestId("title"), {target: {value: "Mr"}})
      fireEvent.change(getByTestId("dob"), {target: {value: "2021-05-21"}})
      fireEvent.change(getByTestId("password"), {target: {value: "1234567"}})
      fireEvent.change(getByTestId("confirmPassword"), {target: {value: "1234567"}})
      fireEvent.change(getByTestId("acceptTerms"), {target: {value: true}})
    })

    await act(async () => {
      fireEvent.click(getByTestId("submit"))
    })

    expect(await findAllByText('This field is required')).toHaveLength(2)
    expect(mockOnSubmit).not.toBeCalled()
  })
  
  describe("with invalid email", () => {
    it("renders the email validation error", async () => {
      const {getByTestId, findByText} = render(<SignUp />)

      await act(async () => {
        const emailInput = getByTestId("email")
        fireEvent.change(emailInput, {target: {value: "invalid email"}})
        fireEvent.blur(emailInput)
      })

      await findByText('Invalid email address')
    })
  })

  describe("with valid dob and invalid restriction", () => {
    it("renders the dob validation error", async () => {
      const {getByTestId, findByText} = render(<SignUp />)

      await act(async () => {
        const dobInput = getByTestId("dob")
        fireEvent.change(dobInput, {target: {value: "2020-06-11"}})
        fireEvent.blur(dobInput)
      })

      await findByText('Age is restricted')
    })
  })

  describe("with invalid password", () => {
    it("renders the password validation error", async () => {
      const {getByTestId, findByText} = render(<SignUp />)

      await act(async () => {
        const paswordInput = getByTestId("password")
        fireEvent.change(paswordInput, {target: {value: "123"}})
        fireEvent.blur(paswordInput)
      })

      await findByText('Must be at least 6 characters')

    })
  })
});
