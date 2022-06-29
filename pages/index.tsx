// import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import GradientLayout from '../components/gradientLayout'
import { useMe } from '../lib/hooks'

import prisma from '../lib/prisma'

const Home = ({ artists }) => {
  const { user, isLoading } = useMe()

  if (isLoading) {
    return null
  }

  console.log(user)

  return (
    <GradientLayout
      color="purple"
      roundImage
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playListCount} public playlists`}
      image="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            top artist of the month
          </Text>
          <Text fontSize="md">only visible to you.</Text>
        </Box>
        <Flex>
          {artists.map((artist) => {
            return (
              <Box paddingX="10px" width="15%" key={artist.id}>
                <Box
                  bg="gray.900"
                  borderRadius="4px"
                  padding="15px"
                  width="100%"
                >
                  <Image
                    src="https://placekitten.com/200/200"
                    borderRadius="100%"
                  />
                  <Box marginTop="20px">
                    <Text fontSize="large">{artist.name}</Text>
                    <Text fontSize="x-small">Artist</Text>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Flex>
        <Box />
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})

  const formatartists = artists.map((x) => {
    return {
      ...x,
      createdAt: `${x.createdAt}`,
      updatedAt: `${x.updatedAt}`,
    }
  })

  return {
    props: {
      artists: formatartists,
    },
  }
}

export default Home
