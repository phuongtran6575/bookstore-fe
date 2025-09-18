import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {  type crudService, type RelationshipService } from "../service/baseService";

export function useCrud<T>(entity: string, service: crudService<T>) {
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

export function useRelationship<TLeft, TRight, TReturn = any>(
  key: string,
  service: RelationshipService<TLeft, TRight, TReturn>
) {
  const queryClient = useQueryClient();

  const useGetAll = (leftId: TLeft) =>
    useQuery({
      queryKey: [key, leftId],
      queryFn: () => service.getAll(leftId),
      enabled: !!leftId,
    });

  const useAdd = () =>
    useMutation({
      mutationFn: ({ leftId, rightId }: { leftId: TLeft; rightId: TRight }) =>
        service.add(leftId, rightId),
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({ queryKey: [key, variables.leftId] });
      },
    });

  const useRemove = () =>
    useMutation({
      mutationFn: ({ leftId, rightId }: { leftId: TLeft; rightId: TRight }) =>
        service.remove(leftId, rightId),
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({ queryKey: [key, variables.leftId] });
      },
    });

  return { useGetAll, useAdd, useRemove };
}