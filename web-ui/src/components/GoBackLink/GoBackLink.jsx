import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

const GoBackLink = ({ to, text, children }) => (
    <div className={'go-back-link'}>
        <Link to={to}>
            <LeftOutlined/>
            {text || children}
        </Link>
    </div>
);

export default GoBackLink;