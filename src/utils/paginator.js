const paginate = (array, page_size, page_number) => {
    // Calculate the start and end indices for slicing the array
    const start = (page_number - 1) * page_size;
    const end = start + page_size;

    // Return the sliced array and pagination info
    return {
        data: array.slice(start, end),
        total: array.length,
        page: page_number,
        pageSize: page_size,
        totalPages: Math.ceil(array.length / page_size),
    };
};

module.exports = paginate;