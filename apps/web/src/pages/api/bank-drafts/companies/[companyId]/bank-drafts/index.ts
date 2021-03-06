import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { BankDraftsService } from '@rusell/bank-drafts'
import { NextApiRequest, NextApiResponse } from 'next'
import withBearerToken from 'utils/auth0/withBearerToken'

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { companyId } = request.query
  const { body } = request

  await BankDraftsService.save(body, companyId as string)

  response.status(201).end()
}

export default withApiAuthRequired(withBearerToken(handler))
