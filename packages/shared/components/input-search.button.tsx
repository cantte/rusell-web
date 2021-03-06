import { Button, Tooltip, useTheme } from '@nextui-org/react'
import { FC, MouseEventHandler, ReactNode } from 'react'
import { Search } from 'react-iconly'

type Props = {
  onClick: MouseEventHandler
  tooltipContent: ReactNode
}

const InputSearchButton: FC<Props> = ({ onClick, tooltipContent }) => {
  const theme = useTheme()
  return (
    <Tooltip content={tooltipContent}>
      <Button
        auto
        type="button"
        css={{
          w: '24px',
          p: '0 14px',
          bgColor: 'transparent',
        }}
        icon={
          <Search primaryColor={theme.theme?.colors.text.value || 'white'} />
        }
        onClick={onClick}
      />
    </Tooltip>
  )
}

export default InputSearchButton
