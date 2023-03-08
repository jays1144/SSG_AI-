import { useCallback, useState } from "react";
import "./Add.css";

const Add = ({ onClose }) => {
  const [photoInfo, setPhoto] = useState("");
  const Cancel = useCallback(() => {
    window.location.href = "http://localhost:3000/main-yoo1";
  });

  function filename(e) {
    console.log(e.target.value);
    setPhoto(e.target.value);
  }

  return (
    <form
      action="http://127.0.0.1:3001/add"
      method="post"
      encType="multipart/form-data"
    >
      <div className="add">
        <div className="add1">
          <div className="wrapper">
            <div className="div4">신호등 추가</div>
          </div>
          <div className="file-upload-area">
            <button>
              <div className="btn-card9">
                <div className="btn-card-child9" />
                <div className="registrar">추가</div>
              </div>
            </button>
            <div className="btn-card8" onClick={Cancel}>
              <div className="btn-card-child9" />
              <div className="registrar">취소</div>
            </div>
            <div className="listgroup">
              <input
                className="num"
                placeholder="  신호등 번호"
                type="text"
                name="num"
              />
              <br />
              <input
                className="lat"
                placeholder="  위도"
                type="text"
                name="lat"
              />
              <input
                className="long"
                placeholder="  경도"
                type="text"
                name="long"
              />
              <input
                className="loc"
                placeholder="  신호등 위치"
                type="text"
                name="loc"
              />
            </div>
            <div className="upload-icon-parent">
              <img className="upload-icon" alt="" src="../upload-icon.svg" />
              <div className="drag-drop-files">
                <input
                  class="upload-name"
                  defaultValue={photoInfo}
                  placeholder="첨부파일"
                ></input>
                <label for="file">찾기</label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={filename}
                  name="photo"
                />
              </div>
              <div className="supported-formats">
                <div className="supported-formates-jpeg-png-wrapper">
                  <div className="supported-formates-jpeg">{`Supported formates: JPEG, PNG, GIF `}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Add;
