import ky from 'ky'

const targetUrl = 'http://localhost:3001'

export const checkServer = async () => {
  try {
    return await ky.get(`${targetUrl}/check`).json()
  } catch (err) {
    return false
  }
}

export const getAllData = async () => {
  try {
    return await ky.get(targetUrl).json()
  } catch (err) {
    console.error(err)
  }
}

export const getAllAuthors = async () => {
  try {
    return await ky.get(`${targetUrl}/authors`).json()
  } catch (err) {
    console.error(err)
  }
}

export const createNewAuthor = async ({ name, email }) => {
  try {
    return await ky.post(`${targetUrl}/authors`, { json: { name, email } }).json()
  } catch (err) {
    console.error(err)
  }
}

export const removeData = async ({ id }) => {
  try {
    return await ky.delete(targetUrl, { json: { id } }).json()
  } catch (err) {
    console.error(err)
  }
}

export const updateData = async ({ id, title, publishDate, authorId }) => {
  try {
    return await ky.put(targetUrl, { json: { id, title, publishDate, authorId } }).json()
  } catch (err) {
    console.error(err)
  }
}

export const createNewData = async ({ title, author, publishDate }) => {
  try {
    return await ky.post(targetUrl, { json: { author, title, publishDate } }).json()
  } catch (err) {
    console.error(err)
  }
}
