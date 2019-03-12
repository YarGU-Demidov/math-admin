import { User } from "./User";
import Entity from "./Entity";
import { Person } from "./Person";
export class Professor extends Entity<string> {
  public personId: string;
  public person: Person;
  public faculty: string;
  public department: string;
  public description: string;
  public mathNetLink: string;
  public status: string;
  public scientificTitle: string;
  public graduated: string[];
  public theses: string[];
  public termPapers: string[];
  public bibliographicIndexOfWorks: string[];
  constructor() {
    super();
  }
}
