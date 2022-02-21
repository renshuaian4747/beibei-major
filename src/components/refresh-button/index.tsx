import { RefreshIcon } from '@assets/icons';
import { Button } from 'antd';
import * as React from 'react';

interface IProps {
  loading?: boolean;
  onClick?: () => void;
}

function RefreshButton(props: React.PropsWithChildren<IProps>) {
  return <Button style={{ padding: '0 7px' }} onClick={props.onClick} icon={<RefreshIcon spin={props.loading} />}></Button>;
}

export default React.memo(RefreshButton);
