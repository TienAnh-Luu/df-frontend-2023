import { Table, Space, Popconfirm, Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { TableDataType, MyTableProps } from '../_types/Table.types'
import { emptyBookRequest } from '../_utils/constants'
import { BookRequest } from '../_types/schema.types'

const MyTable = ({
  handleDeleteBook,
  books,
  setBookToFetch,
  setBookIdToFetch,
  setOpenEditBookModal,
  booksFiltered,
  isLoading,
}: MyTableProps) => {
  const tableColumns: ColumnsType<TableDataType> = [
    {
      title: '#',
      dataIndex: '#',
      key: '#',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      key: 'topic',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Delete book"
            description="Are you sure to delete this book?"
            onConfirm={() => handleDeleteBook(record['#'])}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger>
              Delete
            </Button>
          </Popconfirm>
          |{' '}
          <Button type="link" href={`/${record['#']}`}>
            View
          </Button>
          |{' '}
          <Button
            type="text"
            onClick={() => {
              const findBook = books.find(
                (book) => book.id === Number(record['#']),
              )

              const bookToEdit: BookRequest = findBook
                ? {
                    name: findBook.name,
                    author: findBook.author,
                    topicId: findBook.topic.id,
                  }
                : emptyBookRequest

              setBookToFetch(bookToEdit)
              setBookIdToFetch(Number(record['#']))
              setOpenEditBookModal(true)
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ]

  const tableData: TableDataType[] = booksFiltered.map(
    ({ id, name, author, topic }) => {
      return {
        key: id,
        '#': id,
        name,
        author,
        topic: topic.name,
        action: '',
      }
    },
  )

  return (
    <Table
      dataSource={tableData}
      columns={tableColumns}
      bordered
      pagination={{ defaultPageSize: 4 }}
      loading={isLoading}
    />
  )
}

export default MyTable
