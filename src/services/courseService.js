import { courses } from '../data/courses';

const PAGE_SIZE = 6;

export const getCourses = ({ query = '', category = '', ageRange = '', learningMode = '', maxPrice = '', sort = 'name' } = {}) => {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = courses.filter((course) => {
    const matchesQuery = !normalizedQuery || [course.title, course.description, course.category, course.therapist, ...course.tags]
      .join(' ')
      .toLowerCase()
      .includes(normalizedQuery);

    const matchesCategory = !category || course.category === category;
    const matchesAge = !ageRange || course.ageRange.includes(ageRange);
    const matchesMode = !learningMode || course.tags.includes(learningMode.toLowerCase());
    const matchesPrice = !maxPrice || course.price <= Number(maxPrice);

    return matchesQuery && matchesCategory && matchesAge && matchesMode && matchesPrice;
  });

  const sorted = [...filtered].sort((left, right) => {
    if (sort === 'price') return left.price - right.price;
    return left.title.localeCompare(right.title, 'vi', { sensitivity: 'base' });
  });

  return sorted;
};

export const getPaginatedCourses = (params = {}) => {
  const allCourses = getCourses(params);
  const page = Number(params.page || 1);
  const startIndex = (page - 1) * PAGE_SIZE;
  return {
    items: allCourses.slice(startIndex, startIndex + PAGE_SIZE),
    totalPages: Math.max(1, Math.ceil(allCourses.length / PAGE_SIZE)),
    totalItems: allCourses.length,
  };
};

export const getCourseById = (id) => courses.find((course) => course.id === Number(id));

export const getRecommendedCourses = (form = {}) => {
  const age = Number(form.age || 0);
  const concern = form.mainConcern || '';

  return courses.filter((course) => {
    const matchesAge = course.ageRange.includes(String(age)) || course.ageRange.includes('2 -') || course.ageRange.includes('18 tháng');
    const matchesConcern = concern ? course.category.includes(concern) || course.tags.some((tag) => tag.includes(concern.toLowerCase())) : true;
    return matchesAge && matchesConcern;
  }).slice(0, 4);
};
