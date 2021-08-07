export type Marks = {
    [key: string]: {
        periods: {
            all: {
                value: number,
                date: Date,
                topic: string,
                name: string,
            }[],
            total?: number,
        }[],
        total?: number,
    }
}
