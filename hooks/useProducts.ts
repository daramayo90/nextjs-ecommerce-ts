import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interfaces';

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
   const { data, error } = useSWR<IProduct[]>(`/api${url}`, config);
   console.log('DATA', data);

   return {
      products: data || [],
      isLoading: !error && !data,
      isError: error,
   };
};
