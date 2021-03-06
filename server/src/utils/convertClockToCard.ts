export const convertClockToCard = (cardClock: number): string => {
    const number = (cardClock % 13) + 1;

    switch (number) {
        case 1: {
            return 'ACE';
        }
        case 11: {
            return 'JACK';
        }
        case 12: {
            return 'QUEEN';
        }
        case 13: {
            return 'KING';
        }
        default:
            return `${number}`;
    }
};

/*
    0 % 13 = 0
    1 % 13 = 1
    2 % 13 = 2
    3 % 13 = 3
    4 % 13 = 4
    5 % 13 = 5
    6 % 13 = 6
    7 % 13 = 7
    8 % 13 = 8
    9 % 13 = 9
    10 % 13 = 10
    11 % 13 = 11
    12 % 13 = 12
    13 % 13 = 0
*/
