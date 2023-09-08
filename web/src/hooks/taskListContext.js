// Use this file to supply a context hook that stores the list of tasks
import { createContext } from "react";

//Creating the context with an empty array as intial value.
const TaskListContext = createContext([]);

//exporting the context
export { TaskListContext }