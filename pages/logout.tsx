// import safeJsonStringify from 'safe-json-stringify'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
// import prisma from '../lib/prisma'
import { validateToken } from '../lib/auth'

const LogOut = () => {
  return <div>hmm</div>
}

export const getServerSideProps = async ({ req, res }) => {
  let user

  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN)

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        time: Date.now(),
      },
      'hello',
      {
        expiresIn: '0h',
      }
    )

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('TRAX_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: 0,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    )

    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signup',
      },
    }
  }
}

export default LogOut
