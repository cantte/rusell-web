import { Input } from '@nextui-org/react'
import type { Route } from '@rusell/routes'
import { RouteSelectModal } from '@rusell/routes'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { CreateTransportSheetRequest } from '../../models'
import SearchRouteButton from './search-route.button'

const RouteField = () => {
  const intl = useIntl()
  const {
    register,
    setValue,
    watch,
    formState: {
      errors: { routeId: routeIdError },
    },
  } = useFormContext<CreateTransportSheetRequest>()

  const [route, setRoute] = useState<Route | undefined>(undefined)

  const [isRouteSelectModalOpen, setIsRouteSelectModalOpen] = useState(false)
  const handleSelectRoute = (route: Route) => {
    setRoute(route)
    setValue('routeId', route.id)
    setIsRouteSelectModalOpen(false)
  }
  const handleCancelSelectRoute = () => {
    setIsRouteSelectModalOpen(false)
  }

  return (
    <>
      <Input
        readOnly
        label={intl.formatMessage({
          defaultMessage: 'Route',
          description: 'Route field',
        })}
        value={route ? `From ${route.from}. To ${route.to}` : ''}
        helperText={routeIdError?.message}
        helperColor={'error'}
        status={routeIdError ? 'error' : 'default'}
        width="100%"
        contentRightStyling={false}
        contentRight={
          <SearchRouteButton onClick={() => setIsRouteSelectModalOpen(true)} />
        }
      />

      <Input
        hidden
        {...register('routeId', {
          required: {
            value: true,
            message: intl.formatMessage({
              defaultMessage: 'Please select a route',
              description: 'Error message for route field',
            }),
          },
        })}
      />

      <RouteSelectModal
        open={isRouteSelectModalOpen}
        selectedRouteId={watch('routeId')}
        onSelect={handleSelectRoute}
        onCancel={handleCancelSelectRoute}
      />
    </>
  )
}

export default RouteField
