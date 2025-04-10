import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

// ✅ Mocks first
vi.mock('../utility/crudUtility', () => ({
  readCategories: (cb) => cb([{ id: 'cat1', nev: 'Category 1', color: '#ff0000' }]),
  readAuthorization: (cb) => cb(['admin-user-id']),
  readRaces: (cb) => cb([
    {
      id: 'race1',
      palya: 'Track 1',
      kategoria: 'cat1',
      imageUrl: { url: 'https://example.com/image.jpg', id: 'img1' },
      idopont: { seconds: Math.floor(Date.now() / 1000) + 86400, nanoseconds: 0 }
    }
  ]),
  deleteFutam: vi.fn(),
}))

vi.mock('../utility/backendHandling', () => ({
  deletePhoto: vi.fn()
}))

vi.mock('../context/userContext', () => ({
  UserContext: React.createContext({ user: { uid: 'admin-user-id' } })
}))

vi.mock('../components/AddEditRace', () => ({
  default: () => <div data-testid="add-new-component" />
}))

vi.mock('../components/Details', () => ({
  default: () => <div data-testid="details-component" />
}))

vi.mock('../components/Alerts', () => ({
  default: ({ txt }) => <div data-testid="alert">{txt}</div>
}))

vi.mock('../components/Footer', () => ({
  Footer: () => <div data-testid="footer" />
}))

// ✅ Import AFTER mocks
import { Futamok } from '../pages/Futamok'

describe('Futamok Page', () => {
  test('renders header and category button', async () => {
    render(<Futamok />)

    expect(await screen.findByText('Futamok')).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Category 1' })).toBeInTheDocument()
  })

  test('renders race card', async () => {
    render(<Futamok />)

    expect(await screen.findByText(/Track 1/i)).toBeInTheDocument()
    expect(await screen.findByText(/nap múlva/i)).toBeInTheDocument()
    expect(await screen.findByText(/Részletek/i)).toBeInTheDocument()
  })

  test('filters races by selected category', async () => {
    render(<Futamok />)
  
    // Click the category button
    const categoryButton = await screen.findByRole('button', { name: 'Category 1' })
    fireEvent.click(categoryButton)
  
    // Race should still be visible (it's in Category 1)
    expect(await screen.findByText('Track 1')).toBeInTheDocument()
  })

  test('shows admin options for races if user is admin', async () => {
    render(<Futamok />)
  
    // Open admin dropdown

    const dropdownBtn = await screen.findByLabelText('Admin menu')// should match the 3-dot button
    fireEvent.click(dropdownBtn)
  
    // Check for admin menu items
    expect(await screen.findByText('Szerkesztés')).toBeInTheDocument()
    expect(await screen.findByText('Törlés')).toBeInTheDocument()
  })  
})
