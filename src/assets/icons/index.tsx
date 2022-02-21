import React, { ComponentProps } from 'react';
import Icon from '@ant-design/icons';
import LogoutSvg from './user/logout.svg';
import ProfileSvg from './user/profile.svg';
import RefreshSvg from './refresh.svg';

const LogoutIcon = (props: ComponentProps<typeof Icon>) => <Icon component={LogoutSvg} {...props} />;
const ProfileIcon = (props: ComponentProps<typeof Icon>) => <Icon component={ProfileSvg} {...props} />;
const RefreshIcon = (props: ComponentProps<typeof Icon>) => <Icon component={RefreshSvg} {...props} />;

export { LogoutIcon, ProfileIcon, RefreshIcon };
