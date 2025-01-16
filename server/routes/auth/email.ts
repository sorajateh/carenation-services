export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const response = await setUserSession(event, {
    user: {
      id: body.user.id,
      email: body.user.email,
      displayName: body.user.displayName,
      firstName: body.user.firstName,
      lastName: body.user.lastName,
      token: body.user.token,
      loggedInAt: new Date()
    }
  })
  return response
})