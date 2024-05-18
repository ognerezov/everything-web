export function getDividers(n : number) : number [] {
    let min : number = 2;
    let max : number = div(n,2);
    const resMin : number [] =[];
    const resMax : number [] = [];
    while (min < max){
        const rem : number = n % min;
        if (rem === 0){
            resMin.push(min);
            resMax.unshift(max);
        }
        min ++;
        max = div(n, min);
        if(min === max && min * max === n){
            resMin.push(min);
        }
    }

    return [...resMin,...resMax];
}

export function div(n1 : number, n2 : number ) : number {
    return (n1 - (n1 %n2))/n2;
}

export function getLevel(n : number):number {
    if (n<=0){
        return 0;
    }
    let res : number = 1;
    let next = 3;

    while (n > next){
        res ++;
        next += res+1;
    }
    return res;
}