import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => <nav>
  <ul>
    <li><Link to ="/">HOME</Link></li>
  </ul>
  <ul>
    <li><Link to ="/profile">My Profile</Link></li>
  </ul>
</nav>
export default Navigation