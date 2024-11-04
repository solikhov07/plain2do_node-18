export const rolesPermissions = {
  "system admin": {
    projects: {
      canView: true,
      canAdd: true,
      canEdit: true,
      canDelete: true,
    },
    budgets: {
      canView: true,
      canAdd: true,
      canEdit: true,
      canDelete: true,
    },
    employeeList: {
      canView: true,
      canAdd: true,
      canEdit: true,
      canDelete: true,
    },
    employeeCard: {
      canView: true,
      canAdd: true,
      canEdit: true,
      canDelete: true,
    },
    timesheet: {
      canView: true,
      canAdd: true,
      canEdit: true,
      canDelete: true,
    },
  },
  "project admin": {
    projects: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    budgets: {
      canView: false,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    employeeList: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    employeeCard: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    timesheet: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
  },
  "budget manager": {
    projects: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    budgets: {
      canView: true,
      canAdd: true,
      canEdit: true,
      canDelete: true,
    },
    employeeList: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    employeeCard: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    timesheet: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
  },
  "budget user": {
    projects: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    budgets: {
      canView: true,
      canAdd: true,
      canEdit: false,
      canDelete: false,
    },
    employeeList: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    employeeCard: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    timesheet: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
  },
  "hr user": {
    projects: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    budgets: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    employeeList: {
      canView: true,
      canAdd: true,
      canEdit: false,
      canDelete: false,
    },
    employeeCard: {
      canView: true,
      canAdd: true,
      canEdit: false,
      canDelete: false,
    },
    timesheet: {
      canView: true,
      canAdd: true,
      canEdit: true,
      canDelete: false,
    },
  },
  "hr manager": {
    projects: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    budgets: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    employeeList: {
      canView: true,
      canAdd: true,
      canEdit: true,
      canDelete: false,
    },
    employeeCard: {
      canView: true,
      canAdd: true,
      canEdit: true,
      canDelete: false,
    },
    timesheet: {
      canView: true,
      canAdd: true,
      canEdit: true,
      canDelete: true,
    },
  },
  timekeeper: {
    projects: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    budgets: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    employeeList: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    employeeCard: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
    timesheet: {
      canView: true,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    },
  },
};

export const defaultPermissions = {
  projects: {
    canView: false,
    canAdd: false,
    canEdit: false,
    canDelete: false,
  },
  budgets: {
    canView: false,
    canAdd: false,
    canEdit: false,
    canDelete: false,
  },
  employeeList: {
    canView: false,
    canAdd: false,
    canEdit: false,
    canDelete: false,
  },
  employeeCard: {
    canView: false,
    canAdd: false,
    canEdit: false,
    canDelete: false,
  },
  timesheet: {
    canView: false,
    canAdd: false,
    canEdit: false,
    canDelete: false,
  },
};
