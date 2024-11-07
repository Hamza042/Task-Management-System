export const patterns = {
	email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};
export const categories = ["Development", "Design", "Testing", "Deployment", "Maintenance"];
export type EditableFields = 'name' | 'description' | 'priority' | 'category' | 'duedate' | 'username' | 'status';