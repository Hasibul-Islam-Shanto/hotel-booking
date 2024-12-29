export const checkAuthError = (error: any) => {
    if (error["cause"]?.["err"]?.toString().includes("Invalid email or password")) {
        return {error: true, message: "Invalid email or password"};
    }
    if (error["cause"]?.["err"]?.toString().includes("User already exist!")) {
        return {error: true, message: "User already exist!"};
    }
    return {error: true, message: "Something went wrong!"};
}