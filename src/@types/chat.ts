export type ChatRoomInfo = {
  title: string;
  desc: string;
  options: string;
};

type ChatRoomStatus = 'pending' | 'running';

export type ChatRoomInfoType = {
  id: string;
  title: string;
  desc: string;
  options: string[];
  createAt: number;
  members: Member[];
  status: ChatRoomStatus;
};

export type Member = {
  userId: string;
  name: string;
  role: string;
};

export type Message = {
  id: string;
  content?: string;
  file?: string;
  timestamp: unknown;
  user: chatUserInfo;
  chatRoomId: string;
};

export type chatUserInfo = {
  id: string;
  name: string;
};
