import React from 'react';
import {Input, Select} from "antd";

export default props => {
    return  (
        <div className={"suggestions-searchbar"}>
            <Select style={{ width : 200}} bordered={false} size={"large"} value={"index"}>
                <Select.Option value={"index"}>По #id</Select.Option>
                <Select.Option value={"autor"}>По автору</Select.Option>
                <Select.Option value={"caption"}>По описанию</Select.Option>
            </Select>
            <Input.Search />
        </div>
    )
}