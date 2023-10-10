import { Book, BookRequest } from '../_types/schema.types'

export const emptyBook: Book = {
  id: -1,
  name: '',
  author: '',
  topic: {
    id: 1,
    code: '',
    name: 'Programming',
  },
}

export const emptyBookRequest: BookRequest = {
  name: '',
  author: '',
  topicId: 1,
}

// export const BASE_URL = 'https://develop-api.bookstore.dwarvesf.com/api/v1'
