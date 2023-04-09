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
