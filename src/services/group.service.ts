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
import { CommonException } from '../exceptions/common-error.exception';
import { groupMsg } from '../constants/message-response.constant';
import { Equal, In, Like } from 'typeorm';
import { groupRelations } from '../utils/relation-field.util';
import { httpStatusCode } from '../constants/http-status-code.constant';

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
    });
    if (!group) {
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        groupMsg.notFound
      );
    }
    if (group.createdById !== userId) {
      return new CommonException(
        res,
        httpStatusCode.FORBIDEN,
        groupMsg.notPermission
      );
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
    });
    if (!group) {
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        groupMsg.notFound
      );
    }
    if (group.createdById !== userId) {
      return new CommonException(
        res,
        httpStatusCode.FORBIDEN,
        groupMsg.notPermission
      );
    }
    await this.groupRepository.softRemove(group);
  }

  async addAndUpdateNewMembers(groupId: string, members = []): Promise<void> {
    const memberGroup = await this.memberRepository.find({
      where: { groupId: Equal(groupId) },
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

  async deleteMember(
    res: Response,
    id: string,
    userId: string
  ): Promise<void | object> {
    const member = await this.memberRepository.findOne({
      where: {
        id: Equal(id),
      },
      relations: {
        group: true,
      },
    });
    if (!member) {
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        groupMsg.notFoundMember
      );
    }
    if (String(userId) !== String(member?.group?.createdById)) {
      return new CommonException(
        res,
        httpStatusCode.FORBIDEN,
        groupMsg.notPermissionMember
      );
    }
    await this.memberRepository.delete(id);
  }

  async memberLeaveGroup(
    res: Response,
    groupId: string,
    userId: string
  ): Promise<void | object> {
    const member = await this.memberRepository.findOne({
      where: {
        groupId: Equal(groupId),
        memberId: userId,
      },
    });
    if (!member) {
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        groupMsg.notFoundMember
      );
    }
    await this.memberRepository.delete(member?.id);
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
    });
    if (!result) {
      return new CommonException(
        res,
        httpStatusCode.NOT_FOUND,
        groupMsg.notFound
      );
    }
    return result;
  }

  async findAllGroups(
    queryDto: IqueryGroup,
    userId: string
  ): Promise<{ results: StudyGroups[]; total: number }> {
    const { limit, page, searchKey, createdById } = queryDto;
    const query: IqueryGroup = { privateMode: false };
    let orGroup = null;
    if (createdById) {
      const groupMember = await this.memberRepository.find({
        where: {
          memberId: Equal(createdById),
        },
      });
      const groupIds = groupMember?.map((member) => {
        return member?.groupId;
      });
      query.createdById = createdById;
      if (String(userId) === String(createdById)) {
        query.privateMode = In([true, false]);
        orGroup = {
          privateMode: In([true, false]),
          id: In(groupIds),
        };
      } else {
        orGroup = {
          privateMode: false,
          id: In(groupIds),
        };
      }
    }
    if (searchKey) {
      query.name = Like(`%${searchKey}%`);
    }
    const queryWhere = orGroup ? [orGroup, query] : query;
    const results = await this.groupRepository.find({
      relations: groupRelations,
      where: queryWhere,
      skip: limit && page ? Number(limit) * (Number(page) - 1) : null,
      take: limit ? Number(limit) : null,
      order: {
        createdAt: 'DESC',
      },
    });
    const total = await this.groupRepository.findAndCount({
      where: query,
    });
    return { results, total: total[1] ?? 0 };
  }
}
