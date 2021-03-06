import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { ParcelsService, ParcelState } from '@rusell/parcels'
import { NextApiRequest, NextApiResponse } from 'next'
import withBearerToken from 'utils/auth0/withBearerToken'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { receiverId, state } = request.query

  const parcels = await ParcelsService.fetchAllByReceiver(
    receiverId as string,
    state !== undefined ? ParcelState[state as string] : undefined,
  )

  response.status(200).json(parcels)
}

export default withApiAuthRequired(withBearerToken(handler))
