import { drizzle } from 'drizzle-orm/d1';

import { Bindings } from '../constants';
import { IIdentityUser } from '../interfaces';
import { Services } from '../services';

declare module 'hono' {
  interface ContextVariableMap {
    db: ReturnType<typeof drizzle>;
    token: string | null;
    user: IIdentityUser | null;
    getAuth0ManagementToken: () => Promise<string>;
    getDropboxManagementToken: () => Promise<string>;
    services: Services;
  }

  interface HonoEnv {
    Bindings: Bindings;
  }
}

export {};
