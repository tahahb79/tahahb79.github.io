import { Link } from 'gatsby';
import get from 'lodash/get';
import React from 'react';

import profileImg from '../../images/profile.jpg';

const Header = ({ metadata = {}, noBlog = false }) => {
  const twitter = get(metadata, 'author', false);
  const github = get(metadata, 'github', false);
  const linkedin = get(metadata, 'linkedin', false);
  const scholar = get(metadata, 'scholar', false);  // Add this line

  return (
    <div className={classes.wrapper}>
      <div className={classes.imageWrapper}>
        <Link to="/">
          <img className={classes.image} src={profileImg} alt={metadata.name} />
        </Link>
      </div>
      <div className={classes.contentWrapper}>
        <h1 className={classes.name}>
          <Link to="/">{metadata.name}</Link>
        </h1>
        <p className={classes.description}>{metadata.description}</p>
        <ul className={classes.list}>
          {twitter && (
            <li className={classes.item}>
              <a
                className={classes.link}
                href={`https://twitter.com/${twitter}`}
              >
                Twitter
              </a>
            </li>
          )}
          {github && (
            <li className={classes.item}>
              <a className={classes.link} href={github}>
                GitHub
              </a>
            </li>
          )}
          {linkedin && (
            <li className={classes.item}>
              <a className={classes.link} href={linkedin}>
                LinkedIn
              </a>
            </li>
          )}
          {scholar && (  // Add this block for Google Scholar
            <li className={classes.item}>
              <a className={classes.link} href={scholar}>
                Google Scholar
              </a>
            </li>
          )}
          {!noBlog && (
            <li className={classes.item}>
              <Link className={classes.link} to="/blog">
                Blog
              </Link>
            </li>
          )}
          <li className={classes.item}>
            <a className={classes.link} href={metadata.resume}>
              Resume
            </a>
          </li>
          <li className={classes.item}>
            <a className={classes.link} href={metadata.cv}>
              CV
            </a>
          </li>
          <li className={classes.item}>
            <a className={classes.link} href={metadata.publications}> 
              Publications
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
