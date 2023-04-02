import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { ColumnDate, ColumnPhone, ColumnString, ColumnText, ColumnTinyInt } from "./columns";

@Entity('question-type')
export class QuestionType {
  @PrimaryGeneratedColumn()
  id: number;

  @ColumnString()
  name: string;

  @ColumnText()
  description: string;
}
