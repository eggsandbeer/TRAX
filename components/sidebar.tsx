/* eslint-disable jsx-a11y/anchor-is-valid */
import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Box,
  ListItem,
  List,
  Divider,
  // Center,
  LinkBox,
  ListIcon,
} from '@chakra-ui/layout'
// import { useRouter } from 'next/router'

import { Link } from '@chakra-ui/react'
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  // MdPlayArrow,
  MdFavorite,
} from 'react-icons/md'
import { FaDoorOpen } from 'react-icons/fa'
import { usePlaylist } from '../lib/hooks'

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
]

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/',
  },
  {
    name: 'Favourites',
    icon: MdFavorite,
    route: '/library',
  },
]

// const playLists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

// function deleteCookie() {
//   document.cookie =
//     'TRAX_ACCESS_TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
// }

const SideBar = () => {
  const { playlists } = usePlaylist()
  // const router = useRouter()

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.svg" height="60px" width="120px" />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((menuItem) => {
              return (
                <ListItem key={menuItem?.name} paddingX="20px" fontSize="20px">
                  <LinkBox>
                    <NextLink href={menuItem.route} passHref>
                      <Link>
                        <ListIcon
                          as={menuItem.icon}
                          color="white"
                          marginRight="20px"
                        />
                        {menuItem.name}
                      </Link>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              )
            })}
          </List>
        </Box>
        <Divider color="gray.700" marginBottom="20px" />
        <Box marginBottom="20px">
          <List spacing={2}>
            {musicMenu.map((musicItem) => {
              return (
                <ListItem key={musicItem?.name} paddingX="20px" fontSize="20px">
                  <LinkBox>
                    <NextLink href={musicItem?.name} passHref>
                      <Link>
                        <ListIcon
                          as={musicItem?.icon}
                          color="white"
                          marginRight="20px"
                        />
                        {musicItem?.name}
                      </Link>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              )
            })}
          </List>
        </Box>
        <Divider color="gray.700" marginBottom="20px" />
        <Box overflowY="auto" marginBottom="20px">
          <List spacing={2}>
            {playlists.map((playlist) => {
              return (
                <ListItem paddingX="20px" key={playlist.id}>
                  <NextLink
                    href={{
                      pathname: `/playlist/[id]`,
                      query: {
                        id: playlist.id,
                      },
                    }}
                  >
                    <Link>{playlist.name}</Link>
                  </NextLink>
                </ListItem>
              )
            })}
          </List>
        </Box>
        <Box position="absolute" bottom="30px">
          <List spacing={2}>
            <ListItem
              paddingX="20px"
              fontSize="sm"
              // onClick={() => {
              //   console.log('handle them clicks')
              //   deleteCookie()
              //   router.push('/signin')
              // }}
            >
              <NextLink href="/logout">
                <Link>
                  <ListIcon as={FaDoorOpen} color="white" marginRight="5px" />
                  Sign Out
                </Link>
              </NextLink>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default SideBar
