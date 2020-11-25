import './App.css'
import tinytime from 'tinytime'
import { Button, Input, Loading, Modal, Row, Select, Spacer, Table, Text, useToasts } from '@geist-ui/react'
import { queryCache, useMutation, useQuery } from 'react-query'
import { checkServer, getAllData, removeData, updateData } from './lib/api'
import { AddBookModal, AddAuthorModal } from './components/home'
import { useEffect, useState } from 'react'

const Home = () => {
  const [updateModal, setUpdateModal] = useState(false)
  const [title, setTitle] = useState('')
  const [publishDate, setPublishDate] = useState('')
  const [authorId, setAuthorId] = useState(0)
  const [bookId, setBookId] = useState(0)

  const authorData = queryCache.getQueryData('getAllAuthors')
  const { data, isLoading } = useQuery('getAllData', getAllData)
  const [updateMutate, { status }] = useMutation(updateData)
  const [deleteMutate] = useMutation(removeData)

  const [, setToast] = useToasts()

  const publishDateFormatted = tinytime('{DD}-{MM}-{YYYY}')

  useEffect(() => {
    ;(async () => {
      const res = await checkServer()
      if (!res) {
        setToast({ delay: 1000 * 10, text: 'Server not connected!', type: 'error' })
      }
    })()
  }, [])

  const remove = async id => {
    try {
      const res = await deleteMutate({ id })
      setToast({ delay: 3000, text: res.msg, type: 'success' })
    } catch (err) {
      console.error(err)
    } finally {
      queryCache.invalidateQueries('getAllData')
    }
  }

  const update = id => {
    // get data by id
    const bookData = data.find(book => book.id === id)
    const date = tinytime('{YYYY}-{Mo}-{DD}')
    setTitle(bookData.title)
    setPublishDate(date.render(new Date(bookData.publish_date)))
    setAuthorId(`${bookData.author_id}`)
    setUpdateModal(true)
    setBookId(id)
  }

  const updateBook = async e => {
    e.preventDefault()
    try {
      const res = await updateMutate({ authorId, id: bookId, publishDate, title })
      setUpdateModal(false)
      setToast({ delay: 3000, text: res.msg, type: 'success' })
    } catch (err) {
      console.error(err)
    } finally {
      queryCache.invalidateQueries('getAllData')
    }
  }

  const operation = (actions, rowData) => {
    return (
      <>
        <Button auto size="mini" type="error" onClick={() => remove(rowData.rowValue.id)}>
          Delete
        </Button>
        <Spacer x={0.2} inline />
        <Button auto size="mini" type="warning" onClick={() => update(rowData.rowValue.id)}>
          Update
        </Button>
      </>
    )
  }

  const newData =
    data &&
    data.map(({ title, publish_date, name, id }) => ({
      title,
      id,
      publish_date: publishDateFormatted.render(new Date(publish_date)),
      name,
      operation
    }))

  return (
    <>
      <AddBookModal />
      <Spacer x={1} inline />
      <AddAuthorModal />

      {isLoading && (
        <Row style={{ padding: '10px 0' }}>
          <Loading>Loading</Loading>
        </Row>
      )}

      <Spacer y={2} />
      <Text h3>Daftar buku dan penulisnya</Text>
      <Table data={newData}>
        <Table.Column prop="title" label="Title" />
        <Table.Column prop="publish_date" label="Date published" />
        <Table.Column prop="name" label="Author" />
        <Table.Column prop="operation" label="Operations" width={150} />
      </Table>

      {/* UPDATE MODAL */}
      <Modal open={updateModal} onClose={() => setUpdateModal(false)}>
        <Modal.Title>Update buku</Modal.Title>
        <Modal.Content>
          <form onSubmit={updateBook}>
            <Input
              required
              clearable
              label="Title"
              placeholder="e.g Meraih Bintang"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Spacer y={0.5} />
            <Input
              required
              type="date"
              label="Publish date"
              value={publishDate}
              onChange={e => setPublishDate(e.target.value)}
            />
            <Spacer y={0.5} />
            <Select required placeholder="Choose author" onChange={e => setAuthorId(e)} initialValue={authorId}>
              {(authorData || []).map(({ name, id }) => (
                <Select.Option key={id} value={`${id}`}>
                  {name}
                </Select.Option>
              ))}
            </Select>
            <Spacer y={1} />
            <Button loading={status === 'loading'} auto htmlType="submit" type="success">
              Submit
            </Button>
          </form>
        </Modal.Content>
        <Modal.Action passive onClick={() => setUpdateModal(false)}>
          Cancel
        </Modal.Action>
      </Modal>
    </>
  )
}
export default Home
