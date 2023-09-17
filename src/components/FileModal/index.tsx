import CancelIcon from "../../icons/CancelIcon";
import DownloadIcon from "../../icons/DownloadIcon";
import FileCard from "../FileCard";
import classes from "./FileModal.module.css";
import { Modal as AntdModal, ModalProps } from "antd";

export default function FileModal(props: ModalProps) {
  return (
    <AntdModal
      {...props}
      width={691}
      rootClassName={classes.root}
      wrapClassName={classes.modal}
    >
      <nav>
        <button className={classes.download_button}>
          <DownloadIcon />
        </button>

        <button className={classes.cancel_button} onClick={props.onCancel}>
          <CancelIcon />
          <p>Close</p>
        </button>
      </nav>

      <div className={classes.content}>
        <FileCard flat />
      </div>
    </AntdModal>
  );
}
