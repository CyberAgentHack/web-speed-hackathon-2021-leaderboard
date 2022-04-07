
declare module '*/queue.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const lineup: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/signup.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const signup: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/team.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const createTeam: DocumentNode;
export const joinTeam: DocumentNode;
export const leaveTeam: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/sample.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const sample: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/teams.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const listTeams: DocumentNode;
export const listTeamsPrev: DocumentNode;
export const teamsInfo: DocumentNode;

  export default defaultDocument;
}
    