import { createContext, useState, useEffect } from 'react';

import {getCategoriesAndDocuments} from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategories] = useState({});

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap =  await getCategoriesAndDocuments();
			console.log(categoryMap);
			setCategories(categoryMap);
		}

		getCategoriesMap();
	}, []);

	const value = { categoriesMap};

	return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider> 
}

