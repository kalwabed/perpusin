import { Button, Input, Modal, Select, Spacer, useToasts } from '@geist-ui/react'
import Plus from '@geist-ui/react-icons/plus'
import { useState } from 'react'
import { useMutation, useQuery, useQueryCache } from 'react-query'
import { createNewData, getAllAuthors } from '../../lib/api'

const BookModal = () => {
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishDate, setPublishDate] = useState('')

  const [, setToast] = useToasts()
  const { data } = useQuery('getAllAuthors', getAllAuthors)
  const queryCache = useQueryCache()
  const [mutate, { status }] = useMutation(createNewData)

  const submitForm = async e => {
    e.preventDefault()
    try {
      await mutate({ title, author, publishDate })
      setTitle('')
      setAuthor('')
      setPublishDate('')
      setModal(false)
      setToast({ text: 'Buku berhasil ditambahkan!', type: 'success', delay: 3000 })
    } catch (err) {
      console.error(err)
    } finally {
      queryCache.invalidateQueries('getAllData')
    }
  }

  return (
    <>
      <Button auto onClick={() => setModal(true)} type="secondary-light" icon={<Plus />}>
        Tambah Buku
      </Button>
      <Modal open={modal} onClose={() => setModal(false)}>
        <Modal.Title>Tambah buku</Modal.Title>
        <Modal.Content>
          <form onSubmit={submitForm}>
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
            <Select required placeholder="Choose author" onChange={e => setAuthor(e)}>
              {(data || []).map(({ name, id }) => (
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
        <Modal.Action passive onClick={() => setModal(false)}>
          Cancel
        </Modal.Action>
      </Modal>
    </>
  )
}

export default BookModal
