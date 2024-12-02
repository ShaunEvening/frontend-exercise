import { api } from "./api";

export interface Role {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetRolesResponse {
  data: Role[];
  next?: number;
  pages: number;
  prev?: number;
}

export const rolesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRoles: build.query<Role[], void>({
      query: () => ({ url: "roles" }),
      // Pagination is out of scope for this exercise
      transformResponse: (response: GetRolesResponse) => response.data,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Role", id } as const)),
        { type: "Role" as const, id: "LIST" },
      ],
    }),
    updateRole: build.mutation<Role, Partial<Role>>({
      query({ id, ...patch }) {
        return {
          url: `roles/${id}`,
          method: "PATCH",
          body: patch,
        };
      },
      invalidatesTags: (role) => [{ type: "Role", id: role?.id }],
    }),
  }),
});

export const { useGetRolesQuery, useUpdateRoleMutation } = rolesApi;

export const {
  endpoints: { getRoles, updateRole },
} = rolesApi;
