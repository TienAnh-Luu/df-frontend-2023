import { Book, BookRequest } from './schema.types'

export interface TableDataType {
  key: React.Key
  '#': number
  name: string
  author: string
  topic: string
  action: string
}

export interface MyTableProps {
  handleDeleteBook: (id: number) => void
  books: Book[]
  setBookToFetch: (book: BookRequest) => void
  setBookIdToFetch: (id: number) => void
  setOpenEditBookModal: (value: boolean) => void
  booksFiltered: Book[]
  isLoading: boolean
}
