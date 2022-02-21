import React from 'react';
import { Modal, ModalFuncProps } from 'antd';
import { CheckCircleFilled, ExclamationCircleFilled, ExclamationCircleOutlined, InfoCircleFilled, WarningFilled } from '@ant-design/icons';

export function success(params: Omit<ModalFuncProps, 'title' | 'icon' | 'okType'>) {
  Modal.success({
    title: '操作确认',
    icon: <CheckCircleFilled />,
    okType: 'ghost',
    ...params
  });
}
export function error(params: Omit<ModalFuncProps, 'title' | 'icon' | 'okType'>) {
  Modal.error({
    title: '操作确认',
    icon: <ExclamationCircleOutlined />,
    okType: 'danger',
    ...params
  });
}

export function info(params: Omit<ModalFuncProps, 'title' | 'icon' | 'okType'>) {
  Modal.info({
    title: '操作确认',
    icon: <InfoCircleFilled />,
    okType: 'primary',
    ...params
  });
}

export function warning(params: Omit<ModalFuncProps, 'title' | 'icon' | 'okType'>) {
  Modal.warning({
    title: '操作确认',
    icon: <WarningFilled />,
    okType: 'primary',
    ...params
  });
}

export const notice = {
  success,
  error,
  info,
  warning
};

export const confirm = {
  delete(params: Omit<ModalFuncProps, 'title' | 'icon' | 'okType'>) {
    Modal.confirm({
      title: '操作确认',
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      ...params
    });
  }
};
