import { BookRequest, Topic } from './schema.types'

export interface BookModalProps {
  topics: Topic[]
  openModal: boolean
  defaultValues: BookRequest
  idToFetch: number
  handleOK: (value: BookRequest & { id: number }) => void
  isLoading: boolean
  handleCloseModal: () => void
}
