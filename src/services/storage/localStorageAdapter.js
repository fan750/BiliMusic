const PLAYLIST_STORAGE_KEY = 'my_playlist'

function readPlaylists() {
  const rawValue = localStorage.getItem(PLAYLIST_STORAGE_KEY)
  if (!rawValue) {
    return []
  }

  try {
    const parsedValue = JSON.parse(rawValue)
    return Array.isArray(parsedValue) ? parsedValue : []
  } catch (error) {
    console.error('Failed to parse playlists from localStorage:', error)
    return []
  }
}

function writePlaylists(playlists) {
  try {
    localStorage.setItem(PLAYLIST_STORAGE_KEY, JSON.stringify(playlists))
  } catch (error) {
    console.error('Failed to save playlists to localStorage:', error)
  }
}

export { PLAYLIST_STORAGE_KEY }

export default {
  readPlaylists,
  writePlaylists,
}
