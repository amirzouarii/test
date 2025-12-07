import { useState, useCallback } from 'react'
import api from '../services/api'

export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const get = useCallback(async (url: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get(url)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const post = useCallback(async (url: string, data: unknown) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post(url, data)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { get, post, loading, error }
}
