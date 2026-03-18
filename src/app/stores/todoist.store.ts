import { Injectable, inject, signal, computed } from '@angular/core';
import { TodoistApi } from '../services/todoist-api';
import {
  TodoistProject,
  TodoistTask,
  TodoistConnectionStatus,
  TodoistShoppingListRequest,
  TodoistShoppingListResponse
} from '../models/todoist';

@Injectable({ providedIn: 'root' })
export class TodoistStore {
  private api = inject(TodoistApi);

  // ── State ─────────────────────────────────────────────────────

  readonly connected = signal<boolean>(false);
  readonly projects = signal<TodoistProject[]>([]);
  readonly tasks = signal<TodoistTask[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly lastShoppingListResult = signal<TodoistShoppingListResponse | null>(null);

  // ── Computed ──────────────────────────────────────────────────

  readonly hasProjects = computed(() => this.projects().length > 0);
  readonly hasTasks = computed(() => this.tasks().length > 0);

  // ── Connection ────────────────────────────────────────────────

  checkConnection() {
    this.api.getConnectionStatus().subscribe({
      next: (status) => this.connected.set(status.connected),
      error: () => this.connected.set(false)
    });
  }

  connect() {
    // Redirect to backend OAuth endpoint — browser handles the flow
    window.location.href = this.api.getAuthorizeUrl();
  }

  disconnect() {
    this.loading.set(true);
    this.api.disconnect().subscribe({
      next: () => {
        this.connected.set(false);
        this.projects.set([]);
        this.tasks.set([]);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to disconnect from Todoist');
        this.loading.set(false);
      }
    });
  }

  // ── Projects ──────────────────────────────────────────────────

  loadProjects() {
    this.loading.set(true);
    this.error.set(null);
    this.api.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load Todoist projects');
        this.loading.set(false);
      }
    });
  }

  // ── Tasks ─────────────────────────────────────────────────────

  loadTasks(projectId?: string) {
    this.loading.set(true);
    this.error.set(null);
    this.api.getTasks(projectId).subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load Todoist tasks');
        this.loading.set(false);
      }
    });
  }

  closeTask(taskId: string) {
    this.api.closeTask(taskId).subscribe({
      next: () => {
        this.tasks.update(tasks =>
          tasks.map(t => t.id === taskId ? { ...t, completed: true } : t)
        );
      },
      error: () => this.error.set('Failed to close task')
    });
  }

  reopenTask(taskId: string) {
    this.api.reopenTask(taskId).subscribe({
      next: () => {
        this.tasks.update(tasks =>
          tasks.map(t => t.id === taskId ? { ...t, completed: false } : t)
        );
      },
      error: () => this.error.set('Failed to reopen task')
    });
  }

  deleteTask(taskId: string) {
    this.api.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks.update(tasks => tasks.filter(t => t.id !== taskId));
      },
      error: () => this.error.set('Failed to delete task')
    });
  }

  // ── Shopping List ─────────────────────────────────────────────

  sendToShoppingList(recipeId: number, ingredientIds: number[], projectId: string | null = null) {
    this.loading.set(true);
    this.error.set(null);

    const request: TodoistShoppingListRequest = { recipeId, ingredientIds, projectId };

    this.api.sendToShoppingList(request).subscribe({
      next: (result) => {
        this.lastShoppingListResult.set(result);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to send ingredients to Todoist');
        this.loading.set(false);
      }
    });
  }

  // ── Utility ───────────────────────────────────────────────────

  clearError() {
    this.error.set(null);
  }
}
