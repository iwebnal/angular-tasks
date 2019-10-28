import { Environment } from './interface';

export const environment: Environment = {
  production: true,
  apiKey: 'AIzaSyALGmTtzuvPO16B3feA3yKKdWhJKa5JPA8',
  fbDbUrl: 'https://angular-tasks-ec80a.firebaseio.com',
  priorities: [
    {name: 'low-priority', id: 1},
    {name: 'medium-priority', id: 2},
    {name: 'high-priority', id: 3}
  ],
  statuses: [
    {name: 'Todo'},
    {name: 'Doing'},
    {name: 'Done'}
  ],
};
