import {
  BookRequest,
  BaseListResponse,
  Book,
  LoginRequest,
  LoginResponse,
  BookResponse,
  TopicResponse,
} from '../app/_types/schema.types'
import fetcher from './fetcher'

// eslint-disable-next-line prefer-destructuring
const BASE_URL = 'https://develop-api.bookstore.dwarvesf.com'

class Client {
  headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  privateHeaders: HeadersInit = {
    ...this.headers,
    Authorization:
      typeof window !== 'undefined'
        ? `Bearer ${window.localStorage.getItem('token')}`
        : '',
  }

  // eslint-disable-next-line class-methods-use-this
  login(params: LoginRequest) {
    return fetcher<LoginResponse>(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  getBooks() {
    return fetcher<BaseListResponse<Book>>(`${BASE_URL}/api/v1/books`, {
      headers: this.privateHeaders,
    })
  }

  getTopics() {
    return fetcher<TopicResponse>(`${BASE_URL}/api/v1/topics`, {
      headers: this.privateHeaders,
    })
  }

  addBook(params: BookRequest) {
    return fetcher<BookResponse>(`${BASE_URL}/api/v1/books`, {
      method: 'POST',
      headers: this.privateHeaders,
      body: JSON.stringify(params),
    })
  }

  updateBook(id: number, updatedBook: BookRequest) {
    return fetcher<BookResponse>(`${BASE_URL}/api/v1/books/${id}`, {
      method: 'PUT',
      headers: this.privateHeaders,
      body: JSON.stringify(updatedBook),
    })
  }

  deleteBook(id: number) {
    return fetcher<{ data: { message: string } }>(
      `${BASE_URL}/api/v1/books/${id}`,
      {
        method: 'DELETE',
        headers: this.privateHeaders,
      },
    )
  }

  getBookDetail(id: number) {
    return fetcher<BookResponse>(`${BASE_URL}/api/v1/books/${id}`, {
      headers: this.privateHeaders,
    })
  }
}

const client = new Client()

export { client }
