export class GetGenerationListUseCase{
    constructor(private generationRepository: GenerationRepository){

    }

    exec(): Promise<Generation[]>{
        return this.generationRepository.getGenerationList();
    }
}