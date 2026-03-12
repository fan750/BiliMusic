async function getSongDuration(bvid) {
  const response = await fetch(`/api/x/web-interface/view?bvid=${bvid}`)
  const payload = await response.json()
  return payload.data.duration
}

export default {
  getSongDuration,
}
