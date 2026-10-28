import { upload, uploadPresigned } from '@vercel/blob/client'
import api, { API_BASE } from './api'

let configPromise = null

/** Server-reported upload mode ('blob' on Vercel, 'disk' locally), cached per session. */
export function uploadConfig() {
  if (!configPromise) {
    configPromise = api
      .get('/upload/config')
      .then((r) => r.data)
      .catch((e) => {
        configPromise = null
        throw e
      })
  }
  return configPromise
}

function slug(name) {
  const dot = name.lastIndexOf('.')
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40)
  const ext = dot > 0 ? name.slice(dot).toLowerCase() : ''
  return `${base || 'file'}${ext}`
}

/** Upload one file; resolves to { url, name, size }. Works in both modes. */
export async function uploadFile(file) {
  const { mode, flow, maxBytes, accept } = await uploadConfig()
  if (!accept.includes(file.type)) throw new Error('Only images, PDF and MP4 files are allowed')
  if (file.size > maxBytes) throw new Error(`File is larger than ${Math.round(maxBytes / 1048576)} MB`)

  if (mode === 'blob') {
    // The file goes straight from the browser to Vercel Blob; the API only
    // issues a short-lived token after checking the admin session passed in clientPayload.
    const send = flow === 'presigned' ? uploadPresigned : upload
    const blob = await send(`uploads/${slug(file.name)}`, file, {
      access: 'public',
      contentType: file.type,
      handleUploadUrl: `${API_BASE}/api/upload`,
      clientPayload: JSON.stringify({ token: localStorage.getItem('scj_token') }),
    })
    return { url: blob.url, name: file.name, size: file.size }
  }

  const fd = new FormData()
  fd.append('file', file)
  const { data } = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
  return data
}
