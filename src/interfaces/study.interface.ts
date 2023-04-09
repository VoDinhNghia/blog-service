export interface IcreateTopic {
  name?: string;
  description?: string;
  createdById?: string;
  groupId?: string;
}

export interface IresultFindGroup {
  id?: string;
  privateMode?: boolean;
  members?: IresultMember[];
  createdById?: string;
}

export interface IresultMember {
  id?: string;
  memberId?: string;
}

export interface Icreateproblem {
  problem?: string;
  topicId?: string;
  createdById?: string;
}

export interface IcreateSolution {
  problemId?: string;
  createdById?: string;
  solution?: string;
}

export interface IresultSolution {
  id?: string;
  solution?: string;
  problem?: {
    createdById?: string;
  };
  createdById?: string;
}
