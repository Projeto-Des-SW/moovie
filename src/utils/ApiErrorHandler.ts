import {isAxiosError} from "axios";

export function ApiErrorHandler(error: unknown) {
    if (isAxiosError(error)) {
        throw new Error(`Erro ${error.status}: ${error.message}`);
    } else {
        throw new Error('Um erro inesperado ocorreu');
    }
}