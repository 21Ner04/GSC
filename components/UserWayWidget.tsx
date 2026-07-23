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
      // Добавляем CSS для позиционирования
      const style = document.createElement('style');
      style.id = 'userway-widget-style';
      style.textContent = `
        /* UserWay widget — force safe positioning and disable any inherited filters */
        #userway-widget,
        .userway-widget-wrapper,
        [class*="userway"],
        div[id*="userway"],
        button[class*="userway"] {
          position: fixed !important;
          bottom: 7px !important;
          right: 20px !important;
          top: auto !important;
          left: auto !important;
          z-index: 999 !important;
          filter: none !important;
          -webkit-filter: none !important;
          backdrop-filter: none !important;
        }

        /* Additional safety for any dynamic classes UserWay might add */
        [class*="userway"] {
          filter: none !important;
          -webkit-filter: none !important;
        }
      `;
      document.head.appendChild(style);

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
          setTimeout(() => {
            if (window.userway) {
              window.userway.account = 'greenstreetcapital';
              window.userway.position = 'bottom_right';
              window.userway.color = 'blue';
              window.userway.size = 'small';
            }
          }, 1000);
        };
      }

      return () => {
        const existingStyle = document.getElementById('userway-widget-style');
        if (existingStyle) existingStyle.remove();
      };
    }
  }, []);

  return null;
}
