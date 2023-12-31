export const makeArray = (length: number) => new Array(length).fill(null)
export const random = (min: number, max: number) => Math.round (Math.random() * (max - min)) + min
export const unsplashUrl = (width: number, height: number): string => `https://source.unsplash.com/random/${width}x${height}`
export const avatarUriByName = (name: string) => `https://ui-avartars.com/random/${name.split(' ').join('+')}`