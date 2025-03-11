import React from 'react'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
// import '@testing-library/jest-dom'
import PostModal from '@/components/PostModal'
import axios from "axios"

jest.mock("axios")

describe('PostModal', () => {

    it('renders correctly and shows textarea', () => {
        // ARRANGE
        render(<PostModal onClick={() => {}} setCreate={() => {}} />)

        // ASSERT
        expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument()
        
    })

    it('toggles anonymous correctly', async () => {

        // ARRANGE
        const mockOnClick = jest.fn();
        render(<PostModal onClick={mockOnClick} setCreate={() => {}} />)

        // ACT
        await userEvent.click(screen.getByText("Anonymous ON"))

        // ASSERT
        expect(screen.getByText("Anonymous OFF")).toBeInTheDocument()
    })

    it('closes the post-modal correctly', async () => {

        // ARRANGE
        const mockOnClick = jest.fn();
        render(<PostModal onClick={mockOnClick} setCreate={() => {}} />)

        // ACT
        await userEvent.click(screen.getByTestId('x-test'))

        // ASSERT
        expect(mockOnClick).toHaveBeenCalled()

    })

    it('posts correctly', async () => {

        // ARRANGE
        const mockOnClick = jest.fn();
        const mockSetCreate = jest.fn();
        render(<PostModal onClick={mockOnClick} setCreate={mockSetCreate} />)

        axios.post.mockResolvedValue({ data: { success: true } })

        // ACT
        await userEvent.click(screen.getByText("Post"))

        // ASSERT
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3307/Posts/InsertForward',
            {
                UserID: 1,
                Content: '',
                Anonymous: false,
                Username: 'mailyn',
            }
        )
        expect(mockSetCreate).toHaveBeenCalledWith(false)

    })
    
})