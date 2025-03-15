import { decodeServiceException } from '$lib/pocketbase';
import { getContext, setContext } from 'svelte';

type AttributesContext = {
	serverError: string;
};

const key = 'attributesContext';

let context: AttributesContext = $state({ serverError: '' });

export function createAttributesContext() {
	return setContext(key, context);
}

export function getAttributesContext() {
	return getContext<AttributesContext>(key);
}

export function setServerError(error: unknown) {
	context.serverError = decodeServiceException(error);
}
