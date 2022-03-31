import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class BaseDateEntity {
  // Add createdAt typeorm column
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Add updatedAt typeorm column
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Add deletedAt typeorm column
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
