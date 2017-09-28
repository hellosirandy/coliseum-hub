export class Stadium  {
  
  constructor(
    public name: string,
    public sports: any,
    public leagues: any,
    public tenants: any,
    public location: string,
    public architect: string,
    public openingDate: string,
    public capacity: number,
    public images: string[],
  ) {}
}
