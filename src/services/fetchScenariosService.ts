import { PrismaRepository } from "../repositories/prisma-repository";


export class FetchScenariosUseCase{

    constructor(private prismaRepository: PrismaRepository){}

    async execute(){

        const data  = await this.prismaRepository.fetchScenarios()

        return data

    }

}