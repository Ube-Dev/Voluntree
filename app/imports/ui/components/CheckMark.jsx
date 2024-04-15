import React from 'react';
import { XCircle, CheckCircle } from 'react-bootstrap-icons';

const CheckMark = (val) => (val ? <CheckCircle className="mx-2" size={24} /> : <XCircle className="mx-2" size={24} />);

export default CheckMark;
