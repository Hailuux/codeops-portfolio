// Shared form/API validation schema. Kept dependency-free for this learning project.
export const orderSchema = {
  fields: ["name", "email", "address"],
  validate(input) {
    const fieldErrors = {};
    const name = typeof input.name === "string" ? input.name.trim() : "";
    const email = typeof input.email === "string" ? input.email.trim() : "";
    const address = typeof input.address === "string" ? input.address.trim() : "";
    if (name.length < 2 || name.length > 100) fieldErrors.name = ["Enter a name between 2 and 100 characters."];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) fieldErrors.email = ["Enter a valid email address."];
    if (address.length < 5 || address.length > 300) fieldErrors.address = ["Enter a delivery address between 5 and 300 characters."];
    return {
      success: Object.keys(fieldErrors).length === 0,
      data: { name, email, address },
      fieldErrors,
    };
  },
};
