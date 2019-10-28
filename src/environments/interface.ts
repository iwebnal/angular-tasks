import { Priority, Status } from 'src/app/shared/interfaces';

export interface Environment {
    production: boolean,
    apiKey: string,
    fbDbUrl: string,
    priorities: Priority[],
    statuses: Status[]
}