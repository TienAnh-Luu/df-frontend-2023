export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  data: {
    id: number
    email: string
    accessToken: string
  }
}

export interface Metadata {
  page: number
  pageSize: number
  totalPages: number
  totalRecords: number
}

export interface BaseListResponse<T> {
  data: T[]
  metadata: Metadata
}

export interface Topic {
  id: number
  name: string
  code: string
}

export interface Book {
  id: number
  name: string
  author: string
  topic: Topic
}

export interface BookRequest {
  name: string
  author: string
  topicId: number
}

export interface BookResponse {
  data: Book
}

export interface TopicResponse {
  data: Topic[]
}
