import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Service } from "../service/baseService";

export function useCrud<T>(entity: string, service: Service<T>) {
  const queryClient = useQueryClient();

  const useGetList = () =>
    useQuery({
      queryKey: [entity],
      queryFn: service.getAll,
    });

  const useGetById = (id: string) =>
    useQuery({
      queryKey: [entity, id],
      queryFn: () => service.getById(id),
      enabled: !!id,
    });

  const useCreate = () =>
    useMutation({
      mutationFn: service.create,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [entity] }),
    });

  const useUpdate = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<T> }) =>
        service.update(id, data),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [entity] }),
    });

  const useDelete = () =>
    useMutation({
      mutationFn: (id: string) => service.delete(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [entity] }),
    });

  return { useGetList, useGetById, useCreate, useUpdate, useDelete };
}