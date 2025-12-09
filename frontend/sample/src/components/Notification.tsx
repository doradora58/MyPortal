// src/components/Notification.tsx

import './Notification.css';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  return (
    <div className="notification-bar">
      <p>【表示場所: 通知/バナー領域開始】</p>
      {message}
      <p>【表示場所: 通知/バナー領域終了】</p>
    </div>
  );
};

export default Notification;