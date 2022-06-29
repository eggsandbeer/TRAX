import safeJsonStringify from 'safe-json-stringify'
import prisma from '../../lib/prisma'
import { validateToken } from '../../lib/auth'

import GradientLayout from '../../components/gradientLayout'
import SongTable from '../../components/songTable'

const getBGColor = (id) => {
  const colors = [
    'red',
    'pink',
    'orange',
    'gray',
    'blue',
    'yellow',
    'teal',
    'green',
  ]
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length - 1)]
}

const PlayList = ({ playlist }) => {
  const color = getBGColor(playlist.id)
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  let user

  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN)
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user?.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })

  const safeP = safeJsonStringify(playlist)

  return {
    props: {
      playlist: JSON.parse(safeP),
    },
  }
}

export default PlayList
