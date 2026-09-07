import { inject, Injectable } from '@angular/core';
import { ElectronService } from '../core/services/electron/electron.service';
import { Todo } from '../models/todo.model';

const ProjectFolderName = 'app.todo.angular';

/**
 * Todo Write/Read Service
 * - file format: json
 * - file name: todo.id
 * - file extension: json
 */
@Injectable({providedIn: 'root'})
export class TodoService {

  private readonly electron = inject(ElectronService);

  /** e.g. C:\Users\<name>\app.todos.angular, /home/<name>/app.todos.angular */
  private get projectFolder(): string {
    return this.electron.path.join(this.electron.os.homedir(), ProjectFolderName);
  }

  private filePath(todo: Todo): string {
    return this.electron.path.join(this.projectFolder, `${todo.id}.json`);
  }

  public createProjectFolder(): string {
    this.electron.fs.mkdirSync(this.projectFolder, {recursive: true});
    return this.projectFolder;
  }

  public async readAll(): Promise<Todo[]> {
    this.createProjectFolder();

    const fileNames = await this.electron.fs.promises.readdir(this.projectFolder);
    const todos = await Promise.all(
      fileNames.filter(name => name.endsWith('.json')).map(name => this.read(name)),
    );

    return todos.filter((todo): todo is Todo => todo !== null);
  }

  public async save(todo: Todo): Promise<void> {
    this.createProjectFolder();

    const content = JSON.stringify(todo, null, 2);
    await this.electron.fs.promises.writeFile(this.filePath(todo), content, 'utf-8');
  }

  public async update(todo: Todo): Promise<void> {
    await this.save(todo);
  }

  public async delete(todo: Todo): Promise<void> {
    await this.electron.fs.promises.rm(this.filePath(todo), {force: true});
  }

  /** Returns null for unreadable/corrupt files so one bad file cannot break readAll. */
  private async read(fileName: string): Promise<Todo | null> {
    try {
      const filePath = this.electron.path.join(this.projectFolder, fileName);
      const raw = await this.electron.fs.promises.readFile(filePath, 'utf-8');
      return JSON.parse(raw) as Todo;
    } catch {
      return null;
    }
  }
}
