import { Role } from "../../app/services/roles.service";

const roles: Role[] = [
  {
    id: "1a235261-fa93-4845-ab48-ee23895998e6",
    createdAt: "2024-08-27T23:16:10.554Z",
    updatedAt: "2024-08-27T23:16:10.554Z",
    name: "Engineering",
    isDefault: false,
    description:
      "Engineers build and maintain the software that powers our products and services.",
  },
  {
    id: "5237711f-7969-4923-aacc-a623a4e9dac1",
    createdAt: "2024-08-27T23:16:10.554Z",
    updatedAt: "2024-08-27T23:16:10.554Z",
    name: "Design",
    isDefault: false,
    description:
      "Designers create the visual and interactive elements of our products and services.",
  },
  {
    id: "36c8de01-e30a-4682-b8cf-962593a8d3b6",
    createdAt: "2024-08-27T23:16:10.554Z",
    updatedAt: "2024-08-27T23:16:10.554Z",
    name: "Developer Experience",
    isDefault: false,
    description:
      "Developer Experience ensures that docs, guides and quick starts are comprehensive and accurate.",
  },
  {
    id: "6c0a71c0-a5bc-44f8-8634-60f44840d92a",
    createdAt: "2024-08-27T23:16:10.554Z",
    updatedAt: "2024-08-27T23:16:10.554Z",
    name: "Support",
    isDefault: true,
    description:
      "Support helps customers with issues and questions about our products and services.",
  },
];

export default roles;
