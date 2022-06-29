import { validateRoute } from '../../lib/auth'
import prisma from '../../lib/prisma'

export default validateRoute(async (req, res, user) => {
  const playListCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  })

  return res.json({ ...user, playListCount })
})
