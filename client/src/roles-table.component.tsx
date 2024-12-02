import React from "react";
import {
  Box,
  Dialog,
  DropdownMenu,
  Flex,
  IconButton,
  Skeleton,
  Strong,
  Text,
  TextField,
} from "@radix-ui/themes";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "./components/button";
import { Table } from "./components/table";
import { Role, useUpdateRoleMutation } from "./app/services/roles.service";

export interface RowActionsProps {
  onEditAction: () => void;
}

const RowActions = ({ onEditAction }: RowActionsProps) => {
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
        <DropdownMenu.Item onSelect={onEditAction}>
          Rename role
        </DropdownMenu.Item>
        <DropdownMenu.Item>Delete role</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

// Dummy roles data for loading skeleton roles
const DUMMY_ROLES = [
  {
    id: "1",
    name: "Developer",
    description: "Developer role",
  },
  {
    id: "2",
    name: "Designer",
    description: "Designer role",
  },
  {
    id: "3",
    name: "Scrum Master",
    description: "Scrum Master role",
  },
  {
    id: "4",
    name: "Product Owner",
    description: "Product Owner role",
  },
  {
    id: "5",
    name: "Manager",
    description: "Manager role",
  },
];

const RowsSkeleton = () => {
  return (
    <>
      {DUMMY_ROLES.map(({ id, name, description }) => (
        <Table.Row key={`skeleton-row-${id}`}>
          <Table.RowHeaderCell>
            <Skeleton loading>{name}</Skeleton>
          </Table.RowHeaderCell>
          <Table.Cell>
            <Skeleton loading>{description}</Skeleton>
          </Table.Cell>
          <Table.Cell>
            <Skeleton loading>{id}</Skeleton>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export interface RolesTableProps {
  roles: Role[];
  isLoading: boolean;
}

export const RolesTable = ({ roles, isLoading }: RolesTableProps) => {
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);
  const [updateRole, { isLoading: isSubmitting, isSuccess }] =
    useUpdateRoleMutation();

  React.useEffect(() => {
    if (isSuccess) {
      setShowEditDialog(false);
    }
  }, [isSuccess]);

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell aria-label="Actions"></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {isLoading ? (
            <RowsSkeleton />
          ) : (
            roles.map((role) => (
              <Table.Row key={role.id}>
                <Table.RowHeaderCell>{role.name}</Table.RowHeaderCell>
                <Table.Cell>
                  <Text truncate>{role.description}</Text>
                </Table.Cell>
                <Table.Cell>
                  <RowActions
                    onEditAction={() => {
                      setSelectedRole(role);
                      setShowEditDialog(true);
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
      <Dialog.Root open={showEditDialog} onOpenChange={setShowEditDialog}>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Rename role</Dialog.Title>
          <Dialog.Description size="2">
            Make changes to the <Strong>{selectedRole?.name}</Strong> role
          </Dialog.Description>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (selectedRole) {
                const elements = new FormData(event.currentTarget);
                const name = elements.get("name") as string;
                updateRole({ id: selectedRole.id, name });
              }
            }}
          >
            <Box mt="4">
              <TextField.Root
                name="name"
                placeholder="Enter new role name..."
                aria-label="New role name"
                required
              />
            </Box>
            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button color="gray" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" color="purple" loading={isSubmitting}>
                Save changes
              </Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
