export function valueOrDefault<T>(value: T, defaultValue: T|null): T {
    return (typeof(value) !== 'undefined' && value !== null ? value : defaultValue);
}