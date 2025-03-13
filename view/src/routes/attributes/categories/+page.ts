import { CategoriesService } from '$lib/service/attributes.service';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({}) => {
	const categories = new CategoriesService().list();

	return {
		categories
	};
};
