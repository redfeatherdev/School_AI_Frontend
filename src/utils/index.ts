const flatDeep = function (arr: any[], d: number = 1) { // Specify 'arr' as an array of any type
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), []) : arr.slice();
}

const slugify = function (text: string) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

const containsObject = function (obj: { slug: string }, list: { slug: string }[]) { // Specify types for 'obj' and 'list'
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].slug === obj.slug) {
            return i;
        }
    }
    return -1;
}

const formatPrice = (number: any) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number)
}

const getUniqueValues = (data: { [key: string]: any }[], type: string, withAll = 'active') => {
    let unique = data.map((item) => item[type]);
    if (withAll === 'active') {
        return ['all', ...new Set(unique)];
    } else {
        return [...new Set(unique)];
    }
}

const getUniqueValues2 = (data: { itemName: string }[], itemName: string) => {
    const items = data.map(item => {
        return item.itemName;
    });

    let singleCatArray = flatDeep(items);
    let itemArray: { title: string; slug: string; count: number }[] = [];
    singleCatArray.forEach((cat: string) => {
        const obj = {
            title: cat.trim(),
            slug: slugify(cat),
            count: 1
        }
        const objIndex = containsObject(obj, itemArray);
        if (objIndex !== -1) {
            const prevCount = itemArray[objIndex].count;
            itemArray[objIndex] = {
                title: cat.trim(),
                slug: slugify(cat),
                count: prevCount + 1
            }
        } else {
            itemArray.push(obj);
        }
    });
}

export { flatDeep, slugify, containsObject, formatPrice, getUniqueValues, getUniqueValues2 }