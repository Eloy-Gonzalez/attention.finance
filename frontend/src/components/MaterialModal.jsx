import React from "react";
import styled from 'styled-components'

// @MUI Material
import { Modal, Fade, Backdrop } from "@mui/material";

const PaperModal = styled.div`
    width: 90%;
    justify-self: center;
    align-self: flex-start;
    margin: 35px auto;
    background-color: #fff;
    outline: none;
    padding: 30px;
    box-sizing:border-box;
    border-radius:5px;
    
    @media (min-width: 720px) {
      width: 65%;
    }
`

const MaterialModal = ({ open, handleClose, children }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      className="modal"
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      style={{overflow:"auto"}}
      BackdropProps={{
        timeout: 600
      }}
    >
      <Fade in={open}>
        <PaperModal className="paper">{children}</PaperModal>
      </Fade>
    </Modal>
  );
};

export default MaterialModal;