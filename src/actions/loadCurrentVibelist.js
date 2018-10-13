export const loadCurrentVibelist = (playlistUri, deviceId, accessToken) => {

  const playUrl = "https://api.spotify.com/v1/me/player/play?device_id=" + deviceId
    return fetch( playUrl, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "context_uri": playlistUri
      })
    })
    
}
