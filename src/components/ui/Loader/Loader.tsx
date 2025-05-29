import React from 'react';
import './styles.module.scss';

interface LoaderProps {
  size?: 's' | 'm' | 'l';
}

const Loader: React.FC<LoaderProps> = ({ size = 'm' }) => {
  return <div className={`loader loader--${size}`} />;
};

export default Loader;
