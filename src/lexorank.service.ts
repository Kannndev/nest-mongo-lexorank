import { Injectable } from '@nestjs/common';
import { LexoRank } from "lexorank";

@Injectable()
export class LexorankService {

    getNextRank(prevRank, nextRank): [string, boolean] {
        try {
            if (!prevRank && !nextRank) {
                // 1st one
                return [LexoRank.middle().toString(), false];
            }
            if (!prevRank && nextRank) {
                // moved to 1st position
                const minRank = LexoRank.min();
                const nextLexoRank = LexoRank.parse(nextRank);
                return [minRank.between(nextLexoRank).toString(), false];
            }
            if (prevRank && !nextRank) {
                // moved to last position
                const maxRank = LexoRank.max();
                const prevLexoRank = LexoRank.parse(prevRank);
                return [prevLexoRank.between(maxRank).toString(), false];
            }
            // inbetween
            return [LexoRank.parse(prevRank).between(LexoRank.parse(nextRank)).toString(), false];
        } catch (err) {
            return ['', true]
        }
    }

    rebalancingRank(prevRank) {
        if (!prevRank) {
            return LexoRank.middle().toString();
        }
        return LexoRank.parse(prevRank).genNext().toString();
    }
}
