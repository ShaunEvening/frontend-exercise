import React from "react";

import { Box, Container, Flex, Tabs, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";

import { Button } from "./components/button";
import { Alert } from "./components/alert";
import { UsersTable } from "./users-table.component";
import { RolesTable } from "./roles-table.component";

import { useGetUsersQuery } from "./app/services/users.service";
import { useGetRolesQuery } from "./app/services/roles.service";

function App() {
  const [search, setSearch] = React.useState<string>("");
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
    error: usersError,
  } = useGetUsersQuery({
    search,
  });

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isFetching: isFetchingRoles,
    error: rolesError,
  } = useGetRolesQuery();

  const searchTimeoutRef = React.useRef<number | null>(null);
  // Debounced search query to avoid making too many requests
  const handleSearch = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = window.setTimeout(() => {
        setSearch(search);
      }, 300);
    },
    []
  );

  // No need to memoize the users and roles data since the query is caching the data
  const users = usersData ?? [];
  const roles = rolesData ?? [];

  return (
    <Container size="3" align="center" mt="7">
      <Tabs.Root defaultValue="Users">
        <Tabs.List>
          <Tabs.Trigger value="Users">Users</Tabs.Trigger>
          <Tabs.Trigger value="Roles">Roles</Tabs.Trigger>
        </Tabs.List>
        <Box pt="5">
          <Tabs.Content value="Users">
            {(usersError || rolesError) && (
              <Box mb="4">
                <Alert type="error">
                  There was an error fetching user data. Please try again later.
                </Alert>
              </Box>
            )}
            <Flex gap="3" mb="4">
              <Box flexGrow="1">
                <TextField.Root
                  placeholder="Search by name..."
                  aria-label="Search user by name"
                  onChange={handleSearch}
                >
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Box>
              <Button color="purple">
                <PlusIcon height="16" width="16" />
                Add user
              </Button>
            </Flex>
            {!isLoadingUsers &&
              !usersError &&
              !rolesError &&
              !users.length &&
              search.length && (
                <Box mb="4">
                  <Alert type="info">
                    There are no users matching the search criteria.
                  </Alert>
                </Box>
              )}
            <UsersTable
              users={users}
              roles={roles}
              isLoading={
                isLoadingUsers ||
                isFetchingUsers ||
                isLoadingRoles ||
                isFetchingRoles
              }
            />
          </Tabs.Content>

          <Tabs.Content value="Roles">
            {rolesError && (
              <Box mb="4">
                <Alert type="error">
                  There was an error fetching role data. Please try again later.
                </Alert>
              </Box>
            )}
            <RolesTable
              roles={roles}
              isLoading={isLoadingRoles || isFetchingRoles}
            />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Container>
  );
}

export default App;
