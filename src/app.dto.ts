export class CreateCardDto {
    readonly title: string;
    readonly prevPosition: string;
    readonly nextPosition: string;
}

export class UpdateCardDto {
    readonly _id: string;
    readonly prevPosition: string;
    readonly nextPosition: string;
}