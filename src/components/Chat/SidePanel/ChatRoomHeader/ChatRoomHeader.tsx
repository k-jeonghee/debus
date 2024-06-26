import classnames from 'classnames/bind';
import { memo } from 'react';
import { ChatRoomInfoType } from 'src/@types/chat';
import styles from './ChatRoomHeader.module.css';
const cx = classnames.bind(styles);

const ChatRoomHeader = ({ chatRoom }: { chatRoom: ChatRoomInfoType }) => {
  return (
    <div className={cx('container')}>
      <h1>No. {[...chatRoom.id.slice(1, 6)]}</h1>
      <div className={cx('divider')}></div>
      <p className={cx('title')}>{chatRoom.title}</p>
      <p className={cx('desc')}>{chatRoom.desc}</p>
      <div className={cx('divider')}></div>
      <ul>{chatRoom.options && chatRoom.options.map((option) => <li key={option}>{option}</li>)}</ul>
    </div>
  );
};

export default memo(ChatRoomHeader);
