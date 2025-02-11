// Функция debounce должна:

// Принимать:
// fn — функцию, которую нужно вызывать с задержкой.
// delay — время в миллисекундах, после которого функция сработает.

// 1 - Запоминать таймер (timer), чтобы отменять его при новых вызовах.
// 2 - Очищать предыдущий таймер, если debounce вызывается снова до истечения delay.
// 3 - Запускать новый таймер, который вызовет fn через delay мс.

export const debounce = (fn: (...args: any[]) => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: any[]) => {
      if (timer) clearTimeout(timer); // Очистка предыдущего таймера
      timer = setTimeout(() => fn(...args), delay); // Установка нового таймера
    };
};

