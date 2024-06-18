import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  color: string;
  showNotification: boolean;
  setShowNotification: (show: boolean) => void;
}

const Notification: React.FC<NotificationProps> = ({ message, color, showNotification, setShowNotification }) => {
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000); // Hide after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [showNotification, setShowNotification]);

  if (!showNotification) return null;

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${color}`}>
      <p className="text-white">{message}</p>
    </div>
  );
};

export default Notification;
