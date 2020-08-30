import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Spinner() {
  return (
    <Loader
      className="Spinner"
      type="TailSpin"
      color="#3f51b5"
      height={50}
      width={50}
    />
  );
}
