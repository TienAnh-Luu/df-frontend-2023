import { Book } from './schema.types'

export interface BookDetailProps {
  book: Book
  handleOpenDeleteModal: (book: Book) => void
}
