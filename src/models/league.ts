import { Sport } from './sport'

export class League {
  
  constructor(
    public sport: Sport,
    public name: string,
    public logo: string
  ) {}
}
