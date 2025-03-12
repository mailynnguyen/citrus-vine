import React from 'react'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
// import '@testing-library/jest-dom'
import SignIn from '@/components/SignIn'
import axios from "axios"

jest.mock("axios")
jest.mock('next/router', () => require('__mocks__/next-router'));


describe('SignIn', () => {

    it('renders correctly and shows inputs', () => {
        // ARRANGE
        render(<SignIn />)

        // ASSERT
        expect(screen.getByPlaceholderText("Enter username here")).toBeInTheDocument()
        
    })

    // it('toggles anonymous correctly', async () => {

    //     // ARRANGE
    //     const mockOnClick = jest.fn();
    //     render(<PostModal onClick={mockOnClick} setCreate={() => {}} />)

    //     // ACT
    //     await userEvent.click(screen.getByText("Anonymous ON"))

    //     // ASSERT
    //     expect(screen.getByText("Anonymous OFF")).toBeInTheDocument()
    // })

    // it('closes the post-modal correctly', async () => {

    //     // ARRANGE
    //     const mockOnClick = jest.fn();
    //     render(<PostModal onClick={mockOnClick} setCreate={() => {}} />)

    //     // ACT
    //     await userEvent.click(screen.getByTestId('x-test'))

    //     // ASSERT
    //     expect(mockOnClick).toHaveBeenCalled()

    // })

    // it('posts correctly', async () => {

    //     // ARRANGE
    //     const mockOnClick = jest.fn();
    //     const mockSetCreate = jest.fn();
    //     render(<PostModal onClick={mockOnClick} setCreate={mockSetCreate} />)

    //     axios.post.mockResolvedValue({ data: { success: true } })

    //     // ACT
    //     await userEvent.click(screen.getByText("Post"))

    //     // ASSERT
    //     expect(axios.post).toHaveBeenCalledWith(
    //         'http://localhost:3307/Posts/InsertForward',
    //         {
    //             UserID: 1,
    //             Content: '',
    //             Anonymous: false,
    //             Username: 'mailyn',
    //         }
    //     )
    //     expect(mockSetCreate).toHaveBeenCalledWith(false)

    // })
    
})