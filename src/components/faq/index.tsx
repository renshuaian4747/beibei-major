import { CloseOutlined } from '@ant-design/icons';
import { RefreshIcon } from '@assets/icons';
import { FlagKeys, flagStore } from '@stores/flag';
import { Button, Collapse } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';

interface IProps {
  keys?: FlagKeys[];
}

const faq = {
  list_basic_1: {
    title: '排序策略和召回策略是什么关系？',
    description: '推荐系统召回模块，初步从海量物品中筛选出符合推荐要求的物品，支持内置达观推荐召回策略，用户自定义召回策略。'
  },
  list_tab_1: {
    title: '召回策略和排序策略是什么关系？',
    description: '推荐系统召回模块，初步从海量物品中筛选出符合推荐要求的物品，支持内置达观推荐召回策略，用户自定义召回策略。'
  },
  list_tab_2: {
    title: '召回策略应该如何使用？',
    description: '推荐系统召回模块，初步从海量物品中筛选出符合推荐要求的物品，支持内置达观推荐召回策略，用户自定义召回策略。'
  }
};

const Faq = observer(function Faq(props: IProps) {
  const { getFlag, toggleFlag } = flagStore;

  const { keys = [] } = props;
  return (
    <Collapse>
      {keys.map((key) => {
        const visible = getFlag(key);
        if (!visible || !faq[key]) return null;
        return (
          <Collapse.Panel
            header={faq[key].title}
            key={key}
            extra={
              <CloseOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFlag(key);
                }}
              />
            }
          >
            {faq[key].description}
          </Collapse.Panel>
        );
      })}
    </Collapse>
  );
});

export default React.memo(Faq);
