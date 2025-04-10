import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SearchForums } from '../pages/SearchForums'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import * as crudUtility from '../utility/crudUtility'

const mockPosts = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is a test post about cars.',
    letrehozas: {
      toDate: () => new Date('2024-01-01'),
    },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'Another random topic about books.',
    letrehozas: {
      toDate: () => new Date('2024-02-15'),
    },
  },
]

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  }
})

vi.mock('../utility/crudUtility', () => ({
  readPosts: vi.fn(),
}))

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>)


describe('Search Page', () => {
    test('renders the search input and header', async () => {
    crudUtility.readPosts.mockImplementation((set) => set(mockPosts))
    renderWithRouter(<SearchForums />)
  
    expect(await screen.findByPlaceholderText(/Mire szeretnél rá keresni/i)).toBeInTheDocument()
    expect(screen.getByText(/Beszélgetések keresése/i)).toBeInTheDocument()
  })
  
  test('filters posts based on search input', async () => {
    crudUtility.readPosts.mockImplementation((set) => set(mockPosts))
    renderWithRouter(<SearchForums />)
  
    const input = await screen.findByPlaceholderText(/Mire szeretnél rá keresni/i)
    fireEvent.change(input, { target: { value: 'cars' } })
  
    await waitFor(() => {
      expect(screen.getByText(/First Post/i)).toBeInTheDocument()
      expect(screen.queryByText(/Second Post/i)).not.toBeInTheDocument()
    })
  })
  
  test('displays all posts when search is empty', async () => {
    crudUtility.readPosts.mockImplementation((set) => set(mockPosts))
    renderWithRouter(<SearchForums />)
  
    expect(await screen.findByText(/First Post/i)).toBeInTheDocument()
    expect(screen.getByText(/Second Post/i)).toBeInTheDocument()
  })
})