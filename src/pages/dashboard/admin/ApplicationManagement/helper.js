export const getUserDataByApplicationId = (data, targetId) => {
    // Find the object with the matching _id
    const filteredItem = data.find(item => item._id === targetId);
    
    // Check if the item is found and contains user_data
    if (filteredItem && filteredItem.user_data && filteredItem.user_data.length > 0) {
        const { name, email } = filteredItem.user_data[0]; // Destructure name and email from user_data
        return { name, email }; // Return the name and email
    } else {
        return null; // Return null if _id not found or user_data is missing
    }
};