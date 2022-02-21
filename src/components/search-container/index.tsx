import classNames from 'classnames';
import * as React from 'react';
import styles from './index.module.less';

interface IProps {
  left?: React.ReactNode;
  right?: JSX.Element;
}

function SearchContainer(props: React.PropsWithChildren<IProps>) {
  return (
    <div
      className={classNames({
        [styles['search-container']]: true
      })}
    >
      {props.children}
      <div className={styles.left}>{props.left}</div>
      <div className={styles.right}>{props.right}</div>
    </div>
  );
}

export default React.memo(SearchContainer);
