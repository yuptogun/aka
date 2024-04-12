import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Shortlink {
  /** PK */
  @PrimaryGeneratedColumn()
  id: number;

  /** 사용자가 줄이고자 하는 URL */
  @Column('varchar')
  url: string;

  /** URL에 고유 할당한 코드. aka.eojin.dev/~ 자리에 들어가게 됨 */
  @Column('varchar')
  code: string;

  /** 다음 수정을 위한 1회용 인증토큰. 로그인 없이 authorization 구현하기 위함 */
  @Column('varchar')
  update_token: string;

  /** 최종 저장한 사람의 IP. 로그인 없이 rate limit 구현하기 위함 */
  @Exclude()
  @Column('varchar')
  saved_from: string;

  /** 최초생성일시 */
  @CreateDateColumn()
  created_at: Date;

  /** 최종수정일시 */
  @UpdateDateColumn()
  updated_at: Date;

  /** "삭제"일시 */
  @DeleteDateColumn()
  deleted_at: Date | null;
}
