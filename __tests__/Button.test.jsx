import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Button from '../src/components/Button'

test("Renders title", () => {
    // ARRANGE
    render(<Button title="Test Title"></Button>)

    // ASSERT
    expect(screen.getByText("Test Title")).toBeInTheDocument()
})

test("It clicks", async () => {
    // ARRANGE
    const mockOnClick = jest.fn();
    render(<Button title="Test Title" onClick={mockOnClick}></Button>)

    // ACT
    await userEvent.click(screen.getByText("Test Title"))

    // ASSERT
    expect(mockOnClick).toHaveBeenCalled()
})