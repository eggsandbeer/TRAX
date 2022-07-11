import fetcher from './fetcher'

export const auth = (
  mode: 'signin' | 'signup',
  body: {
    email: string
    password: string
    firstName?: string
    lastName?: string
  }
) => {
  console.log(mode)
  console.log(body)

  return fetcher(`/${mode}`, body)
}
