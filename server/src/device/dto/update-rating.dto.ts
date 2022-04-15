export type RatingActions = 'PLUS' | 'MINUS' | 'DELETE';

export class UpdateRatingDto {
    readonly deviceId: string;
    readonly action: RatingActions;
}
