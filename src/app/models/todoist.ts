export interface TodoistProject {
  id: string;
  name: string;
  color: string;
  parentId: string | null;
  order: number;
  commentCount: number;
  shared: boolean;
  favorite: boolean;
  inboxProject: boolean;
  viewStyle: string;
  url: string;
}

export interface TodoistTask {
  id: string;
  projectId: string;
  sectionId: string | null;
  content: string;
  description: string;
  completed: boolean;
  labels: string[];
  parentId: string | null;
  order: number;
  priority: number;
  due: TodoistDue | null;
  url: string;
  commentCount: number;
  creatorId: string;
}

export interface TodoistDue {
  string: string;
  date: string;
  recurring: boolean;
  datetime: string | null;
  timezone: string | null;
}

export interface TodoistConnectionStatus {
  connected: boolean;
  message: string;
}

export interface TodoistShoppingListRequest {
  recipeId: number;
  ingredientIds: number[];
  projectId: string | null;
}

export interface TodoistShoppingListResponse {
  projectId: string;
  projectName: string;
  taskCount: number;
  taskIds: string[];
}
