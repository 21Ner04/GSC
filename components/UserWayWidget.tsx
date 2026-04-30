"use client";

import { useEffect } from 'react';

// Глобальные типы для UserWay
declare global {
  interface Window {
    userway?: {
      account?: string;
      position?: string;
      color?: string;
      size?: string;
    };
  }
}

export default function UserWayWidget() {
  useEffect(() => {
    // Проверяем, что мы в браузере
    if (typeof window !== 'undefined') {
      // Проверяем, не загружен ли уже widget
      if (!document.getElementById('userway-widget-js')) {
        // Создаем скрипт
        const script = document.createElement('script');
        script.id = 'userway-widget-js';
        script.src = 'https://cdn.userway.org/widget.js';
        script.async = true;
        
        // Добавляем скрипт в head
        document.head.appendChild(script);
        
        // Настраиваем UserWay после загрузки скрипта
        script.onload = () => {
          if (window.userway) {
            window.userway.account = 'greenstreetcapital';
            window.userway.position = 'bottom_right';
            window.userway.color = 'blue';
            window.userway.size = 'small';
          }
        };
      }
    }
  }, []);

  return null;
}
