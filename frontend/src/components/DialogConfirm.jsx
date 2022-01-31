import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function DialogConfirm({
	open,
	onClose,
	onConfirm,
	dialogTitle = "Not title assigned",
	dialogText}
	){
	
	const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
	
  const handleConfirm = React.useCallback(() => {
    onClose()
    setTimeout(() => {
      onConfirm()
    }, 300)
  }, [onClose, onConfirm])

	return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {dialogTitle}
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText>
          {dialogText}
        </DialogContentText>
      </DialogContent>
      
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
	)
}

export default DialogConfirm