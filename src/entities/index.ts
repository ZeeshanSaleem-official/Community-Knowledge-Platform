// Barrel file for all entities - import order matters to avoid circular dependencies
// Import entities that don't have dependencies first, then ones that depend on them

import "reflect-metadata";

// Base entities (no foreign key dependencies on other custom entities)
export { VerificationToken } from "./VerificationToken";
export { User } from "./User";
export { Topic } from "./Topic";

// Entities with dependencies
export { Account } from "./Account";
export { Session } from "./Session";
export { Post } from "./Post";
export { Comment } from "./Comment";
