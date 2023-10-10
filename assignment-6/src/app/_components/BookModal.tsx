import { useEffect } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { BookModalProps } from '../_types/BookModal.types'
import { BookRequest } from '../_types/schema.types'
// import { BookRequest } from '../_types/schema.types'

const BookModal = ({
  topics,
  openModal,
  defaultValues,
  idToFetch,
  isLoading,
  handleOK,
  handleCloseModal,
}: BookModalProps) => {
  const [form] = Form.useForm()

  const initialValues = idToFetch === -1 ? { topicId: 1 } : defaultValues

  console.log(initialValues)

  useEffect(() => {
    form.setFieldsValue(defaultValues)
  }, [form, defaultValues])

  const okText = idToFetch === -1 ? 'Create' : 'Edit'

  console.log(defaultValues)

  return (
    <Modal
      title={`${okText} book`}
      open={openModal}
      confirmLoading={isLoading}
      okText={okText}
      cancelText="Cancel"
      onOk={() => {
        form
          .validateFields()
          .then((values: BookRequest) => {
            form.resetFields()
            handleOK({ ...values, id: idToFetch })
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
      onCancel={handleCloseModal}
    >
      <Form
        // key={defaultValues.id}
        form={form}
        layout="vertical"
        name="book-form"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please fill the book name!' },
            {
              min: 5,
              message: 'Book name should contain at least 5 characters',
            },
          ]}
        >
          <Input placeholder="Book name" />
        </Form.Item>
        <Form.Item
          name="author"
          label="Author"
          rules={[
            { required: true, message: 'Please input the author of book!' },
            {
              pattern: /^[a-zA-Z\s]*$/,
              message: 'Author name should only contain letters and spaces',
            },
          ]}
        >
          <Input placeholder="Book author" />
        </Form.Item>
        <Form.Item
          name="topicId"
          label="Topic"
          rules={[{ required: true, message: 'Please choose a topic!' }]}
        >
          <Select
            value={1}
            options={topics.map((topic) => {
              return { value: topic.id, label: topic.name }
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default BookModal
