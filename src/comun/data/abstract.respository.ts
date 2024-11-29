import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractSchema } from './abstract.schema';
import { DeleteResult } from 'mongodb';

export interface Sort<TDocument> {
  field: keyof TDocument;
  order: 'asc' | 'desc';
}

export interface PageResponse<T> {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  items: T[];
}

export abstract class AbstractRepository<TDocument extends AbstractSchema> {
  protected abstract readonly logger: Logger;

  protected constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Partial<Omit<TDocument, '_id'>>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery).exec();

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findById(id: string): Promise<TDocument> {
    const document = await this.model.findById(id).exec();

    if (!document) {
      this.logger.warn('Document was not found with id', id);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findByIdAndUpdate(
    id: string,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate({ _id: new Types.ObjectId(id) }, update, {
        new: true,
      })
      .exec();

    if (!document) {
      this.logger.warn('Document was not found with id', id);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .exec();

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).exec();
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery).exec();
  }

  async findByIdAndDelete(id: string): Promise<TDocument> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async findAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<DeleteResult> {
    return this.model.deleteMany(filterQuery).exec();
  }

  async queryPage(
    filterQuery: FilterQuery<TDocument>,
    currentPageNumber: number,
    pageSize: number,
    sort: Sort<TDocument>,
  ): Promise<PageResponse<TDocument>> {
    const skip = (currentPageNumber - 1) * pageSize;
    const total = await this.countDocuments(filterQuery);

    const totalPages = Math.ceil(total / pageSize);
    const sortOrder = sort.order === 'asc' ? 1 : -1;
    const items = await this.model
      .find(filterQuery)
      .sort({ [sort.field as string]: sortOrder })
      .skip(skip)
      .limit(pageSize)
      .exec();

    return {
      page: currentPageNumber,
      page_size: pageSize,
      total,
      total_pages: totalPages,
      items,
    };
  }

  async countDocuments(filterQuery: FilterQuery<TDocument>): Promise<number> {
    return this.model.countDocuments(filterQuery).exec();
  }
}
