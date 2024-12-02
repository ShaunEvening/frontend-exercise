import React from "react";
import {
  AlertDialog,
  Avatar,
  DropdownMenu,
  Flex,
  IconButton,
  Skeleton,
  Strong,
} from "@radix-ui/themes";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { Table } from "./components/table";
import { Button } from "./components/button";
import {
  computeInitials,
  getRoleById,
  reduceRolesToLookup,
} from "./utils/user.utils";
import { type Role } from "./app/services/roles.service";
import { type User, useDeleteUserMutation } from "./app/services/users.service";

const DUMMY_USERS = [
  { name: "John Doe", role: "Engineering Manager", joinedAt: "2024-09-02" },
  { name: "Jane Doe", role: "Scrum Master", joinedAt: "2018-04-01" },
  { name: "John Smith", role: "User", joinedAt: "2020-01-01" },
  { name: "Jane Smith", role: "Staff Developer", joinedAt: "2020-01-01" },
  { name: "John Doe", role: "Developer", joinedAt: "2019-08-20" },
];

const RowsSkeleton = () => {
  return (
    <>
      {DUMMY_USERS.map((user, index) => (
        <Table.Row key={`skele-row-${index}`}>
          <Table.RowHeaderCell>
            <Skeleton loading mr="2">
              <Avatar fallback="JA" size="1" radius="full" />
            </Skeleton>
            <Skeleton loading>{user.name}</Skeleton>
          </Table.RowHeaderCell>
          <Table.Cell>
            <Skeleton loading>{user.role}</Skeleton>
          </Table.Cell>
          <Table.Cell>
            <Skeleton loading>{user.joinedAt}</Skeleton>
          </Table.Cell>
          <Table.Cell>
            <Skeleton loading></Skeleton>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export interface RowActionsProps {
  onDeleteAction: () => void;
}

const RowActions = ({ onDeleteAction }: RowActionsProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton
          variant="ghost"
          color="gray"
          radius="full"
          aria-label="Actions"
        >
          <DotsHorizontalIcon width="16px" height="16px" />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content sideOffset={5}>
        <DropdownMenu.Item>Edit user</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={onDeleteAction}>
          Delete user
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const formatDate = (date: string) => {
  const d = new Date(date);

  return format(d, "MMM dd, yyyy");
};

export interface UsersTableProps {
  users: User[];
  roles: Role[];
  isLoading: boolean;
}
export const UsersTable = ({
  users = [],
  roles = [],
  isLoading,
}: UsersTableProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [deleteUser, { isLoading: isDeleting, isSuccess }] =
    useDeleteUserMutation();

  const rolesLookup = React.useMemo(() => reduceRolesToLookup(roles), [roles]);

  React.useEffect(() => {
    if (isSuccess) {
      setShowDeleteDialog(false);
    }
  }, [isSuccess]);

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Joined</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell aria-label="Actions"></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {isLoading ? (
            <RowsSkeleton />
          ) : (
            users.map((user) => (
              <Table.Row key={user.id}>
                <Table.RowHeaderCell>
                  <Avatar
                    radius="full"
                    src={user.photo}
                    fallback={computeInitials(user)}
                    color="purple"
                    mr="2"
                    size="1"
                    aria-hidden
                  />
                  {user.first} {user.last}
                </Table.RowHeaderCell>
                <Table.Cell>{getRoleById(rolesLookup, user.roleId)}</Table.Cell>
                <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
                <Table.Cell>
                  <RowActions
                    onDeleteAction={() => {
                      setSelectedUser(user);
                      setShowDeleteDialog(true);
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
      <AlertDialog.Root
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete user</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? The user{" "}
            <Strong>
              {selectedUser?.first} {selectedUser?.last}
            </Strong>{" "}
            will be permanently deleted.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button color="gray" disabled={isDeleting}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                color="red"
                loading={isDeleting}
                onClick={(event) => {
                  event.preventDefault();
                  if (selectedUser) {
                    deleteUser(selectedUser.id);
                  }
                }}
              >
                Delete user
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};
