import { StudyGroupMembers } from '../entities/study-group-member.entity';
import { AppDataSource } from '../data-source';
import { StudyGroups } from '../entities/study-group.entity';
import { Igroup } from '../interfaces/group.interface';

export class GroupService {
  private groupRepository = AppDataSource.getRepository(StudyGroups);
  private memberRepository = AppDataSource.getRepository(StudyGroupMembers);

  async createGroup(body: Igroup, userId: string): Promise<StudyGroups> {
    const createDto = {
      ...body,
      createdById: userId,
    };
    const result = await this.groupRepository.save(createDto);
    return result;
  }
}
