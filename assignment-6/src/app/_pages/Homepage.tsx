'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Button, Space, Input, message } from 'antd'
import { BiSearchAlt2 } from 'react-icons/bi'
import BookModal from '../_components/BookModal'
import MyTable from '../_components/Table'
import { emptyBookRequest } from '../_utils/constants'
import { client } from '../../lib/api'
import { Book, BookRequest } from '../_types/schema.types'
import { useTheme } from '../_context/ThemeContext'

const Homepage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { isDarkMode } = useTheme()

  // value of the search input field
  const [searchValue, setSearchValue] = useState('')

  // for search purpose
  const [booksFiltered, setBooksFiltered] = useState<Book[]>([])

  const [openAddBookModal, setOpenAddBookModal] = useState(false)
  const [openEditBookModal, setOpenEditBookModal] = useState(false)
  const [shouldFetchAddBook, setShouldFetchAddBook] = useState(false)
  const [shouldFetchUpdateBook, setShouldFetchUpdateBook] = useState(false)
  const [books, setBooks] = useState<Book[]>([])
  const [bookToFetch, setBookToFetch] = useState<BookRequest>(emptyBookRequest)
  const [bookIdToFetch, setBookIdToFetch] = useState(-1)

  const {
    data: bookData,
    error,
    isLoading,
  } = useSWR('fetch-book', () => client.getBooks())

  const { data: topics, error: getTopicsError } = useSWR('fetch-topics', () =>
    client.getTopics(),
  )

  const {
    data: newBookAddedData,
    error: addBookError,
    isLoading: isAddingBook,
  } = useSWR(shouldFetchAddBook ? 'fetch-add-book' : null, () =>
    client.addBook(bookToFetch),
  )

  const {
    data: newBookUpdatedData,
    error: updateBookError,
    isLoading: isUpdatingBook,
  } = useSWR(shouldFetchUpdateBook ? 'fetch-update-book' : null, () =>
    client.updateBook(bookIdToFetch, bookToFetch),
  )

  useEffect(() => {
    const dat = bookData?.data || []
    setBooks(dat)
    setBooksFiltered(dat)
  }, [bookData])

  useEffect(() => {
    if (
      error?.message ||
      getTopicsError?.message ||
      addBookError?.message ||
      updateBookError?.message
    ) {
      const content =
        error?.message ||
        getTopicsError?.message ||
        addBookError?.message ||
        updateBookError?.message ||
        'Unknown error'

      messageApi.open({
        type: 'error',
        content,
      })
    }
  }, [error, getTopicsError, addBookError, updateBookError, messageApi])

  const handleCloseAddBookModal = (): void => {
    setOpenAddBookModal(false)
  }

  const handleCloseEditBookModal = (): void => {
    setOpenEditBookModal(false)
  }

  const handleAddBook = (newBook: BookRequest & { id: number }): void => {
    const { name, author, topicId } = newBook
    if (name && author && !shouldFetchAddBook) {
      setBookToFetch({
        name,
        author,
        topicId,
      })
      setShouldFetchAddBook(true)
      // if fetching is done
      if (
        newBookAddedData &&
        newBookAddedData?.data.name === name &&
        newBookAddedData?.data.author === author
      ) {
        const newBooks = [...books, newBookAddedData.data]
        setShouldFetchAddBook(false)
        setSearchValue('')
        setBooks(newBooks)
        setBooksFiltered(newBooks)
        setBookToFetch(emptyBookRequest)
        handleSuccessMessage('Create')
        handleCloseAddBookModal()
      }
    }
  }

  const handleEditBook = (newBook: BookRequest & { id: number }): void => {
    const { id, name, author, topicId } = newBook
    if (
      id !== -1 &&
      name &&
      author &&
      topicId !== -1 &&
      !shouldFetchUpdateBook
    ) {
      setBookToFetch({ name, author, topicId })
      setBookIdToFetch(id)
      setShouldFetchUpdateBook(true)
      // if fetching is done
      if (newBookUpdatedData && newBookUpdatedData?.data.id === id) {
        const newBooks = books.map((book) => {
          if (book.id === id) {
            return newBookUpdatedData?.data
          }
          return book
        })
        setShouldFetchUpdateBook(false)
        setBooks(newBooks)
        setBooksFiltered(newBooks)
        setBookIdToFetch(-1)
        setBookToFetch(emptyBookRequest)
        handleSuccessMessage('Edit')
        handleCloseEditBookModal()
      }
    }
  }

  const handleDeleteBook = (id: number): void => {
    const newBooks = books.filter((book) => book.id !== id)
    setBooks(newBooks)
    localStorage.setItem('books', JSON.stringify(newBooks))
    setBooksFiltered(newBooks)
    setSearchValue('')
  }

  const handleSuccessMessage = (action: 'Create' | 'Delete' | 'Edit'): void => {
    messageApi.open({
      type: 'success',
      content: `${action} success`,
    })
  }

  const handleSearch = (value: string): void => {
    setSearchValue(value)
    let reg = /\[]/gi
    try {
      reg = new RegExp(value, 'gi')
    } catch (error) {
      console.log(error)
    }

    const search = books.filter((book) => book.name.search(reg) > -1)
    setBooksFiltered(search)
  }

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 45.09px)',
        backgroundColor: isDarkMode ? 'rgb(36,37,38)' : 'white',
      }}
    >
      {contextHolder}
      <Space.Compact
        direction="vertical"
        style={{
          width: '100%',
          padding: '30px 15px 0 15px',
          backgroundColor: isDarkMode ? 'rgb(36,37,38)' : 'white',
        }}
      >
        <Space
          style={{
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <Input
            placeholder="Search books"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            addonAfter={<BiSearchAlt2 />}
          />
          <Button
            type="primary"
            danger
            onClick={() => {
              setOpenAddBookModal(true)
            }}
          >
            Add book
          </Button>
        </Space>
        <MyTable
          books={books}
          booksFiltered={booksFiltered}
          handleDeleteBook={handleDeleteBook}
          setBookToFetch={setBookToFetch}
          setBookIdToFetch={setBookIdToFetch}
          setOpenEditBookModal={setOpenEditBookModal}
          isLoading={isLoading}
        />
      </Space.Compact>
      <BookModal
        topics={topics?.data || []}
        defaultValues={emptyBookRequest}
        idToFetch={bookIdToFetch}
        handleOK={handleAddBook}
        isLoading={isAddingBook}
        handleCloseModal={handleCloseAddBookModal}
        openModal={openAddBookModal}
      />
      <BookModal
        topics={topics?.data || []}
        defaultValues={bookToFetch}
        idToFetch={bookIdToFetch}
        handleOK={handleEditBook}
        isLoading={isUpdatingBook}
        handleCloseModal={handleCloseEditBookModal}
        openModal={openEditBookModal}
      />
    </div>
  )
}

export default Homepage
