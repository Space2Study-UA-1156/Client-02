import useUpload from '~/hooks/use-upload'
import { Box, Typography, Tooltip } from '@mui/material'

const DragAndDrop = ({
  emitter,
  initialState = [],
  validationData,
  children,
  style,
  error,
  helperText
}) => {
  const { dragStart, dragLeave, dragDrop, isDrag } = useUpload({
    files: initialState,
    emitter: emitter,
    validationData
  })

  const errorTooltip = error ? (
    <Tooltip title={helperText}>
      <Typography color='error' sx={{ ml: { md: '44px' } }} variant='caption'>
        {helperText}
      </Typography>
    </Tooltip>
  ) : null

  return (
    <Box>
      <Box
        onDragLeave={dragLeave}
        onDragOver={dragStart}
        onDragStart={dragStart}
        onDrop={dragDrop}
        sx={style.root}
      >
        <Box
          sx={[
            style.uploadBox,
            isDrag && style.activeDrag,
            error && { border: '2px dashed red' }
          ]}
        >
          {children}
        </Box>
      </Box>
      {errorTooltip}
    </Box>
  )
}

export default DragAndDrop
