import { StudyGroupMembers } from '../entities/study-group-member.entity';
import { AppDataSource } from '../data-source';
import { StudyGroups } from '../entities/study-group.entity';
import { Igroup } from '../interfaces/group.interface';
import { uniq } from 'lodash';

export class GroupService {
  private groupRepository = AppDataSource.getRepository(StudyGroups);
  private memberRepository = AppDataSource.getRepository(StudyGroupMembers);

  async createGroup(body: Igroup, userId: string): Promise<StudyGroups> {
    const { name, description, privateMode, members = [] } = body;
    const createDto = {
      name,
      description,
      privateMode,
      createdById: userId,
    };
    const group = await this.groupRepository.save(createDto);
    const memberList = uniq(members);
    const memberDto = memberList.map((user: string) => {
      return {
        memberId: user,
        groupId: group.id,
      };
    });
    await this.memberRepository.save(memberDto);
    return group;
  }
}
