import React, { useRef, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "shards-react";
import { css } from "@emotion/core";

const Dialog = ({
  size = "md",
  title,
  message,
  overlayAction,
  confirmButtonProp,
  cancelButtonProp,
  preLine=false,
  isShowDialog = false,
}) => {
  const confirmButton = useRef({
    isShow: true,
    text: "是",
    action: null,
    color: "primary",
  });
  const cancelButton = useRef({
    isShow: true,
    text: "否",
    action: null,
    color: "primary",
  });

  const styles = css`
    .buttonDiv {
      display: inline-block;
    }
    .button {
      flex-direction: row;
      float: right;
    }
    .modal {
      z-index: 1090;
    }
    .backdropBackground {
      z-index: 1080;
    }
    .modal-backdrop.show {
      opacity: 0.25;
    }
  `;

  useEffect(() => {
    confirmButton.current = { ...confirmButton.current, ...confirmButtonProp };
    cancelButton.current = { ...cancelButton.current, ...cancelButtonProp };
  }, []);

  return (
    <div css={styles}>
      <Modal
        size={size}
        open={isShowDialog}
        toggle={() => overlayAction && overlayAction()}
        backdropClassName="backdropBackground"
      >
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody
          style={{ whiteSpace: preLine ? 'pre-line' : 'normal'}}
        >
            {message}</ModalBody>
        <div className="buttonDiv">
          {confirmButton.current.isShow && (
            <Button
              theme={confirmButton.current.color}
              onClick={confirmButtonProp?.action}
              className="button mr-3 mb-3"
              autoFocus
            >
              {confirmButton.current.text}
            </Button>
          )}
          {cancelButton.current.isShow && (
            <Button
              theme={cancelButton.current.color}
              onClick={cancelButtonProp?.action}
              className="button mr-3 mb-3"
            >
              {cancelButton.current.text}
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Dialog;
