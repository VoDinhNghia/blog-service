export interface Igroup {
  name?: string;
  description?: string;
  privateMode?: boolean;
  createdById?: string;
  members?: string[];
}

export interface Imember {
  groupId?: string;
  memberId?: string;
}
