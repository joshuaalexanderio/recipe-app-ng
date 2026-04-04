import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  TodoistProject,
  TodoistTask,
  TodoistConnectionStatus,
  TodoistShoppingListRequest,
  TodoistShoppingListResponse
} from '../models/todoist';

@Injectable({ providedIn: 'root' })
export class TodoistApi {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/todoist`;
  private authUrl = `${environment.apiUrl}/api/auth/todoist`;

  getConnectionStatus() {
    return this.http.get<TodoistConnectionStatus>(`${this.authUrl}/status`);
  }

  disconnect() {
    return this.http.post<TodoistConnectionStatus>(`${this.authUrl}/disconnect`, {});
  }

  getAuthorizeUrl() {
    return this.http.get<{ url: string }>(`${this.authUrl}/authorize`);
  }

  getProjects() {
    return this.http.get<TodoistProject[]>(`${this.baseUrl}/projects`);
  }

  getTasks(projectId?: string) {
    const params = projectId ? { projectId } : {};
    return this.http.get<TodoistTask[]>(`${this.baseUrl}/tasks`, {});
  }

  closeTask(taskId: string) {
    return this.http.post<void>(`${this.baseUrl}/tasks/${taskId}/close`, {});
  }

  reopenTask(taskId: string) {
    return this.http.post<void>(`${this.baseUrl}/tasks/${taskId}/reopen`, {});
  }

  deleteTask(taskId: string) {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${taskId}`);
  }

  sendToShoppingList(request: TodoistShoppingListRequest) {
    return this.http.post<TodoistShoppingListResponse>(`${this.baseUrl}/shopping-list`, request);
  }
}
