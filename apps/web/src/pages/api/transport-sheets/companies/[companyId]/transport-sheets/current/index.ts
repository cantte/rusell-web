import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { TransportSheetsService } from '@rusell/transport-sheets'
import { NextApiRequest, NextApiResponse } from 'next'
import withBearerToken from 'utils/auth0/withBearerToken'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { companyId } = request.query
  const current = await TransportSheetsService.fetchCurrent(companyId as string)

  response.status(200).json(current)
}

export default withApiAuthRequired(withBearerToken(handler))
