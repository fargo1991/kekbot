import React, { useState, useEffect } from "react";
import { Modal } from "antd";

export default props => {

    let { path } = props;
    let [ visible, setVisible ] = useState(false);

    function close(){ setVisible(false) }
    function show(){ setVisible(true) }

    return(
        <div  className={"suggestion-image"}>
            <img className={"thumb"} src={path} onClick={show}/>
            <Modal
                visible={visible}
                onCancel={close}
                onClick={close}
                closable={false}
                width={500}
                top={20}
                centered={true}
                onOk={close}
                footer={''}
                className={"suggestion-image-modal"}
            >
                <img className={"image"}
                     src={path}
                     onClick={close}
                />
            </Modal>
        </div>
    )

}