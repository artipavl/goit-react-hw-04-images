import { useEffect } from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

export function Modal({ src, alt, close }) {
  useEffect(() => {
    function keyDown(e) {
      if (e.code === 'Escape') {
        close();
      }
    }

    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [close]);

  return (
    <div
      className={css.Overlay}
      onClick={e => e.target === e.currentTarget && close()}
    >
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
