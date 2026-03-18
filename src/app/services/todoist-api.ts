import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private baseUrl = '/api/todoist';
  private authUrl = '/api/auth/todoist';

  // ── Connection ──────────────────────────────────────────────────

  getConnectionStatus() {
    return this.http.get<TodoistConnectionStatus>(`${this.authUrl}/status`);
  }

  disconnect() {
    return this.http.post<TodoistConnectionStatus>(`${this.authUrl}/disconnect`, {});
  }

  getAuthorizeUrl(): string {
    return `${this.authUrl}/authorize`;
  }

  // ── Projects ────────────────────────────────────────────────────

  getProjects() {
    return this.http.get<TodoistProject[]>(`${this.baseUrl}/projects`);
  }

  // ── Tasks ───────────────────────────────────────────────────────

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

  // ── Shopping List ─────────────────────────────────────────────

  sendToShoppingList(request: TodoistShoppingListRequest) {
    return this.http.post<TodoistShoppingListResponse>(`${this.baseUrl}/shopping-list`, request);
  }
}
