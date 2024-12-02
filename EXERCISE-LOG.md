# Take home exercise log

Hey WorkOS! It's Shaun Evening again. This time I have completed the Frontend take home assignment.

## To run the frontend application

```bash
# Move to client directory
cd client

# Install dependencies
pnpm install

# Start the client dev server
pnpm dev
```

## Tasks

### Scaffolding

- Initialized a new Vite + React + Typescript project
- Setup Radix themes as the designs use this as a base
- Adjusted theme vars to create the WorkOS accent color scale (Blurple)
- Set up Redux with Redux toolkit to make use of their api querying tools

### Setup the "Users" and "Roles" tab structure

**Status**: ✅ Complete

- Used the Radix themes tabs component to set up the tab structure
- As this was only being set up in one stop in this small app, I did not extract this into custom tabs components.

### Add the users table

**Status**: ✅ Complete

- Created custom Table components using Radix themes table as a base. Mostly just adding default props to the table Root
  - Skipped over the Table footer for pagination for now until I make it to the bonus task.
- Created a users and roles api using Redux toolkit to fetch users and roles.
- Created custom Alert component using the Radix Callout component as a base to show an error if users of roles failed to load.

### Add support for filtering the users table via the "Search" input field

**Status**: ✅ Complete

- Created a custom Button component using Radix themes Button as a base. Limited the colors and variants to match the theme in the designs.
- Updated the getUsers query to take a search string
- Debounced change events from the search input to avoid making a new query every time a new character is typed
- Added alert for when there are no users that match the search string

### Add support for deleting a user via the "more" icon button dropdown menu

**Status**: ✅ Complete

- Added Row actions with a Radix dropdown menu to each row to open the Delete user Alert dialog
- Set up an Alert Dialog to have users confirm that they want to delete the user.

### Add support for viewing all roles in the "Roles" tab

**Status**: ✅ Complete

- Set up a roles table using the existing table components.

### Add support for renaming a role in the "Roles" tab

**Status**: ✅ Complete

- Add row actions to let users select "rename role"
- Set up an Dialog to have users enter a new name for the role.
- On form submission, send the new name to the api with the updateRole mutation

### [Bonus] Add pagination to the user table

**Status**: ❌ Incomplete

To respect the time limit, I didn't get to this step. However, here is how I would have tackled it.

I would split the `<Table.Root />` component into two pieces. `<Table.Root />` for provide the base styles and panel for the table. The second component would be`<Table.Content />` for the actual table tag. This way, the `<Table.Footer />` could be a sibling to the `<Table.Content />` and not break HTMLs strict rules around tables.

To handle the data, I would adjust the getUsers query from Redux to accept a page number and store the page data with the users response.

To improve the usability of the tables, I would implement a roving tabindex in the Tables components so that users don't need to tab through all the rows to get to the previous and next page buttons in the footer.
