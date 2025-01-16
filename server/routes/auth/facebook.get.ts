export default oauthFacebookEventHandler({
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        id: user.id,
        displayName: user.name
      }
    })
    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('Facebook OAuth error:', error)
    return sendRedirect(event, '/')
  },
})  