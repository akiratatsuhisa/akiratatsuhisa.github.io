import { useAuth0 } from '@auth0/auth0-react';
import _ from 'lodash';

export enum Role {
  Administrator = 'Administrator',
}

export const useHasRole = () => {
  const { user } = useAuth0();

  return (requiredRoles: Array<Role>) => {
    if (!user) {
      return false;
    }

    return _.some(requiredRoles, (role) => _.includes(user.user_roles, role));
  };
};
