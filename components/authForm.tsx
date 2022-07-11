import { Box, Flex, Input, Button, Divider } from '@chakra-ui/react'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
// import { useSWRConfig } from "swr";
import { FC, useState } from 'react'
import { auth } from '../lib/mutations'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await auth(mode, { email, password, firstName, lastName })
    // console.log(user)
    setIsLoading(false)
    router.push('/')
  }

  return (
    <Box bg="black" height="100vh" width="100vw" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="1px solid white"
      >
        <NextImage src="/logo.svg" height="60px" width="120px" />
      </Flex>
      <Flex
        justify="center"
        align="top"
        height="calc(100vh - 200px)"
        marginTop="50px"
        paddingBottom="50px"
      >
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input
              placeholder="email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              marginBottom="5px"
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              marginBottom="5px"
            />
            {mode === 'signup' && (
              <Box>
                <Divider marginTop="10px" marginBottom="15px" />
                <Input
                  placeholder="firstname"
                  type="text"
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }}
                  marginBottom="5px"
                />

                <Input
                  placeholder="lastname"
                  type="text"
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                  marginBottom="5px"
                />
              </Box>
            )}
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                '&:hover': {
                  bg: 'green.300',
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
