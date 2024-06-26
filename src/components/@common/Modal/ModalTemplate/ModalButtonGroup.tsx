import classnames from 'classnames/bind';
import { PropsWithChildren, memo } from 'react';
import styles from './ModalTemplate.module.css';
const cx = classnames.bind(styles);

const ModalButtonGroup = ({ children }: PropsWithChildren) => {
    return <div className={cx('modal-btn-group')}>{children}</div>;
};

export default memo(ModalButtonGroup);
