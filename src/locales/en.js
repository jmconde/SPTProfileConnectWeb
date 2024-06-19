export default {
  404: {
    title: '404',
    message: 'Page not found',
  },
  header: {
    brand: 'SPT Quests',
    adminPanel: 'Administration Panel',
    profile: 'Profile ({username})',
    logout: 'Logout',
    login: 'Login',    
  },
  userTokens: {
    noApiKeysFound: 'No API keys found',
    generate: 'Generate Api Key',
    modal: {
      creation: {
        title: 'Generate API Key',
        message: 'Are you sure you want to generate a new API key?',
        confirm: 'Generate',
        cancel: 'Cancel',
      },
      deletion: {
        title: 'Delete API Key',
        message: 'Are you sure you want to delete this API key?',
        confirm: 'Delete',
        cancel: 'Cancel',
      },
      description: 'API Key Description (optional)'
    },
  },
  adminUsers: {
    title: 'Users',
    noUsersFound: 'No users found',
    table: {

    },
    modal: {
      deletion: {
        title: 'Delete User',
        message: 'Are you sure you want to delete this user?',
        confirm: 'Delete',
        cancel: 'Cancel',
      },
    },
  },
  button: {
    add: 'Add',
    back: 'Back',
    cancel: 'Cancel',
    changePassword: 'Change Password',
    createNamespace: 'Create Namespace',
    createUser: 'Create User',
    delete: 'Delete',
    edit: 'Edit',
    generate: 'Generate',
    login: 'Login',
    logout: 'Logout',
    resetLink: 'Send Reset Link',
    save: 'Save',
    setNewPassword: 'Set New Password',
    updateNamespace: 'Update Namespace',
    updateUser: 'Update User',
    validateCode: 'Validate Code',
    view: 'View',
  },
  label: {
    characterId: 'Character ID',
    email: 'Email address',
    firstName: 'First Name',
    lastName: 'Last Name',
    name: 'Name',
    newPassword: 'New Password',
    oldPassword: 'Old Password',
    password: 'Password',
    passwordConfirmation: 'Password Confirmation',
  },
  roles: {
    admin: 'Admin',
    user: 'User',
  },
  title: {
    adminPage: 'Admin Page',
    apiKeys: 'API Keys',
    confirmModal: 'Confirm Action',
    createNamespace: 'Create Namespace',
    createUser: 'Create User',
    defaultNamespace: 'Default Namespace',
    deleteNamespaceModal: 'Delete Namespace',
    deleteUserModa: 'Delete User',
    editNamespace: 'Edit Namespace',
    editUser: 'Edit User',
    forgottenPassword: 'Forgotten Password',
    gameCount: 'Common quests',
    generatorAlert: 'Generator Alert',
    namespaceApiKeys: 'Namespace API Keys',
    namespaces: 'Namespaces',
    passwordChange: 'Password Change',
    raidInProgress: '{n, plural, one {Raid} other {Raids}} in progress',
    userProfile: 'User Profile',
  },
  link:{
    forgottenPassword: 'Forgotten Password',
  },
  message: {
    deleteNamespaceModal: 'Are you sure you want to delete this namespace?',
    deleteUserModal: 'Are you sure you want to delete this user?',
    enterCode: 'Please enter the code sent to your email',
    enterNewPassword: 'Please enter your new password and confirm it',
    enterUsername: 'Please enter your username',
    forgottenPassword: 'Enter your username we will send you a link to reset your password.',
    generatorOn: '<span>{nickname}</span> has generator on, <span class="fw-bold">{fuelLeft}%</span> fuel remaining.',
    invalidCode: 'Invalid code',
    passwordMismatch: 'Passwords do not match',
    proceedConfirmation: 'Are you sure you want to proceed?',
    raidTeam: 'Team {team}:',
    raidUsers: '{users} as {character} on {location}',
    recoveryCodeValidated: 'Your code has been validated. You can now reset your password.',
    recoveryMailSent: 'An email has been sent to your email address with a code to insert in the field below.',
  },
  placeholder: {
    enterRecoveryCode: 'Enter the code sent to your email',
    enterUsername: 'Enter your username',
    newPassword: 'Enter your new password',
    passwordConfirmation: 'Confirm your password',
    search: 'Search...',
    selectLocation: 'Select location...',
    selectTrader: 'Select trader...',
    selectUsers: 'Select users...',
  },
  common: {
    actions: 'Actions',
    cancel: 'Cancel',
    clear: 'Clear',
    close: 'Close',
    confirm: 'Confirm',
    create : 'Create',
    description: 'Description',
    level: 'Level',
    loading: 'Loading...',
    moderate: 'Moderate',
    namespace: 'Namespace',
    namespaces: 'Namespaces',
    ok: 'OK',
    quest: '{n, plural, =0 {No quests} one {# Quest} other {# Quests}}',
    roles: 'Roles',
    search: 'Search',
    strong: 'Strong',
    update: 'Update',
    username: 'Username',
    users: 'Users',
    weak: 'Weak',
  },
  toast: {
    namespaceCreationFailed: 'Failed to create namespace',
    namespaceCreationSuccessful: 'Namespace created successfully',
    namespaceDeletionFailed: 'Failed to delete namespace',
    namespaceDeletionSuccessful: 'Namespace deleted successfully',
    namespaceUpdateFailed: 'Failed to update namespace',
    namespaceUpdateSuccessful: 'Namespace updated successfully',
    userCreationFailed: 'Failed to create user',
    userCreationSuccessful: 'User created successfully',
    userDeletionFailed: 'Failed to delete user',
    userDeletionSuccessful: 'User deleted successfully',
    userUpdateFailed: 'Failed to update user',
    userUpdateSuccessful: 'User updated successfully',
  }
}