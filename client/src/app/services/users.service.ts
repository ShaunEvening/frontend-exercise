import { api } from "./api";

export interface User {
  createdAt: string;
  first: string;
  id: string;
  last: string;
  photo: string;
  roleId: string;
  updatedAt: string;
}

export interface UsersResponse {
  data: User[];
  next?: number;
  pages: number;
  prev?: number;
}

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], { search?: string }>({
      query: ({ search }) => ({ url: "users", params: { search } }),
      transformResponse: (response: UsersResponse) => response.data,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "User", id } as const)),
        { type: "User" as const, id: "LIST" },
      ],
    }),
    deleteUser: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (user) => [{ type: "User", id: user?.id }],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = usersApi;

export const {
  endpoints: { getUsers, deleteUser },
} = usersApi;
