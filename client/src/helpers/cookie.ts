export function getTokenFromCookie(): string | null {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    return token ? token : null;
}

export function setTokenInCookie(token: string): void {
    document.cookie = `token=${token}; path=/; Max-Age=${60 * 60 * 24 * 400}`; // 400 days (max value for Max-Age)
}