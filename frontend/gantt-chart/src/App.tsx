import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { taskApi } from './api';
import type { GanttTask, TaskInput, TaskStatus } from './types';
import './App.css';

type ViewMode = 'week' | 'month' | 'quarter';

const viewSettings: Record<ViewMode, { label: string; days: number; before: number; cell: number }> = {
  week: { label: '2週間', days: 14, before: 4, cell: 52 },
  month: { label: '月', days: 35, before: 7, cell: 36 },
  quarter: { label: '3か月', days: 90, before: 14, cell: 28 },
};

const statuses: TaskStatus[] = ['New', 'Active', 'Review', 'Solved', 'Completed', 'Pending'];
const statusNames: Record<TaskStatus, string> = {
  New: '未着手',
  Active: '進行中',
  Review: 'レビュー',
  Solved: '対応済み',
  Completed: '完了',
  Pending: '保留',
};

const pad = (value: number) => String(value).padStart(2, '0');
const dateKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const parseDate = (value: string) => new Date(`${value.slice(0, 10)}T00:00:00`);
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
const dayDifference = (start: Date, end: Date) =>
  Math.round((new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()
    - new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime()) / 86400000);
const formatDate = (date: Date) =>
  `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

function App() {
  const [tasks, setTasks] = useState<GanttTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<ViewMode>('month');
  const [anchorDate, setAnchorDate] = useState(() => new Date());
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingTask, setEditingTask] = useState<GanttTask | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setTasks(await taskApi.getAll());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'タスクを読み込めませんでした。');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  const today = useMemo(() => new Date(), []);
  const settings = viewSettings[mode];
  const rangeStart = addDays(anchorDate, -settings.before);
  const dates = useMemo(
    () => Array.from({ length: settings.days }, (_, index) => addDays(rangeStart, index)),
    [rangeStart, settings.days],
  );
  const gridStyle = {
    gridTemplateColumns: `minmax(245px, 290px) repeat(${settings.days}, ${settings.cell}px)`,
  };
  const filteredTasks = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return [...tasks]
      .filter((task) => statusFilter === 'all' || task.status === statusFilter)
      .filter((task) => !needle || `${task.title} ${task.assignedTo ?? ''} ${task.description ?? ''}`.toLocaleLowerCase().includes(needle))
      .sort((a, b) => a.plannedTerm.startDate.localeCompare(b.plannedTerm.startDate));
  }, [query, statusFilter, tasks]);

  const completedCount = tasks.filter((task) => task.status === 'Completed' || task.status === 'Solved').length;
  const activeCount = tasks.filter((task) => task.status === 'Active' || task.status === 'Review').length;

  function moveRange(direction: number) {
    setAnchorDate((current) => addDays(current, settings.days * direction));
  }

  function openCreateForm() {
    setEditingTask(null);
    setFormError('');
    setShowForm(true);
  }

  function openEditForm(task: GanttTask) {
    setEditingTask(task);
    setFormError('');
    setShowForm(true);
  }

  async function saveTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFormError('');
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get('title') ?? '').trim();
    const startDate = String(formData.get('startDate') ?? '');
    const endDate = String(formData.get('endDate') ?? '');

    if (!title) {
      setFormError('タスク名を入力してください。');
      setSaving(false);
      return;
    }
    if (!startDate || !endDate || endDate < startDate) {
      setFormError('終了日は開始日以降の日付を指定してください。');
      setSaving(false);
      return;
    }

    const input: TaskInput = {
      title,
      description: String(formData.get('description') ?? '').trim(),
      assignedTo: String(formData.get('assignedTo') ?? '').trim(),
      status: String(formData.get('status') ?? 'New') as TaskStatus,
      plannedTerm: { startDate, endDate },
    };

    try {
      if (editingTask) {
        await taskApi.update({ ...editingTask, ...input });
      } else {
        await taskApi.create(input);
      }
      setShowForm(false);
      await loadTasks();
    } catch (saveError) {
      setFormError(saveError instanceof Error ? saveError.message : '保存できませんでした。');
    } finally {
      setSaving(false);
    }
  }

  async function deleteTask() {
    if (!editingTask || !window.confirm(`「${editingTask.title}」を削除しますか？`)) return;
    setSaving(true);
    setFormError('');
    try {
      await taskApi.remove(editingTask.id);
      setShowForm(false);
      await loadTasks();
    } catch (deleteError) {
      setFormError(deleteError instanceof Error ? deleteError.message : '削除できませんでした。');
    } finally {
      setSaving(false);
    }
  }

  const todayOffset = dayDifference(rangeStart, today);

  return (
    <main className="gantt-app">
      <header className="gantt-topbar">
        <a className="gantt-brand" href="/">
          <span className="gantt-brand-mark" aria-hidden="true">M</span>
          <span>MyPortal <i>/</i> プロジェクト管理</span>
        </a>
        <a className="gantt-back-link" href="/apps/">アプリ一覧へ戻る</a>
      </header>

      <div className="gantt-content">
        <section className="gantt-heading">
          <div>
            <p className="gantt-eyebrow">PROJECT PLANNING</p>
            <h1>ガントチャート</h1>
            <p className="gantt-subtitle">タスクとスケジュールを、ひと目で把握。</p>
          </div>
          <button type="button" className="primary-button" onClick={openCreateForm}>
            <span aria-hidden="true">＋</span> タスクを追加
          </button>
        </section>

        <section className="gantt-metrics" aria-label="タスク概要">
          <article className="metric-tile">
            <span className="metric-icon total-icon" aria-hidden="true">▤</span>
            <span><small>すべてのタスク</small><strong>{tasks.length}</strong></span>
          </article>
          <article className="metric-tile">
            <span className="metric-icon active-icon" aria-hidden="true">◷</span>
            <span><small>進行中</small><strong>{activeCount}</strong></span>
          </article>
          <article className="metric-tile">
            <span className="metric-icon done-icon" aria-hidden="true">✓</span>
            <span><small>完了</small><strong>{completedCount}</strong></span>
          </article>
          <article className="metric-tile date-tile">
            <span className="metric-icon date-icon" aria-hidden="true">▦</span>
            <span><small>今日</small><strong>{formatDate(today)}</strong></span>
          </article>
        </section>

        <section className="schedule-panel" aria-label="プロジェクトスケジュール">
          <div className="schedule-toolbar">
            <div className="range-controls">
              <button type="button" className="icon-button" onClick={() => moveRange(-1)} aria-label="前の期間">‹</button>
              <button type="button" className="today-button" onClick={() => setAnchorDate(new Date())}>今日</button>
              <button type="button" className="icon-button" onClick={() => moveRange(1)} aria-label="次の期間">›</button>
              <strong className="range-label">
                {formatDate(dates[0])} — {formatDate(dates[dates.length - 1])}
              </strong>
            </div>
            <div className="schedule-options">
              <label className="search-field">
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  placeholder="タスクを検索"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label="タスクを検索"
                />
              </label>
              <select aria-label="ステータスで絞り込み" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="all">すべての状態</option>
                {statuses.map((status) => <option value={status} key={status}>{statusNames[status]}</option>)}
              </select>
              <div className="view-switch" aria-label="表示期間">
                {(Object.keys(viewSettings) as ViewMode[]).map((view) => (
                  <button
                    type="button"
                    key={view}
                    className={mode === view ? 'selected' : ''}
                    aria-pressed={mode === view}
                    onClick={() => setMode(view)}
                  >
                    {viewSettings[view].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="error-banner" role="alert">
              <span>{error}</span>
              <button type="button" onClick={() => void loadTasks()}>再読み込み</button>
            </div>
          )}

          {loading && <div className="loading-state" role="status">スケジュールを読み込んでいます…</div>}

          {!loading && !error && (
            <div className="gantt-scroll">
              <div className="gantt-grid" style={gridStyle}>
                <div className="gantt-header task-header" style={{ gridColumn: '1', gridRow: '1' }}>
                  タスク <span>{filteredTasks.length}件</span>
                </div>
                {dates.map((date, index) => (
                  <div
                    className={[
                      'date-header',
                      date.getDay() === 0 || date.getDay() === 6 ? 'weekend' : '',
                      dateKey(date) === dateKey(today) ? 'is-today' : '',
                    ].join(' ')}
                    key={dateKey(date)}
                    style={{ gridColumn: index + 2, gridRow: 1 }}
                    title={formatDate(date)}
                  >
                    {(index === 0 || date.getDate() === 1 || date.getDay() === 1) && (
                      <span className="date-month">
                        {date.getDate() === 1 || index === 0 ? `${date.getMonth() + 1}月` : ' '}
                      </span>
                    )}
                    <strong>{mode === 'quarter' && date.getDay() !== 1 ? '' : date.getDate()}</strong>
                    <small>{['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}</small>
                  </div>
                ))}

                {filteredTasks.map((task) => {
                  const start = parseDate(task.plannedTerm.startDate);
                  const end = parseDate(task.plannedTerm.endDate);
                  const left = Math.max(0, dayDifference(rangeStart, start));
                  const right = Math.min(settings.days, dayDifference(rangeStart, end) + 1);
                  const visibleDays = Math.max(0, right - left);
                  const offset = (left / settings.days) * 100;
                  const width = (visibleDays / settings.days) * 100;
                  const outsideRange = right <= 0 || left >= settings.days;

                  return (
                    <div className="gantt-row" style={gridStyle} key={task.id}>
                      <div className="task-cell" style={{ gridColumn: '1', gridRow: 1 }}>
                        <span className={`status-dot status-${task.status.toLowerCase()}`} aria-hidden="true" />
                        <span className="task-cell-copy">
                          <strong title={task.title}>{task.title}</strong>
                          <small>{task.assignedTo || '担当者未設定'}</small>
                        </span>
                        <span className={`status-pill status-${task.status.toLowerCase()}`}>{statusNames[task.status]}</span>
                        <button
                          type="button"
                          className="edit-task-button"
                          aria-label={`${task.title}を編集`}
                          onClick={() => openEditForm(task)}
                        >
                          ⋯
                        </button>
                      </div>
                      <div
                        className="timeline-track"
                        style={{
                          gridColumn: `2 / span ${settings.days}`,
                          gridRow: 1,
                          gridTemplateColumns: `repeat(${settings.days}, minmax(0, 1fr))`,
                        }}
                      >
                        {Array.from({ length: settings.days }, (_, dayIndex) => {
                          const date = dates[dayIndex];
                          return (
                            <span
                              className={`timeline-cell ${date.getDay() === 0 || date.getDay() === 6 ? 'weekend' : ''}`}
                              key={dateKey(date)}
                            />
                          );
                        })}
                        {todayOffset >= 0 && todayOffset < settings.days && (
                          <span className="today-line" style={{ left: `${(todayOffset / settings.days) * 100}%` }} />
                        )}
                        {!outsideRange && (
                          <button
                            type="button"
                            className={`task-bar status-${task.status.toLowerCase()}`}
                            style={{ left: `${offset}%`, width: `${width}%` }}
                            title={`${task.title}: ${formatDate(start)} — ${formatDate(end)}`}
                            onClick={() => openEditForm(task)}
                          >
                            <span>{task.title}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {filteredTasks.length === 0 && (
                <div className="empty-state">
                  <span aria-hidden="true">▤</span>
                  <strong>{tasks.length ? '条件に一致するタスクがありません' : 'タスクはまだありません'}</strong>
                  <p>{tasks.length ? '検索条件を変更してください。' : '「タスクを追加」から最初の予定を登録しましょう。'}</p>
                  {!tasks.length && <button type="button" className="secondary-button" onClick={openCreateForm}>タスクを追加</button>}
                </div>
              )}
            </div>
          )}

          <footer className="schedule-footer">
            <span><i className="legend-dot status-active" />進行中</span>
            <span><i className="legend-dot status-new" />未着手</span>
            <span><i className="legend-dot status-completed" />完了</span>
            <span className="schedule-hint">タスク名またはバーを選択して編集</span>
          </footer>
        </section>
      </div>

      {showForm && (
        <div className="modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !saving) setShowForm(false);
        }}>
          <form className="task-form" role="dialog" aria-modal="true" aria-labelledby="task-form-title" onSubmit={saveTask}>
            <header className="form-header">
              <div>
                <p className="gantt-eyebrow">{editingTask ? 'EDIT TASK' : 'NEW TASK'}</p>
                <h2 id="task-form-title">{editingTask ? 'タスクを編集' : 'タスクを追加'}</h2>
              </div>
              <button type="button" className="icon-button close-button" aria-label="閉じる" onClick={() => setShowForm(false)}>×</button>
            </header>
            <label className="form-field">
              <span>タスク名 <i>*</i></span>
              <input name="title" required maxLength={120} defaultValue={editingTask?.title ?? ''} autoFocus />
            </label>
            <label className="form-field">
              <span>説明</span>
              <textarea name="description" rows={3} maxLength={1000} defaultValue={editingTask?.description ?? ''} />
            </label>
            <label className="form-field">
              <span>担当者</span>
              <input name="assignedTo" maxLength={80} defaultValue={editingTask?.assignedTo ?? ''} placeholder="担当者名" />
            </label>
            <div className="form-row">
              <label className="form-field">
                <span>開始日 <i>*</i></span>
                <input name="startDate" type="date" required defaultValue={editingTask?.plannedTerm.startDate.slice(0, 10) ?? dateKey(today)} />
              </label>
              <label className="form-field">
                <span>終了日 <i>*</i></span>
                <input name="endDate" type="date" required defaultValue={editingTask?.plannedTerm.endDate.slice(0, 10) ?? dateKey(addDays(today, 3))} />
              </label>
            </div>
            <label className="form-field">
              <span>ステータス</span>
              <select name="status" defaultValue={editingTask?.status ?? 'New'}>
                {statuses.map((status) => <option value={status} key={status}>{statusNames[status]}</option>)}
              </select>
            </label>
            {formError && <p className="form-error" role="alert">{formError}</p>}
            <footer className="form-actions">
              {editingTask && <button type="button" className="delete-button" onClick={() => void deleteTask()} disabled={saving}>削除</button>}
              <span />
              <button type="button" className="secondary-button" onClick={() => setShowForm(false)} disabled={saving}>キャンセル</button>
              <button type="submit" className="primary-button" disabled={saving}>{saving ? '保存中…' : '保存する'}</button>
            </footer>
          </form>
        </div>
      )}
    </main>
  );
}

export default App;
