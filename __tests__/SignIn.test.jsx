
import React from 'react'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
// import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation'
import SignIn from '@/components/SignIn'
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from "axios"

jest.mock("axios")
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));
jest.mock('lucide-react', () => ({
    Eye: () => <div>Mock Eye Icon</div>,
    EyeOff: () => <div>Mock EyeOff Icon</div>
}));

describe('SignIn', () => {

    it('renders correctly and shows inputs', () => {

        // ARRANGE
        render(
            <GoogleOAuthProvider clientId="338947513955-v2qbsiuud0q0s09ppebq6c22re1qj935.apps.googleusercontent.com">
                <SignIn />
            </GoogleOAuthProvider>
        )

        // ASSERT
        expect(screen.getByPlaceholderText("Enter username here")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Enter password here")).toBeInTheDocument()

    })

    it('toggles password view on and off correctly', async () => {

        // ARRANGE
        const mockOnClick = jest.fn();
        render(
            <GoogleOAuthProvider clientId="338947513955-v2qbsiuud0q0s09ppebq6c22re1qj935.apps.googleusercontent.com">
                <SignIn />
            </GoogleOAuthProvider>
        )

        
        // ACT
        const eye_toggle_button = screen.getByTestId('eye-toggle-test')
        await userEvent.click(eye_toggle_button)
        

        // ASSERT
        expect(eye_toggle_button.innerHTML).toContain('<div>Mock EyeOff Icon</div>')
    })

    it('redirects to home page with correct login', async () => {

        // ARRANGE
        const push = jest.fn();
        useRouter.mockReturnValue({ push })

        axios.post.mockResolvedValue({
            status: 200,
            data: { message: 'Sign-in successful' },
        })

        render(
            <GoogleOAuthProvider clientId="338947513955-v2qbsiuud0q0s09ppebq6c22re1qj935.apps.googleusercontent.com">
                <SignIn />
            </GoogleOAuthProvider>
        )

        // ACT
        const usernameInput = screen.getByPlaceholderText("Enter username here")
        const passwordInput = screen.getByPlaceholderText("Enter password here")
        const signInButton = screen.getByTestId('sign-in-button');

        await userEvent.type(usernameInput, 'testUser')
        await userEvent.type(passwordInput, 'password123')
        await userEvent.click(signInButton)

        // ASSERT
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3307/api/auth/signin', {
                username: 'testUser',
                password: 'password123',
            }
        )

        expect(push).toHaveBeenCalledWith('/home')

    })

    it('shows an alert with incorrect login', async () => {

        // ARRANGE
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})
        
        axios.post.mockRejectedValue({
            response: {
                data: {
                    message: 'User not found',
                },
            },
        })
        
        render(
            <GoogleOAuthProvider clientId="338947513955-v2qbsiuud0q0s09ppebq6c22re1qj935.apps.googleusercontent.com">
                <SignIn />
            </GoogleOAuthProvider>
        )

        // ACT
        const usernameInput = screen.getByPlaceholderText("Enter username here")
        const passwordInput = screen.getByPlaceholderText("Enter password here")
        const signInButton = screen.getByTestId('sign-in-button');

        await userEvent.type(usernameInput, 'test-user')
        await userEvent.type(passwordInput, 'wrong-password')
        await userEvent.click(signInButton)

        // ASSERT
        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3307/api/auth/signin', {
                username: 'test-user',
                password: 'wrong-password',
            }
        )

        expect(mockAlert).toHaveBeenCalledWith("User not found")
        mockAlert.mockRestore()

    })

    it('sends an alert when an input field is empty', async () => {

        // ARRANGE
        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})
        render(
            <GoogleOAuthProvider clientId="338947513955-v2qbsiuud0q0s09ppebq6c22re1qj935.apps.googleusercontent.com">
                <SignIn />
            </GoogleOAuthProvider>
        )

        // ACT
        const usernameInput = screen.getByPlaceholderText("Enter username here")
        const passwordInput = screen.getByPlaceholderText("Enter password here")
        const signInButton = screen.getByTestId('sign-in-button');

        await userEvent.type(usernameInput, 'testUser')
        await userEvent.click(signInButton)

        // ASSERT
        expect(mockAlert).toHaveBeenCalledWith("Please enter both username and password.")
        mockAlert.mockRestore()

    })
    
})