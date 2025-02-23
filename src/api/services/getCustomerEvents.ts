import axiosInstance from '@api/axiosInstance';

export interface IEventProperties {
  property: string;
  type: string;
}

interface ICustomerEvent {
  type: string;
  properties: Array<IEventProperties>
}

export type TCustomerEvents = Array<ICustomerEvent>

export const getCustomerEvents = async (): Promise<TCustomerEvents | null> => {
  const result = await axiosInstance
    .get(`/customer-events/events.json`)
    .then((res) => {
      return res?.data?.events || null;
    })
    .catch(() => {
      return null;
    });

  return result;
};
