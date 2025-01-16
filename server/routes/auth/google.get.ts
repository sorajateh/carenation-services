export default oauthGoogleEventHandler({
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        id: user.sub,
        email: user.email,
        displayName: user.name,
        firstName: user.given_name,
        lastName: user.family_name,
        token: tokens.access_token,
        tokens: tokens,
        loggedInAt: new Date()
      }
    })
    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/')
  },
})  