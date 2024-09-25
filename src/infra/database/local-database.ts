import { Database } from "@/data/database/database";

export class LocalDatabase implements Database {

  private readonly data: {[collection_name: string]: {[id: string]: any}};
  constructor() {
    this.data = {};
  }

  async insert(collection_name: string, data: any): Promise<void> {
    if(!this.data[collection_name])
      this.data[collection_name] = {};

    this.data[collection_name][data.id] = data;
  }

  async update(collection_name: string, data: any): Promise<void> {
    if(!this.data[collection_name])
      this.data[collection_name] = {};

    this.data[collection_name][data.id] = data;
  }

  load(collection_name: string): Promise<any[]> {
    throw new Error("Method not implemented.");
  }

  find(collection_name: string, query: any): Promise<any[]> {
    throw new Error("Method not implemented.");
  }

  async findById(collection_name: string, id: string): Promise<any> {

    if(!this.data[collection_name])
      this.data[collection_name] = {};

    return this.data[collection_name][id];
  }
}