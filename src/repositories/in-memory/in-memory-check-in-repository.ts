import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id);

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn;
    }

    return checkIn;
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((checkIn) => checkIn.id === id);

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async countByUserId(userId: string): Promise<number> {
    const items = await this.items.filter(
      (checkIn) => checkIn.user_id === userId
    ).length;

    return items;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const items = await this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20);

    return items;
  }

  async findUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("day");
    const endOfTheDay = dayjs(date).endOf("day");

    const checkInSameData = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);

      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInSameData) {
      return null;
    }

    return checkInSameData;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
