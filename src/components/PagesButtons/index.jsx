import React from 'react';

import './PagesButtons.scss';
import { Link } from 'react-router-dom';

const PagesButtons = () => {
  return (
    <div className="PagesButtons-root">
      <Link to="/merch">
        <div>Мерч</div>
      </Link>
      <Link to="/vynil">
        <div>Винил</div>
      </Link>
      <Link to="/cds">
        <div>CDs</div>
      </Link>
    </div>
  );
};

export default PagesButtons;
