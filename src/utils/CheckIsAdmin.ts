export const checkIsAdmin = (email: string) => {
  const isAdmin = email === import.meta.env.VITE_ADMIN_EMAIL ? true : false
  return isAdmin
}
