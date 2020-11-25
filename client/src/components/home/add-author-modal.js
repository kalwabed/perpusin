import { Button, Input, Modal, Spacer, useToasts } from '@geist-ui/react'
import Plus from '@geist-ui/react-icons/plus'
import { useState } from 'react'
import { useMutation, useQueryCache } from 'react-query'
import { createNewAuthor } from '../../lib/api'

const AuthorModal = () => {
  const [modal, setModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [mutate, { isLoading }] = useMutation(createNewAuthor)
  const [, setToast] = useToasts()
  const queryCache = useQueryCache()

  const formSubmit = async e => {
    e.preventDefault()
    try {
      await mutate({ email, name })
      setEmail('')
      setName('')
      setToast({ delay: 3000, text: 'Penulis baru berhasil ditambahkan!', type: 'success' })
      setModal(false)
    } catch (err) {
      console.error(err)
    } finally {
      queryCache.invalidateQueries('getAllAuthors')
    }
  }

  return (
    <>
      <Button auto icon={<Plus />} onClick={() => setModal(true)}>
        Tambah Penulis
      </Button>
      <Modal open={modal} onClose={() => setModal(false)}>
        <Modal.Title>Tambah Penulis</Modal.Title>
        <Modal.Content>
          <form onSubmit={formSubmit}>
            <Input
              required
              clearable
              label="Name"
              placeholder="e.g Kalwabed Rizki"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Spacer y={0.5} />
            <Input
              required
              clearable
              type="email"
              label="Email"
              placeholder="e.g me@kalwabed.dev"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Spacer y={1} />
            <Button loading={isLoading} htmlType="submit" type="success" auto>
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

export default AuthorModal
