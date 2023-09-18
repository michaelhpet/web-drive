import CancelIcon from "../../icons/CancelIcon";
import DownloadIcon from "../../icons/DownloadIcon";
import { FileMeta, FileType } from "../../lib/types";
import FileCard from ".";
import classes from "./styles.module.css";
import { Modal as AntdModal, ModalProps } from "antd";
import { useDownloadFile } from "../../lib/api";

interface Props extends ModalProps {
  file: FileType;
  fileMeta: FileMeta;
}

export default function FileModal(props: Props) {
  const { file, fileMeta, ...restProps } = props;
  const download = useDownloadFile();

  return (
    <>
      <AntdModal
        {...restProps}
        width={691}
        rootClassName={classes.modal_root}
        wrapClassName={classes.modal}
      >
        <nav>
          <button
            className={classes.download_button}
            onClick={() =>
              download(file.src, { ...fileMeta, filename: file.name })
            }
          >
            <DownloadIcon />
          </button>

          <button className={classes.cancel_button} onClick={props.onCancel}>
            <CancelIcon />
            <p>Close</p>
          </button>
        </nav>

        <div className={classes.content}>
          <FileCard flat {...file} />
        </div>
      </AntdModal>
    </>
  );
}
