import { StudyGroupMembers } from '../entities/study-group-member.entity';
import { AppDataSource } from '../data-source';
import { StudyGroups } from '../entities/study-group.entity';
import {
  Igroup,
  IqueryGroup,
  IupdateGroup,
} from '../interfaces/group.interface';
import { uniq } from 'lodash';
import { Response } from 'express';
import { CommonException } from '../exceptions/exceptions.common-error';
import { groupMsg } from '../constants/constants.message-response';
import { Equal, Like } from 'typeorm';
import { selectGroup } from '../utils/utils.select-fields';
import { groupRelations } from '../utils/utils.relation-field';

export class GroupService {
  private groupRepository = AppDataSource.getRepository(StudyGroups);
  private memberRepository = AppDataSource.getRepository(StudyGroupMembers);
  private selectFields: string[] | unknown = selectGroup;
  private selectUpdate: string[] | unknown = ['id', 'createdById'];

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

  async updateGroup(
    res: Response,
    groupId: string,
    body: IupdateGroup,
    userId: string
  ): Promise<StudyGroups | object> {
    const group = await this.groupRepository.findOne({
      where: {
        id: groupId,
      },
      select: this.selectUpdate,
    });
    if (!group) {
      return new CommonException(res, 404, groupMsg.notFound);
    }
    if (group.createdById !== userId) {
      return new CommonException(res, 403, groupMsg.notPermission);
    }
    await this.groupRepository.update(groupId, body);
    const result = await this.findGoupById(res, groupId);
    return result;
  }

  async deleteGroup(
    res: Response,
    groupId: string,
    userId: string
  ): Promise<void | object> {
    const group = await this.groupRepository.findOne({
      where: {
        id: groupId,
      },
      select: this.selectUpdate,
    });
    if (!group) {
      return new CommonException(res, 404, groupMsg.notFound);
    }
    if (group.createdById !== userId) {
      return new CommonException(res, 403, groupMsg.notPermission);
    }
    await this.groupRepository.softRemove(group);
  }

  async addAndUpdateNewMembers(groupId: string, members = []): Promise<void> {
    const memberGroup = await this.memberRepository.find({
      where: { groupId: Equal(groupId) },
      select: ['id', 'memberId', 'groupId'],
    });
    const newMemberDto = [];
    for (const member of members) {
      const checkMember = memberGroup.find(
        (item: StudyGroupMembers) => String(item.memberId) === String(member)
      );
      if (!checkMember && member) {
        newMemberDto.push({
          memberId: member,
          groupId,
        });
      }
    }
    await this.memberRepository.save(newMemberDto);
  }

  async findGoupById(
    res: Response,
    groupId: string
  ): Promise<StudyGroups | object> {
    const result = await this.groupRepository.findOne({
      where: {
        id: groupId,
      },
      relations: groupRelations,
      select: this.selectFields,
    });
    if (!result) {
      return new CommonException(res, 404, groupMsg.notFound);
    }
    return result;
  }

  async findAllGroupOfMe(
    queryDto: IqueryGroup,
    userId: string
  ): Promise<{ results: StudyGroups[]; total: number }> {
    const { limit, page, privateMode, searchKey } = queryDto;
    const query: IqueryGroup = { createdById: userId };
    if (privateMode) {
      query.privateMode = privateMode;
    }
    if (searchKey) {
      query.name = Like(`%${searchKey}%`);
    }
    const results = await this.groupRepository.find({
      where: query,
      skip: limit && page ? Number(limit) * (Number(page) - 1) : null,
      take: limit ? Number(limit) : null,
      relations: groupRelations,
      order: {
        createdAt: 'DESC',
      },
      select: this.selectFields,
    });
    const total = await this.groupRepository.findAndCount({
      where: query,
    });
    return { results, total: total[1] ?? 0 };
  }
}
