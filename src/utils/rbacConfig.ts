export const roles:any = {
  1: {
    can: [
      "create:property",
      "update:property",
      "delete:property",
      "view:property",
      "view:users",
      "create:users",
      "update:users",
      "delete:users",
      "view:leads",
      "create:leads",
      "update:leads",
      "delete:leads",
      "view:reservations",
      "create:reservations",
      "update:reservations",
      "delete:reservations",
      "view:leadassignments",
      "create:leadassignments",
      "update:leadassignments",
      "delete:leadassignments",
    ],
  },
  2: {
    can: ["create:lead", "update:lead", "view:property", "view:leads",],
  },
};

