import Icon, { SearchOutlined } from '@ant-design/icons';
import { Form, Input, Space } from 'antd';
import * as React from 'react';
import { FormInstance } from 'antd/es/form/Form';
import SearchContainer from '../search-container';
import RefreshButton from '../refresh-button';
import { IfElse } from '@bixi-design/core';
import { useDebounceFn, useThrottleFn } from 'ahooks';

interface IProps {
  searchProp?: string;
  placeholder?: string;
  form?: FormInstance;
  loading?: boolean;
  onSubmit?: () => void;
  onRefresh?: () => void;
}

function SearchPanel(props: React.PropsWithChildren<IProps>) {
  const { searchProp, children, form, loading, placeholder = '请输入关键词', onRefresh, onSubmit } = props;

  const { run: onChange } = useThrottleFn(
    () => {
      onSubmit && onSubmit();
    },
    {
      wait: 500
    }
  );
  const right = (
    <Form form={form}>
      <Space>
        <IfElse if={!!form && !!searchProp && !!onSubmit}>
          <Form.Item noStyle name={searchProp}>
            <Input style={{ width: '220px' }} placeholder={placeholder} onChange={onChange} suffix={<SearchOutlined onClick={onSubmit} />} />
          </Form.Item>
        </IfElse>
        <Form.Item noStyle>
          <RefreshButton loading={loading} onClick={onRefresh} />
        </Form.Item>
      </Space>
    </Form>
  );
  return <SearchContainer left={children} right={right} />;
}

export default React.memo(SearchPanel);
