import storageAdapter from './storage/localStorageAdapter'

function getAll() {
  return storageAdapter.readPlaylists()
}

function saveAll(playlists) {
  storageAdapter.writePlaylists(playlists)
}

function addList(listName, songs = [], description = '') {
  const currentPlaylists = getAll()
  if (currentPlaylists.some((playlist) => playlist.name === listName)) {
    console.warn(`Playlist "${listName}" already exists.`)
    return
  }

  currentPlaylists.push({
    name: listName,
    songs,
    description,
  })
  saveAll(currentPlaylists)
}

function addSong(listName, songName, bvid) {
  const currentPlaylists = getAll()
  const playlistIndex = currentPlaylists.findIndex((playlist) => playlist.name === listName)

  if (playlistIndex === -1) {
    return
  }

  if (currentPlaylists[playlistIndex].songs.some((song) => song.bv === bvid)) {
    console.warn(`Song with BV ${bvid} already exists in list ${listName}.`)
  }

  currentPlaylists[playlistIndex].songs.push({
    name: songName,
    bv: bvid,
  })
  saveAll(currentPlaylists)
}

function removeList(listName) {
  const currentPlaylists = getAll()
  const updatedPlaylists = currentPlaylists.filter((playlist) => playlist.name !== listName)
  saveAll(updatedPlaylists)
}

function removeSong(listName, songName) {
  const currentPlaylists = getAll()
  const playlistIndex = currentPlaylists.findIndex((playlist) => playlist.name === listName)

  if (playlistIndex === -1) {
    return
  }

  currentPlaylists[playlistIndex].songs = currentPlaylists[playlistIndex].songs.filter(
    (song) => song.name !== songName,
  )
  saveAll(currentPlaylists)
}

export default {
  getAll,
  saveAll,
  addList,
  addSong,
  removeList,
  removeSong,
}
