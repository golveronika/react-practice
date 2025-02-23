import { getCustomerEvents } from '@api/services/getCustomerEvents';
import { useQuery } from '@tanstack/react-query';


const useCustomerEvents = () => {
  const query = useQuery({
    queryKey: ['CustomerEvents'],
    queryFn: async ({ queryKey }) => {
      return getCustomerEvents(); // Передаем параметры в функцию запроса
    },
  });

  return { ...query };
};

export default useCustomerEvents;
