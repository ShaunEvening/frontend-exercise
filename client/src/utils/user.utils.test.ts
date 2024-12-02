import { describe, it, expect } from "vitest";
import {
  reduceRolesToLookup,
  getRoleById,
  computeInitials,
} from "./user.utils";

import RolesFixture from "./fixtures/roles.fixture";
import UsersFixture from "./fixtures/users.fixture";

describe("UTILS: user.utils", () => {
  describe("UTILS: reduceRolesToLookup", () => {
    it("should return an empty object when no roles are provided", () => {
      expect(reduceRolesToLookup([])).toEqual({});
    });

    it("should return a lookup object with roles", () => {
      const roles = [...RolesFixture];
      const result = reduceRolesToLookup(roles);

      expect(result).toMatchInlineSnapshot(`
        {
          "1a235261-fa93-4845-ab48-ee23895998e6": {
            "createdAt": "2024-08-27T23:16:10.554Z",
            "description": "Engineers build and maintain the software that powers our products and services.",
            "id": "1a235261-fa93-4845-ab48-ee23895998e6",
            "isDefault": false,
            "name": "Engineering",
            "updatedAt": "2024-08-27T23:16:10.554Z",
          },
          "36c8de01-e30a-4682-b8cf-962593a8d3b6": {
            "createdAt": "2024-08-27T23:16:10.554Z",
            "description": "Developer Experience ensures that docs, guides and quick starts are comprehensive and accurate.",
            "id": "36c8de01-e30a-4682-b8cf-962593a8d3b6",
            "isDefault": false,
            "name": "Developer Experience",
            "updatedAt": "2024-08-27T23:16:10.554Z",
          },
          "5237711f-7969-4923-aacc-a623a4e9dac1": {
            "createdAt": "2024-08-27T23:16:10.554Z",
            "description": "Designers create the visual and interactive elements of our products and services.",
            "id": "5237711f-7969-4923-aacc-a623a4e9dac1",
            "isDefault": false,
            "name": "Design",
            "updatedAt": "2024-08-27T23:16:10.554Z",
          },
          "6c0a71c0-a5bc-44f8-8634-60f44840d92a": {
            "createdAt": "2024-08-27T23:16:10.554Z",
            "description": "Support helps customers with issues and questions about our products and services.",
            "id": "6c0a71c0-a5bc-44f8-8634-60f44840d92a",
            "isDefault": true,
            "name": "Support",
            "updatedAt": "2024-08-27T23:16:10.554Z",
          },
        }
      `);
    });
  });

  describe("UTILS: getRoleById", () => {
    it("should return an empty string when no roles are provided", () => {
      const roles = {};
      const user = UsersFixture[0];

      const result = getRoleById(roles, user.roleId);
      expect(result).toBe("");
    });

    it("should return the role when it exists", () => {
      const roles = reduceRolesToLookup(RolesFixture);
      const user = UsersFixture[0];

      const result = getRoleById(roles, user.roleId);
      expect(result).toBe("Design");
    });
  });

  describe("UTILS: computeInitials", () => {
    it("should return the initials of a user", () => {
      const user = UsersFixture[0];
      const result = computeInitials(user);

      expect(result).toBe("MT");
    });
  });
});
